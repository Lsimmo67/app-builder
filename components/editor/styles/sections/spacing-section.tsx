'use client'

import { StyleSectionHeader } from '../shared/style-section-header'
import { UnitInput } from '../shared/unit-input'
import { Label } from '@/components/ui/label'
import type { ElementStyles } from '@/types'
import { cn } from '@/lib/utils'

interface SpacingSectionProps {
  styles: ElementStyles
  onChange: (key: keyof ElementStyles, value: string) => void
  onReset: () => void
  disabled?: boolean
}

export function SpacingSection({ styles, onChange, onReset, disabled }: SpacingSectionProps) {
  const hasValues = !!(
    styles.paddingTop || styles.paddingRight || styles.paddingBottom || styles.paddingLeft ||
    styles.marginTop || styles.marginRight || styles.marginBottom || styles.marginLeft
  )

  return (
    <StyleSectionHeader title="Spacing" hasValues={hasValues} onReset={onReset}>
      {/* Visual Box Model Diagram */}
      <div className="relative bg-muted/30 rounded-lg p-1">
        {/* Margin layer */}
        <div className="relative border border-dashed border-orange-300/50 rounded-md p-1">
          <span className="absolute top-0 left-1 text-[8px] text-orange-400 font-medium">margin</span>

          {/* Margin inputs */}
          <div className="flex justify-center mb-1 mt-2">
            <UnitInput
              value={styles.marginTop}
              onChange={(v) => onChange('marginTop', v)}
              placeholder="0"
              disabled={disabled}
              className="w-16"
              showUnit={false}
            />
          </div>

          <div className="flex items-center gap-1">
            <UnitInput
              value={styles.marginLeft}
              onChange={(v) => onChange('marginLeft', v)}
              placeholder="0"
              disabled={disabled}
              className="w-16"
              showUnit={false}
            />

            {/* Padding layer */}
            <div className="flex-1 relative border border-dashed border-green-400/50 rounded p-1">
              <span className="absolute top-0 left-1 text-[8px] text-green-500 font-medium">padding</span>

              <div className="flex justify-center mb-1 mt-2">
                <UnitInput
                  value={styles.paddingTop}
                  onChange={(v) => onChange('paddingTop', v)}
                  placeholder="0"
                  disabled={disabled}
                  className="w-16"
                  showUnit={false}
                />
              </div>

              <div className="flex items-center gap-1">
                <UnitInput
                  value={styles.paddingLeft}
                  onChange={(v) => onChange('paddingLeft', v)}
                  placeholder="0"
                  disabled={disabled}
                  className="w-14"
                  showUnit={false}
                />

                {/* Content area */}
                <div className="flex-1 bg-primary/10 rounded text-center py-2">
                  <span className="text-[9px] text-muted-foreground">content</span>
                </div>

                <UnitInput
                  value={styles.paddingRight}
                  onChange={(v) => onChange('paddingRight', v)}
                  placeholder="0"
                  disabled={disabled}
                  className="w-14"
                  showUnit={false}
                />
              </div>

              <div className="flex justify-center mt-1">
                <UnitInput
                  value={styles.paddingBottom}
                  onChange={(v) => onChange('paddingBottom', v)}
                  placeholder="0"
                  disabled={disabled}
                  className="w-16"
                  showUnit={false}
                />
              </div>
            </div>

            <UnitInput
              value={styles.marginRight}
              onChange={(v) => onChange('marginRight', v)}
              placeholder="0"
              disabled={disabled}
              className="w-16"
              showUnit={false}
            />
          </div>

          <div className="flex justify-center mt-1">
            <UnitInput
              value={styles.marginBottom}
              onChange={(v) => onChange('marginBottom', v)}
              placeholder="0"
              disabled={disabled}
              className="w-16"
              showUnit={false}
            />
          </div>
        </div>
      </div>
    </StyleSectionHeader>
  )
}
