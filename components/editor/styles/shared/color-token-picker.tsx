'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { HexColorPicker } from 'react-colorful'
import { useDesignSystemStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ColorTokenPickerProps {
  value: string | undefined
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
}

export function ColorTokenPicker({ value, onChange, label, disabled }: ColorTokenPickerProps) {
  const [open, setOpen] = useState(false)
  const designSystem = useDesignSystemStore((s) => s.designSystem)

  const tokenColors = designSystem?.colors
    ? Object.entries(designSystem.colors)
        .filter(([, v]) => typeof v === 'string' && (v.startsWith('#') || v.startsWith('rgb') || v.startsWith('hsl')))
        .slice(0, 12)
    : []

  return (
    <div className="space-y-1">
      {label && <Label className="text-[10px] text-muted-foreground">{label}</Label>}
      <div className="flex gap-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-7 w-7 p-0 shrink-0"
              disabled={disabled}
            >
              <div
                className={cn(
                  'h-4 w-4 rounded border',
                  !value && 'bg-transparent bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc),linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]'
                )}
                style={value ? { backgroundColor: value } : undefined}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3 space-y-3" align="start" side="left">
            <HexColorPicker color={value || '#000000'} onChange={onChange} />

            {tokenColors.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[10px] text-muted-foreground font-medium">Design Tokens</p>
                <div className="flex flex-wrap gap-1">
                  {tokenColors.map(([name, color]) => (
                    <button
                      key={name}
                      className={cn(
                        'w-5 h-5 rounded border hover:ring-2 ring-primary transition-all',
                        value === color && 'ring-2 ring-primary'
                      )}
                      style={{ backgroundColor: color as string }}
                      onClick={() => onChange(color as string)}
                      title={name}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Input
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="#000000"
                className="h-7 text-xs font-mono flex-1"
              />
              {value && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() => onChange('')}
                >
                  Clear
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="transparent"
          className="h-7 text-xs font-mono flex-1"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
