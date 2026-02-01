'use client'

import { useState } from 'react'
import { StyleSectionHeader } from '../shared/style-section-header'
import { ToggleGroup } from '../shared/toggle-group'
import { UnitInput } from '../shared/unit-input'
import { ColorTokenPicker } from '../shared/color-token-picker'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { ElementStyles } from '@/types'
import { Link2, Unlink2, Minus } from 'lucide-react'

interface BorderSectionProps {
  styles: ElementStyles
  onChange: (key: keyof ElementStyles, value: string) => void
  onReset: () => void
  disabled?: boolean
}

const BORDER_STYLE_OPTIONS = [
  { value: 'none', label: 'None', icon: <Minus className="h-3 w-3" /> },
  { value: 'solid', label: 'Solid', icon: <span className="text-[9px] font-bold">-</span> },
  { value: 'dashed', label: 'Dashed', icon: <span className="text-[9px] font-bold">--</span> },
  { value: 'dotted', label: 'Dotted', icon: <span className="text-[9px] font-bold">...</span> },
]

export function BorderSection({ styles, onChange, onReset, disabled }: BorderSectionProps) {
  const [linkedWidth, setLinkedWidth] = useState(true)
  const [linkedRadius, setLinkedRadius] = useState(true)

  const hasValues = !!(
    styles.borderWidth || styles.borderStyle || styles.borderColor ||
    styles.borderRadius || styles.borderTopWidth || styles.borderRightWidth ||
    styles.borderBottomWidth || styles.borderLeftWidth ||
    styles.borderTopLeftRadius || styles.borderTopRightRadius ||
    styles.borderBottomRightRadius || styles.borderBottomLeftRadius
  )

  const handleLinkedWidthChange = (value: string) => {
    onChange('borderWidth', value)
    onChange('borderTopWidth', '')
    onChange('borderRightWidth', '')
    onChange('borderBottomWidth', '')
    onChange('borderLeftWidth', '')
  }

  const handleLinkedRadiusChange = (value: string) => {
    onChange('borderRadius', value)
    onChange('borderTopLeftRadius', '')
    onChange('borderTopRightRadius', '')
    onChange('borderBottomRightRadius', '')
    onChange('borderBottomLeftRadius', '')
  }

  return (
    <StyleSectionHeader title="Border" defaultOpen={false} hasValues={hasValues} onReset={onReset}>
      {/* Border Style */}
      <div className="space-y-1.5">
        <Label className="text-[10px] text-muted-foreground">Style</Label>
        <ToggleGroup
          value={styles.borderStyle}
          onChange={(v) => onChange('borderStyle', v)}
          options={BORDER_STYLE_OPTIONS}
          disabled={disabled}
        />
      </div>

      {/* Border Color */}
      <ColorTokenPicker
        label="Color"
        value={styles.borderColor}
        onChange={(v) => onChange('borderColor', v)}
        disabled={disabled}
      />

      {/* Border Width */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] text-muted-foreground">Width</Label>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => setLinkedWidth(!linkedWidth)}
            disabled={disabled}
          >
            {linkedWidth ? (
              <Link2 className="h-3 w-3 text-primary" />
            ) : (
              <Unlink2 className="h-3 w-3 text-muted-foreground" />
            )}
          </Button>
        </div>

        {linkedWidth ? (
          <UnitInput
            value={styles.borderWidth}
            onChange={handleLinkedWidthChange}
            placeholder="0"
            disabled={disabled}
          />
        ) : (
          <div className="grid grid-cols-2 gap-1">
            <UnitInput
              value={styles.borderTopWidth}
              onChange={(v) => onChange('borderTopWidth', v)}
              placeholder="0"
              disabled={disabled}
              label="T"
            />
            <UnitInput
              value={styles.borderRightWidth}
              onChange={(v) => onChange('borderRightWidth', v)}
              placeholder="0"
              disabled={disabled}
              label="R"
            />
            <UnitInput
              value={styles.borderBottomWidth}
              onChange={(v) => onChange('borderBottomWidth', v)}
              placeholder="0"
              disabled={disabled}
              label="B"
            />
            <UnitInput
              value={styles.borderLeftWidth}
              onChange={(v) => onChange('borderLeftWidth', v)}
              placeholder="0"
              disabled={disabled}
              label="L"
            />
          </div>
        )}
      </div>

      {/* Border Radius */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] text-muted-foreground">Radius</Label>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => setLinkedRadius(!linkedRadius)}
            disabled={disabled}
          >
            {linkedRadius ? (
              <Link2 className="h-3 w-3 text-primary" />
            ) : (
              <Unlink2 className="h-3 w-3 text-muted-foreground" />
            )}
          </Button>
        </div>

        {linkedRadius ? (
          <UnitInput
            value={styles.borderRadius}
            onChange={handleLinkedRadiusChange}
            placeholder="0"
            disabled={disabled}
          />
        ) : (
          <div className="grid grid-cols-2 gap-1">
            <UnitInput
              value={styles.borderTopLeftRadius}
              onChange={(v) => onChange('borderTopLeftRadius', v)}
              placeholder="0"
              disabled={disabled}
              label="TL"
            />
            <UnitInput
              value={styles.borderTopRightRadius}
              onChange={(v) => onChange('borderTopRightRadius', v)}
              placeholder="0"
              disabled={disabled}
              label="TR"
            />
            <UnitInput
              value={styles.borderBottomLeftRadius}
              onChange={(v) => onChange('borderBottomLeftRadius', v)}
              placeholder="0"
              disabled={disabled}
              label="BL"
            />
            <UnitInput
              value={styles.borderBottomRightRadius}
              onChange={(v) => onChange('borderBottomRightRadius', v)}
              placeholder="0"
              disabled={disabled}
              label="BR"
            />
          </div>
        )}
      </div>
    </StyleSectionHeader>
  )
}
