'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

interface SelectEditorProps {
  value: string
  defaultValue?: string
  options: string[]
  placeholder?: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function SelectEditor({
  value,
  defaultValue = '',
  options,
  placeholder = 'Select option...',
  onChange,
  disabled = false,
}: SelectEditorProps) {
  const currentValue = value ?? defaultValue
  const showReset = currentValue !== defaultValue && defaultValue !== undefined

  return (
    <div className="flex gap-1">
      <Select
        value={currentValue}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showReset && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => onChange(defaultValue)}
          title="Reset to default"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
