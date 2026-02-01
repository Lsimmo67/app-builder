'use client'

import { StyleSectionHeader } from '../shared/style-section-header'
import { ToggleGroup } from '../shared/toggle-group'
import { UnitInput } from '../shared/unit-input'
import { Label } from '@/components/ui/label'
import type { ElementStyles } from '@/types'

interface SizeSectionProps {
  styles: ElementStyles
  onChange: (key: keyof ElementStyles, value: string) => void
  onReset: () => void
  disabled?: boolean
}

const OVERFLOW_OPTIONS = [
  { value: 'visible' as const, label: 'Visible' },
  { value: 'hidden' as const, label: 'Hidden' },
  { value: 'scroll' as const, label: 'Scroll' },
  { value: 'auto' as const, label: 'Auto' },
]

export function SizeSection({ styles, onChange, onReset, disabled }: SizeSectionProps) {
  const hasValues = !!(
    styles.width || styles.height || styles.minWidth || styles.minHeight ||
    styles.maxWidth || styles.maxHeight || styles.overflow
  )

  return (
    <StyleSectionHeader title="Size" hasValues={hasValues} onReset={onReset}>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Label className="text-[10px] text-muted-foreground">Width</Label>
            {styles.width && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
          </div>
          <UnitInput
            value={styles.width}
            onChange={(v) => onChange('width', v)}
            placeholder="auto"
            disabled={disabled}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Label className="text-[10px] text-muted-foreground">Height</Label>
            {styles.height && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
          </div>
          <UnitInput
            value={styles.height}
            onChange={(v) => onChange('height', v)}
            placeholder="auto"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Min W</Label>
          <UnitInput
            value={styles.minWidth}
            onChange={(v) => onChange('minWidth', v)}
            placeholder="none"
            disabled={disabled}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Min H</Label>
          <UnitInput
            value={styles.minHeight}
            onChange={(v) => onChange('minHeight', v)}
            placeholder="none"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Max W</Label>
          <UnitInput
            value={styles.maxWidth}
            onChange={(v) => onChange('maxWidth', v)}
            placeholder="none"
            disabled={disabled}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Max H</Label>
          <UnitInput
            value={styles.maxHeight}
            onChange={(v) => onChange('maxHeight', v)}
            placeholder="none"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1">
          <Label className="text-[10px] text-muted-foreground">Overflow</Label>
          {styles.overflow && styles.overflow !== 'visible' && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
        </div>
        <ToggleGroup
          value={styles.overflow}
          onChange={(v) => onChange('overflow', v)}
          options={OVERFLOW_OPTIONS}
          disabled={disabled}
        />
      </div>
    </StyleSectionHeader>
  )
}
