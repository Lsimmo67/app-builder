'use client'

import { useState, useCallback } from 'react'
import { useCMSStore } from '@/lib/store/cms-store'
import type { CMSCollection, CMSItem, CMSFieldType } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Save } from 'lucide-react'
import { useDebouncedCallback } from '@/hooks/use-debounce'

interface ItemEditorProps {
  collection: CMSCollection
  item: CMSItem
  onBack: () => void
}

export function ItemEditor({ collection, item, onBack }: ItemEditorProps) {
  const { updateItem, updateItemStatus } = useCMSStore()
  const [data, setData] = useState<Record<string, unknown>>({ ...item.data })

  const debouncedSave = useDebouncedCallback(
    (newData: Record<string, unknown>) => {
      updateItem(item.id, newData)
    },
    300
  )

  const handleFieldChange = useCallback(
    (slug: string, value: unknown) => {
      setData((prev) => {
        const next = { ...prev, [slug]: value }
        debouncedSave(next)
        return next
      })
    },
    [debouncedSave]
  )

  const handleSave = () => {
    updateItem(item.id, data)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium flex-1">Edit Item</span>
        <Badge
          variant={item.status === 'published' ? 'default' : 'secondary'}
          className="text-[9px] cursor-pointer"
          onClick={() =>
            updateItemStatus(item.id, item.status === 'published' ? 'draft' : 'published')
          }
        >
          {item.status}
        </Badge>
        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleSave}>
          <Save className="h-3 w-3 mr-1" />
          Save
        </Button>
      </div>

      {/* Auto-generated Form */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {collection.fields.map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              value={data[field.slug]}
              onChange={(value) => handleFieldChange(field.slug, value)}
            />
          ))}

          {collection.fields.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              This collection has no fields yet. Add fields in the collection schema editor.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

// Dynamic field input component based on field type
function FieldInput({
  field,
  value,
  onChange,
}: {
  field: { name: string; slug: string; type: CMSFieldType; required: boolean; helpText?: string; validation?: { options?: string[] } }
  value: unknown
  onChange: (value: unknown) => void
}) {
  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'url':
      case 'email':
        return (
          <Input
            value={String(value || '')}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${field.name.toLowerCase()}`}
            type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
            className="text-sm"
          />
        )

      case 'richtext':
        return (
          <Textarea
            value={String(value || '')}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${field.name.toLowerCase()}`}
            rows={4}
            className="text-sm"
          />
        )

      case 'number':
        return (
          <Input
            type="number"
            value={value !== undefined ? String(value) : ''}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="0"
            className="text-sm"
          />
        )

      case 'boolean':
        return (
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked)}
          />
        )

      case 'date':
        return (
          <Input
            type="date"
            value={String(value || '')}
            onChange={(e) => onChange(e.target.value)}
            className="text-sm"
          />
        )

      case 'color':
        return (
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={String(value || '#000000')}
              onChange={(e) => onChange(e.target.value)}
              className="h-8 w-8 rounded border cursor-pointer"
            />
            <Input
              value={String(value || '')}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="text-sm font-mono flex-1"
            />
          </div>
        )

      case 'image':
      case 'file':
        return (
          <Input
            value={String(value || '')}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.type === 'image' ? 'Image URL' : 'File URL'}
            className="text-sm"
          />
        )

      case 'option':
        const options = field.validation?.options || []
        return (
          <Select value={String(value || '')} onValueChange={onChange}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      default:
        return (
          <Input
            value={String(value || '')}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${field.name.toLowerCase()}`}
            className="text-sm"
          />
        )
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <Label className="text-sm font-medium">{field.name}</Label>
        {field.required && <span className="text-red-500 text-xs">*</span>}
      </div>
      {renderInput()}
      {field.helpText && (
        <p className="text-xs text-muted-foreground">{field.helpText}</p>
      )}
    </div>
  )
}
