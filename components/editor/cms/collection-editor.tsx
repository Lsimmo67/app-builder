'use client'

import { useState } from 'react'
import { useCMSStore } from '@/lib/store/cms-store'
import type { CMSCollection, CMSField, CMSFieldType } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Type,
  Hash,
  ToggleLeft,
  Calendar,
  Image,
  FileText,
  Link2,
  Palette,
  Mail,
  List,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const FIELD_TYPE_ICONS: Record<CMSFieldType, React.ReactNode> = {
  text: <Type className="h-3.5 w-3.5" />,
  richtext: <FileText className="h-3.5 w-3.5" />,
  number: <Hash className="h-3.5 w-3.5" />,
  boolean: <ToggleLeft className="h-3.5 w-3.5" />,
  date: <Calendar className="h-3.5 w-3.5" />,
  image: <Image className="h-3.5 w-3.5" />,
  file: <FileText className="h-3.5 w-3.5" />,
  color: <Palette className="h-3.5 w-3.5" />,
  url: <Link2 className="h-3.5 w-3.5" />,
  email: <Mail className="h-3.5 w-3.5" />,
  option: <List className="h-3.5 w-3.5" />,
  reference: <Link2 className="h-3.5 w-3.5" />,
  'multi-reference': <Link2 className="h-3.5 w-3.5" />,
}

const FIELD_TYPE_LABELS: Record<CMSFieldType, string> = {
  text: 'Plain Text',
  richtext: 'Rich Text',
  number: 'Number',
  boolean: 'Boolean',
  date: 'Date',
  image: 'Image',
  file: 'File',
  color: 'Color',
  url: 'URL',
  email: 'Email',
  option: 'Option',
  reference: 'Reference',
  'multi-reference': 'Multi-Reference',
}

interface CollectionEditorProps {
  collection: CMSCollection
  onBack: () => void
}

export function CollectionEditor({ collection, onBack }: CollectionEditorProps) {
  const { addField, updateField, removeField, updateCollection } = useCMSStore()
  const [showAddField, setShowAddField] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [name, setName] = useState(collection.name)

  // New field form state
  const [fieldName, setFieldName] = useState('')
  const [fieldSlug, setFieldSlug] = useState('')
  const [fieldType, setFieldType] = useState<CMSFieldType>('text')
  const [fieldRequired, setFieldRequired] = useState(false)
  const [fieldHelpText, setFieldHelpText] = useState('')
  const [fieldOptions, setFieldOptions] = useState('')

  const handleSaveName = async () => {
    if (name.trim() && name !== collection.name) {
      await updateCollection(collection.id, { name: name.trim() })
    }
    setEditingName(false)
  }

  const handleAddField = async () => {
    if (!fieldName.trim()) return
    const slug = fieldSlug.trim() || fieldName.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')

    await addField(collection.id, {
      name: fieldName.trim(),
      slug,
      type: fieldType,
      required: fieldRequired,
      helpText: fieldHelpText || undefined,
      validation: fieldType === 'option' && fieldOptions
        ? { options: fieldOptions.split(',').map((o) => o.trim()).filter(Boolean) }
        : undefined,
    })

    // Reset form
    setFieldName('')
    setFieldSlug('')
    setFieldType('text')
    setFieldRequired(false)
    setFieldHelpText('')
    setFieldOptions('')
    setShowAddField(false)
  }

  const handleFieldNameChange = (n: string) => {
    setFieldName(n)
    if (!fieldSlug || fieldSlug === fieldName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')) {
      setFieldSlug(n.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''))
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {editingName ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSaveName}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
            className="h-7 text-sm font-semibold"
            autoFocus
          />
        ) : (
          <h3
            className="text-sm font-semibold cursor-pointer hover:text-primary"
            onClick={() => setEditingName(true)}
          >
            {collection.name}
          </h3>
        )}
        <Badge variant="secondary" className="text-[10px] ml-auto">
          Schema
        </Badge>
      </div>

      {/* Fields List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {collection.fields.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-2">No fields yet</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddField(true)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add First Field
              </Button>
            </div>
          ) : (
            <>
              {collection.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="group flex items-center gap-2 p-2 rounded-md border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="text-muted-foreground">
                    {FIELD_TYPE_ICONS[field.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">{field.name}</span>
                      {field.required && (
                        <span className="text-[9px] text-red-500 font-medium">*</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span>{FIELD_TYPE_LABELS[field.type]}</span>
                      <span>&bull;</span>
                      <code>{field.slug}</code>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => removeField(collection.id, field.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Add Field Button */}
      <div className="p-3 border-t">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => setShowAddField(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Field
        </Button>
      </div>

      {/* Add Field Dialog */}
      <Dialog open={showAddField} onOpenChange={setShowAddField}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Field</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">Field Name</Label>
              <Input
                value={fieldName}
                onChange={(e) => handleFieldNameChange(e.target.value)}
                placeholder="Title"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Slug</Label>
              <Input
                value={fieldSlug}
                onChange={(e) => setFieldSlug(e.target.value)}
                placeholder="title"
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Type</Label>
              <Select value={fieldType} onValueChange={(v) => setFieldType(v as CMSFieldType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(FIELD_TYPE_LABELS) as CMSFieldType[]).map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        {FIELD_TYPE_ICONS[type]}
                        <span>{FIELD_TYPE_LABELS[type]}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {fieldType === 'option' && (
              <div className="space-y-2">
                <Label className="text-sm">Options (comma-separated)</Label>
                <Input
                  value={fieldOptions}
                  onChange={(e) => setFieldOptions(e.target.value)}
                  placeholder="Option 1, Option 2, Option 3"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-sm">Help Text</Label>
              <Input
                value={fieldHelpText}
                onChange={(e) => setFieldHelpText(e.target.value)}
                placeholder="Optional description for editors"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Required</Label>
              <Switch checked={fieldRequired} onCheckedChange={setFieldRequired} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddField(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddField} disabled={!fieldName.trim()}>
              Add Field
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
