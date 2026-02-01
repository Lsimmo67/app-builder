'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RotateCcw, Plus, Minus } from 'lucide-react'
import { useDebouncedCallback } from '@/hooks/use-debounce'
import { DEBOUNCE_CONTENT } from '@/lib/constants/debounce'

interface NumberEditorProps {
  value: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function NumberEditor({
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
}: NumberEditorProps) {
  const [localValue, setLocalValue] = useState(value ?? defaultValue)

  useEffect(() => {
    setLocalValue(value ?? defaultValue)
  }, [value, defaultValue])

  const debouncedOnChange = useDebouncedCallback((newValue: number) => {
    onChange(newValue)
  }, DEBOUNCE_CONTENT)

  const clamp = useCallback(
    (val: number) => {
      let clamped = val
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    },
    [min, max]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value) || 0
      const clamped = clamp(newValue)
      setLocalValue(clamped)
      debouncedOnChange(clamped)
    },
    [clamp, debouncedOnChange]
  )

  const handleIncrement = useCallback(() => {
    const newValue = clamp(localValue + step)
    setLocalValue(newValue)
    onChange(newValue)
  }, [localValue, step, clamp, onChange])

  const handleDecrement = useCallback(() => {
    const newValue = clamp(localValue - step)
    setLocalValue(newValue)
    onChange(newValue)
  }, [localValue, step, clamp, onChange])

  const handleReset = useCallback(() => {
    setLocalValue(defaultValue)
    onChange(defaultValue)
  }, [defaultValue, onChange])

  const showReset = localValue !== defaultValue

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={handleDecrement}
        disabled={disabled || (min !== undefined && localValue <= min)}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Input
        type="number"
        value={localValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="h-8 text-sm text-center"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={handleIncrement}
        disabled={disabled || (max !== undefined && localValue >= max)}
      >
        <Plus className="h-3 w-3" />
      </Button>
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
