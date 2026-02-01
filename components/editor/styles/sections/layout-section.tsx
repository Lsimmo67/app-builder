'use client'

import { StyleSectionHeader } from '../shared/style-section-header'
import { ToggleGroup } from '../shared/toggle-group'
import { UnitInput } from '../shared/unit-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ElementStyles } from '@/types'
import {
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyEnd,
  AlignHorizontalSpaceBetween,
  AlignHorizontalSpaceAround,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyEnd,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Rows3,
  Columns3,
  LayoutGrid,
  Minus,
  WrapText,
} from 'lucide-react'

interface LayoutSectionProps {
  styles: ElementStyles
  onChange: (key: keyof ElementStyles, value: string) => void
  onReset: () => void
  disabled?: boolean
}

const DISPLAY_OPTIONS = [
  { value: 'block' as const, label: 'Block', icon: <Rows3 className="h-3.5 w-3.5" /> },
  { value: 'flex' as const, label: 'Flex', icon: <Columns3 className="h-3.5 w-3.5" /> },
  { value: 'grid' as const, label: 'Grid', icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { value: 'inline-block' as const, label: 'Inline Block', icon: <span className="text-[9px] font-bold">IB</span> },
  { value: 'inline' as const, label: 'Inline', icon: <span className="text-[9px] font-bold">I</span> },
  { value: 'none' as const, label: 'None', icon: <Minus className="h-3.5 w-3.5" /> },
]

const FLEX_DIRECTION_OPTIONS = [
  { value: 'row' as const, label: 'Row', icon: <ArrowRight className="h-3 w-3" /> },
  { value: 'column' as const, label: 'Column', icon: <ArrowDown className="h-3 w-3" /> },
  { value: 'row-reverse' as const, label: 'Row Reverse', icon: <ArrowLeft className="h-3 w-3" /> },
  { value: 'column-reverse' as const, label: 'Column Reverse', icon: <ArrowUp className="h-3 w-3" /> },
]

const JUSTIFY_OPTIONS = [
  { value: 'flex-start', label: 'Start', icon: <AlignHorizontalJustifyStart className="h-3 w-3" /> },
  { value: 'center', label: 'Center', icon: <AlignHorizontalJustifyCenter className="h-3 w-3" /> },
  { value: 'flex-end', label: 'End', icon: <AlignHorizontalJustifyEnd className="h-3 w-3" /> },
  { value: 'space-between', label: 'Between', icon: <AlignHorizontalSpaceBetween className="h-3 w-3" /> },
  { value: 'space-around', label: 'Around', icon: <AlignHorizontalSpaceAround className="h-3 w-3" /> },
]

const ALIGN_OPTIONS = [
  { value: 'flex-start', label: 'Start', icon: <AlignVerticalJustifyStart className="h-3 w-3" /> },
  { value: 'center', label: 'Center', icon: <AlignVerticalJustifyCenter className="h-3 w-3" /> },
  { value: 'flex-end', label: 'End', icon: <AlignVerticalJustifyEnd className="h-3 w-3" /> },
  { value: 'stretch', label: 'Stretch', icon: <span className="text-[9px] font-bold">S</span> },
]

const WRAP_OPTIONS = [
  { value: 'nowrap' as const, label: 'No Wrap', icon: <Minus className="h-3 w-3" /> },
  { value: 'wrap' as const, label: 'Wrap', icon: <WrapText className="h-3 w-3" /> },
]

export function LayoutSection({ styles, onChange, onReset, disabled }: LayoutSectionProps) {
  const isFlex = styles.display === 'flex' || styles.display === 'inline-flex'
  const isGrid = styles.display === 'grid'

  const hasValues = !!(
    styles.display || styles.flexDirection || styles.justifyContent ||
    styles.alignItems || styles.gap || styles.flexWrap ||
    styles.gridTemplateColumns || styles.gridTemplateRows
  )

  return (
    <StyleSectionHeader title="Layout" hasValues={hasValues} onReset={onReset}>
      {/* Display */}
      <div className="space-y-1.5">
        <Label className="text-[10px] text-muted-foreground">Display</Label>
        <ToggleGroup
          value={styles.display}
          onChange={(v) => onChange('display', v)}
          options={DISPLAY_OPTIONS}
          disabled={disabled}
        />
      </div>

      {/* Flex-specific controls */}
      {isFlex && (
        <>
          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Direction</Label>
            <ToggleGroup
              value={styles.flexDirection}
              onChange={(v) => onChange('flexDirection', v)}
              options={FLEX_DIRECTION_OPTIONS}
              disabled={disabled}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Justify</Label>
            <ToggleGroup
              value={styles.justifyContent}
              onChange={(v) => onChange('justifyContent', v)}
              options={JUSTIFY_OPTIONS}
              disabled={disabled}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Align</Label>
            <ToggleGroup
              value={styles.alignItems}
              onChange={(v) => onChange('alignItems', v)}
              options={ALIGN_OPTIONS}
              disabled={disabled}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Wrap</Label>
            <ToggleGroup
              value={styles.flexWrap}
              onChange={(v) => onChange('flexWrap', v)}
              options={WRAP_OPTIONS}
              disabled={disabled}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Gap</Label>
            <UnitInput
              value={styles.gap}
              onChange={(v) => onChange('gap', v)}
              placeholder="0"
              disabled={disabled}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Grow</Label>
              <Input
                value={styles.flexGrow || ''}
                onChange={(e) => onChange('flexGrow', e.target.value)}
                placeholder="0"
                className="h-7 text-xs"
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Shrink</Label>
              <Input
                value={styles.flexShrink || ''}
                onChange={(e) => onChange('flexShrink', e.target.value)}
                placeholder="1"
                className="h-7 text-xs"
                disabled={disabled}
              />
            </div>
          </div>
        </>
      )}

      {/* Grid-specific controls */}
      {isGrid && (
        <>
          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Grid Columns</Label>
            <Input
              value={styles.gridTemplateColumns || ''}
              onChange={(e) => onChange('gridTemplateColumns', e.target.value)}
              placeholder="repeat(3, 1fr)"
              className="h-7 text-xs font-mono"
              disabled={disabled}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Grid Rows</Label>
            <Input
              value={styles.gridTemplateRows || ''}
              onChange={(e) => onChange('gridTemplateRows', e.target.value)}
              placeholder="auto"
              className="h-7 text-xs font-mono"
              disabled={disabled}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Gap</Label>
            <UnitInput
              value={styles.gap}
              onChange={(v) => onChange('gap', v)}
              placeholder="0"
              disabled={disabled}
            />
          </div>
        </>
      )}
    </StyleSectionHeader>
  )
}
