'use client'

import { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ComponentProp } from '@/types'

interface ArrayEditorProps {
  value: unknown[]
  defaultValue?: unknown[]
  placeholder?: string
  onChange: (value: unknown[]) => void
  disabled?: boolean
  maxItems?: number
  itemSchema?: ComponentProp[]
}

export function ArrayEditor({
  value = [],
  defaultValue = [],
  placeholder = 'Enter value...',
  onChange,
  disabled = false,
  maxItems = 20,
  itemSchema,
}: ArrayEditorProps) {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState<unknown[]>(value)
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  // Keep items in sync with value prop
  if (JSON.stringify(items) !== JSON.stringify(value)) {
    setItems(value)
  }

  const createDefaultItem = useCallback(() => {
    if (!itemSchema) return ''
    const obj: Record<string, unknown> = {}
    for (const field of itemSchema) {
      obj[field.name] = field.default ?? (field.type === 'number' ? 0 : field.type === 'boolean' ? false : '')
    }
    return obj
  }, [itemSchema])

  const handleAdd = useCallback(() => {
    if (newItem.trim() && items.length < maxItems) {
      const newItems = [...items, newItem.trim()]
      setItems(newItems)
      onChange(newItems)
      setNewItem('')
    }
  }, [newItem, items, maxItems, onChange])

  const handleRemove = useCallback(
    (index: number) => {
      const newItems = items.filter((_, i) => i !== index)
      setItems(newItems)
      onChange(newItems)
    },
    [items, onChange]
  )

  const handleUpdate = useCallback(
    (index: number, newItemValue: string) => {
      const newItems = [...items]
      newItems[index] = newItemValue
      setItems(newItems)
      onChange(newItems)
    },
    [items, onChange]
  )

  const handleMoveUp = useCallback(
    (index: number) => {
      if (index === 0) return
      const newItems = [...items]
      ;[newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]]
      setItems(newItems)
      onChange(newItems)
    },
    [items, onChange]
  )

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index === items.length - 1) return
      const newItems = [...items]
      ;[newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]]
      setItems(newItems)
      onChange(newItems)
    },
    [items, onChange]
  )

  const handleObjectFieldChange = useCallback(
    (index: number, fieldName: string, fieldValue: unknown) => {
      const newItems = [...items]
      const item = newItems[index]
      if (typeof item === 'object' && item !== null) {
        newItems[index] = { ...item, [fieldName]: fieldValue }
        setItems(newItems)
        onChange(newItems)
      }
    },
    [items, onChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleAdd()
      }
    },
    [handleAdd]
  )

  return (
    <div className="space-y-2">
      {/* Existing items */}
      {items.length > 0 && (
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {itemSchema ? (
            // Object array mode
            items.map((item, index) => (
              <div key={index} className="border rounded p-2 space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    className="text-xs font-medium text-muted-foreground"
                    onClick={() => {
                      const next = new Set(expandedItems)
                      next.has(index) ? next.delete(index) : next.add(index)
                      setExpandedItems(next)
                    }}
                  >
                    Item {index + 1} {expandedItems.has(index) ? '▾' : '▸'}
                  </button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemove(index)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                {expandedItems.has(index) && typeof item === 'object' && item !== null && (
                  <div className="space-y-2 pl-2 border-l-2 border-muted">
                    {itemSchema.map((field) => (
                      <div key={field.name} className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">{field.name}</Label>
                        {field.type === 'boolean' ? (
                          <input
                            type="checkbox"
                            checked={Boolean((item as Record<string, unknown>)[field.name])}
                            onChange={(e) => handleObjectFieldChange(index, field.name, e.target.checked)}
                          />
                        ) : field.type === 'number' ? (
                          <Input
                            type="number"
                            value={Number((item as Record<string, unknown>)[field.name]) || 0}
                            onChange={(e) => handleObjectFieldChange(index, field.name, parseFloat(e.target.value) || 0)}
                            className="h-7 text-xs"
                          />
                        ) : field.type === 'select' && field.options ? (
                          <select
                            value={String((item as Record<string, unknown>)[field.name] || '')}
                            onChange={(e) => handleObjectFieldChange(index, field.name, e.target.value)}
                            className="w-full h-7 text-xs rounded border px-2"
                          >
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <Input
                            value={String((item as Record<string, unknown>)[field.name] || '')}
                            onChange={(e) => handleObjectFieldChange(index, field.name, e.target.value)}
                            className="h-7 text-xs"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            // String array mode
            items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-1 p-1 rounded border bg-muted/30',
                  disabled && 'opacity-50'
                )}
              >
                <div className="text-muted-foreground cursor-grab">
                  <GripVertical className="h-3 w-3" />
                </div>
                <Input
                  value={String(item)}
                  onChange={(e) => handleUpdate(index, e.target.value)}
                  disabled={disabled}
                  className="h-7 text-xs flex-1"
                />
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleMoveUp(index)}
                    disabled={disabled || index === 0}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleMoveDown(index)}
                    disabled={disabled || index === items.length - 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => handleRemove(index)}
                    disabled={disabled}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add new item */}
      {items.length < maxItems && (
        itemSchema ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs"
            onClick={() => {
              const newItem = createDefaultItem()
              const newItems = [...items, newItem]
              setItems(newItems)
              onChange(newItems)
            }}
          >
            <Plus className="h-3 w-3 mr-1" /> Add Item
          </Button>
        ) : (
          <div className="flex gap-1">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className="h-8 text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={handleAdd}
              disabled={disabled || !newItem.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )
      )}

      {/* Counter */}
      <div className="text-xs text-muted-foreground text-right">
        {items.length} / {maxItems} items
      </div>
    </div>
  )
}
