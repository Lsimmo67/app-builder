'use client'

import { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArrayEditorProps {
  value: string[]
  defaultValue?: string[]
  placeholder?: string
  onChange: (value: string[]) => void
  disabled?: boolean
  maxItems?: number
}

export function ArrayEditor({
  value = [],
  defaultValue = [],
  placeholder = 'Enter value...',
  onChange,
  disabled = false,
  maxItems = 20,
}: ArrayEditorProps) {
  const [newItem, setNewItem] = useState('')

  const handleAdd = useCallback(() => {
    if (newItem.trim() && value.length < maxItems) {
      onChange([...value, newItem.trim()])
      setNewItem('')
    }
  }, [newItem, value, maxItems, onChange])

  const handleRemove = useCallback(
    (index: number) => {
      const newValue = value.filter((_, i) => i !== index)
      onChange(newValue)
    },
    [value, onChange]
  )

  const handleUpdate = useCallback(
    (index: number, newItemValue: string) => {
      const newValue = [...value]
      newValue[index] = newItemValue
      onChange(newValue)
    },
    [value, onChange]
  )

  const handleMoveUp = useCallback(
    (index: number) => {
      if (index === 0) return
      const newValue = [...value]
      ;[newValue[index - 1], newValue[index]] = [newValue[index], newValue[index - 1]]
      onChange(newValue)
    },
    [value, onChange]
  )

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index === value.length - 1) return
      const newValue = [...value]
      ;[newValue[index], newValue[index + 1]] = [newValue[index + 1], newValue[index]]
      onChange(newValue)
    },
    [value, onChange]
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
      {value.length > 0 && (
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {value.map((item, index) => (
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
                value={item}
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
                  disabled={disabled || index === value.length - 1}
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
          ))}
        </div>
      )}

      {/* Add new item */}
      {value.length < maxItems && (
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
      )}

      {/* Counter */}
      <div className="text-xs text-muted-foreground text-right">
        {value.length} / {maxItems} items
      </div>
    </div>
  )
}
