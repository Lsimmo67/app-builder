'use client'

import { StyleSectionHeader } from '../shared/style-section-header'
import { ToggleGroup } from '../shared/toggle-group'
import { UnitInput } from '../shared/unit-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ElementStyles } from '@/types'

interface PositionSectionProps {
  styles: ElementStyles
  onChange: (key: keyof ElementStyles, value: string) => void
  onReset: () => void
  disabled?: boolean
}

const POSITION_OPTIONS = [
  { value: 'static' as const, label: 'Static' },
  { value: 'relative' as const, label: 'Relative' },
  { value: 'absolute' as const, label: 'Absolute' },
  { value: 'fixed' as const, label: 'Fixed' },
  { value: 'sticky' as const, label: 'Sticky' },
]

export function PositionSection({ styles, onChange, onReset, disabled }: PositionSectionProps) {
  const hasValues = !!(
    styles.position || styles.top || styles.right || styles.bottom ||
    styles.left || styles.zIndex
  )

  const showOffsets = styles.position && styles.position !== 'static'

  return (
    <StyleSectionHeader title="Position" defaultOpen={false} hasValues={hasValues} onReset={onReset}>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1">
          <Label className="text-[10px] text-muted-foreground">Position</Label>
          {styles.position && styles.position !== 'static' && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
        </div>
        <ToggleGroup
          value={styles.position}
          onChange={(v) => onChange('position', v)}
          options={POSITION_OPTIONS}
          disabled={disabled}
        />
      </div>

      {showOffsets && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Top</Label>
              <UnitInput
                value={styles.top}
                onChange={(v) => onChange('top', v)}
                placeholder="auto"
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Right</Label>
              <UnitInput
                value={styles.right}
                onChange={(v) => onChange('right', v)}
                placeholder="auto"
                disabled={disabled}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Bottom</Label>
              <UnitInput
                value={styles.bottom}
                onChange={(v) => onChange('bottom', v)}
                placeholder="auto"
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Left</Label>
              <UnitInput
                value={styles.left}
                onChange={(v) => onChange('left', v)}
                placeholder="auto"
                disabled={disabled}
              />
            </div>
          </div>
        </>
      )}

      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Label className="text-[10px] text-muted-foreground">Z-Index</Label>
          {styles.zIndex && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
        </div>
        <Input
          value={styles.zIndex || ''}
          onChange={(e) => onChange('zIndex', e.target.value)}
          placeholder="auto"
          className="h-7 text-xs"
          disabled={disabled}
        />
      </div>
    </StyleSectionHeader>
  )
}
