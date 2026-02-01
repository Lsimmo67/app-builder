'use client'

import { StyleSectionHeader } from '../shared/style-section-header'
import { ColorTokenPicker } from '../shared/color-token-picker'
import { ToggleGroup } from '../shared/toggle-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ElementStyles } from '@/types'

interface BackgroundSectionProps {
  styles: ElementStyles
  onChange: (key: keyof ElementStyles, value: string) => void
  onReset: () => void
  disabled?: boolean
}

const BG_SIZE_OPTIONS = [
  { value: 'cover', label: 'Cover' },
  { value: 'contain', label: 'Contain' },
  { value: 'auto', label: 'Auto' },
]

const BG_REPEAT_OPTIONS = [
  { value: 'no-repeat', label: 'None' },
  { value: 'repeat', label: 'Repeat' },
  { value: 'repeat-x', label: 'X' },
  { value: 'repeat-y', label: 'Y' },
]

const BG_POSITION_PRESETS = [
  'center',
  'top',
  'bottom',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
]

export function BackgroundSection({ styles, onChange, onReset, disabled }: BackgroundSectionProps) {
  const hasValues = !!(
    styles.backgroundColor || styles.backgroundImage ||
    styles.backgroundSize || styles.backgroundPosition || styles.backgroundRepeat
  )

  return (
    <StyleSectionHeader title="Background" defaultOpen={false} hasValues={hasValues} onReset={onReset}>
      {/* Background Color */}
      <ColorTokenPicker
        label="Color"
        value={styles.backgroundColor}
        onChange={(v) => onChange('backgroundColor', v)}
        disabled={disabled}
      />

      {/* Background Image */}
      <div className="space-y-1">
        <Label className="text-[10px] text-muted-foreground">Image / Gradient</Label>
        <Input
          value={styles.backgroundImage || ''}
          onChange={(e) => onChange('backgroundImage', e.target.value)}
          placeholder="url(...) or linear-gradient(...)"
          className="h-7 text-xs font-mono"
          disabled={disabled}
        />
      </div>

      {/* Quick gradient presets */}
      {!styles.backgroundImage && (
        <div className="flex flex-wrap gap-1">
          {[
            { label: 'Sunset', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { label: 'Ocean', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { label: 'Forest', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
            { label: 'Dark', value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)' },
          ].map((preset) => (
            <button
              key={preset.label}
              className="h-5 w-10 rounded border text-[8px] hover:ring-1 ring-primary transition-all"
              style={{ backgroundImage: preset.value }}
              onClick={() => onChange('backgroundImage', preset.value)}
              disabled={disabled}
              title={preset.label}
            />
          ))}
        </div>
      )}

      {/* Size / Position / Repeat */}
      {styles.backgroundImage && (
        <>
          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Size</Label>
            <ToggleGroup
              value={styles.backgroundSize}
              onChange={(v) => onChange('backgroundSize', v)}
              options={BG_SIZE_OPTIONS}
              disabled={disabled}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Position</Label>
            <Select
              value={styles.backgroundPosition || ''}
              onValueChange={(v) => onChange('backgroundPosition', v)}
              disabled={disabled}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue placeholder="center" />
              </SelectTrigger>
              <SelectContent>
                {BG_POSITION_PRESETS.map((pos) => (
                  <SelectItem key={pos} value={pos} className="text-xs">{pos}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Repeat</Label>
            <ToggleGroup
              value={styles.backgroundRepeat}
              onChange={(v) => onChange('backgroundRepeat', v)}
              options={BG_REPEAT_OPTIONS}
              disabled={disabled}
            />
          </div>
        </>
      )}
    </StyleSectionHeader>
  )
}
