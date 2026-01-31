'use client'

import { useState, useEffect, useCallback } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RotateCcw, Pipette } from 'lucide-react'
import { useDebouncedCallback } from '@/hooks/use-debounce'
import { useDesignSystemStore } from '@/lib/store'

interface ColorEditorProps {
  value: string
  defaultValue?: string
  onChange: (value: string) => void
  disabled?: boolean
  showPresets?: boolean
}

const DEFAULT_PRESETS = [
  '#000000', '#ffffff', '#f43f5e', '#ec4899', '#d946ef',
  '#a855f7', '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9',
  '#06b6d4', '#14b8a6', '#10b981', '#22c55e', '#84cc16',
  '#eab308', '#f59e0b', '#f97316', '#ef4444', '#78716c',
]

export function ColorEditor({
  value,
  defaultValue = '#000000',
  onChange,
  disabled = false,
  showPresets = true,
}: ColorEditorProps) {
  const [localValue, setLocalValue] = useState(value || defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const designSystem = useDesignSystemStore((state) => state.designSystem)

  useEffect(() => {
    setLocalValue(value || defaultValue)
  }, [value, defaultValue])

  const debouncedOnChange = useDebouncedCallback((newValue: string) => {
    onChange(newValue)
  }, 100)

  const handleChange = useCallback(
    (newValue: string) => {
      setLocalValue(newValue)
      debouncedOnChange(newValue)
    },
    [debouncedOnChange]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value
      if (!newValue.startsWith('#')) {
        newValue = '#' + newValue
      }
      if (/^#[0-9A-Fa-f]{0,6}$/.test(newValue)) {
        handleChange(newValue)
      }
    },
    [handleChange]
  )

  const handleReset = useCallback(() => {
    setLocalValue(defaultValue)
    onChange(defaultValue)
  }, [defaultValue, onChange])

  const showReset = localValue !== defaultValue

  // Get design system colors as presets
  const dsPresets = designSystem?.colors
    ? Object.entries(designSystem.colors).map(([, val]) => val as string)
    : []

  const allPresets = [...new Set([...dsPresets, ...DEFAULT_PRESETS])]

  return (
    <div className="flex gap-1">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 shrink-0"
            disabled={disabled}
          >
            <div
              className="h-5 w-5 rounded border"
              style={{ backgroundColor: localValue }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="space-y-3">
            <HexColorPicker color={localValue} onChange={handleChange} />
            
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted-foreground">HEX</span>
              <HexColorInput
                color={localValue}
                onChange={handleChange}
                prefixed
                className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            {showPresets && (
              <>
                <div className="text-xs text-muted-foreground">Presets</div>
                <div className="grid grid-cols-10 gap-1">
                  {allPresets.slice(0, 20).map((preset) => (
                    <button
                      key={preset}
                      className="h-5 w-5 rounded border cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: preset }}
                      onClick={() => handleChange(preset)}
                      title={preset}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <Input
        value={localValue}
        onChange={handleInputChange}
        disabled={disabled}
        className="h-8 text-sm font-mono"
        maxLength={7}
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
