'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import { useDebouncedCallback } from '@/hooks/use-debounce'
import { DEBOUNCE_CONTENT } from '@/lib/constants/debounce'

interface StringEditorProps {
  value: string
  defaultValue?: string
  placeholder?: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function StringEditor({
  value,
  defaultValue = '',
  placeholder,
  onChange,
  disabled = false,
}: StringEditorProps) {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const debouncedOnChange = useDebouncedCallback((newValue: string) => {
    onChange(newValue)
  }, DEBOUNCE_CONTENT)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setLocalValue(newValue)
      debouncedOnChange(newValue)
    },
    [debouncedOnChange]
  )

  const handleReset = useCallback(() => {
    setLocalValue(defaultValue)
    onChange(defaultValue)
  }, [defaultValue, onChange])

  const showReset = localValue !== defaultValue && defaultValue !== undefined

  return (
    <div className="flex gap-1">
      <Input
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder || defaultValue || 'Enter text...'}
        disabled={disabled}
        className="h-8 text-sm"
      />
      {showReset && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handleReset}
          title="Reset to default"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
