'use client'

import { useMemo } from 'react'
import { useDesignSystemStore } from '@/lib/store'
import { StyleSectionHeader } from '../shared/style-section-header'
import { ToggleGroup } from '../shared/toggle-group'
import { UnitInput } from '../shared/unit-input'
import { ColorTokenPicker } from '../shared/color-token-picker'
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
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Underline,
  Strikethrough,
  Minus,
} from 'lucide-react'

interface TypographySectionProps {
  styles: ElementStyles
  onChange: (key: keyof ElementStyles, value: string) => void
  onReset: () => void
  disabled?: boolean
}

const TEXT_ALIGN_OPTIONS = [
  { value: 'left', label: 'Left', icon: <AlignLeft className="h-3 w-3" /> },
  { value: 'center', label: 'Center', icon: <AlignCenter className="h-3 w-3" /> },
  { value: 'right', label: 'Right', icon: <AlignRight className="h-3 w-3" /> },
  { value: 'justify', label: 'Justify', icon: <AlignJustify className="h-3 w-3" /> },
]

const TEXT_DECORATION_OPTIONS = [
  { value: 'none', label: 'None', icon: <Minus className="h-3 w-3" /> },
  { value: 'underline', label: 'Underline', icon: <Underline className="h-3 w-3" /> },
  { value: 'line-through', label: 'Strikethrough', icon: <Strikethrough className="h-3 w-3" /> },
]

const TEXT_TRANSFORM_OPTIONS = [
  { value: 'none', label: 'None', icon: <span className="text-[9px] font-bold">Aa</span> },
  { value: 'uppercase', label: 'Upper', icon: <span className="text-[9px] font-bold">AA</span> },
  { value: 'lowercase', label: 'Lower', icon: <span className="text-[9px] font-bold">aa</span> },
  { value: 'capitalize', label: 'Capitalize', icon: <span className="text-[9px] font-bold">Ab</span> },
]

const FONT_WEIGHTS = [
  { label: 'Thin', value: '100' },
  { label: 'Extra Light', value: '200' },
  { label: 'Light', value: '300' },
  { label: 'Normal', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'Semi Bold', value: '600' },
  { label: 'Bold', value: '700' },
  { label: 'Extra Bold', value: '800' },
  { label: 'Black', value: '900' },
]

export function TypographySection({ styles, onChange, onReset, disabled }: TypographySectionProps) {
  const { designSystem } = useDesignSystemStore()

  const fontFamilies = useMemo(() => {
    const ds = designSystem
    const dsfonts: string[] = []
    if (ds?.typography.fontFamily.heading) dsfonts.push(ds.typography.fontFamily.heading)
    if (ds?.typography.fontFamily.body) dsfonts.push(ds.typography.fontFamily.body)
    if (ds?.typography.fontFamily.mono) dsfonts.push(ds.typography.fontFamily.mono)
    const systemFonts = [
      'system-ui, sans-serif',
      'Arial, sans-serif',
      'Georgia, serif',
      'Times New Roman, serif',
      'Courier New, monospace',
    ]
    return ['inherit', ...new Set([...dsfonts, ...systemFonts])]
  }, [designSystem])
  const hasValues = !!(
    styles.fontFamily || styles.fontSize || styles.fontWeight || styles.lineHeight ||
    styles.letterSpacing || styles.textAlign || styles.textDecoration ||
    styles.textTransform || styles.color
  )

  return (
    <StyleSectionHeader title="Typography" hasValues={hasValues} onReset={onReset}>
      {/* Font Family */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Label className="text-[10px] text-muted-foreground">Font Family</Label>
          {styles.fontFamily && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
        </div>
        <Select
          value={styles.fontFamily || ''}
          onValueChange={(v) => onChange('fontFamily', v)}
          disabled={disabled}
        >
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder="Inherit" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font} className="text-xs">
                <span style={{ fontFamily: font }}>{font.split(',')[0]}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Size / Weight */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Label className="text-[10px] text-muted-foreground">Size</Label>
            {styles.fontSize && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
          </div>
          <UnitInput
            value={styles.fontSize}
            onChange={(v) => onChange('fontSize', v)}
            placeholder="16"
            disabled={disabled}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Label className="text-[10px] text-muted-foreground">Weight</Label>
            {styles.fontWeight && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
          </div>
          <Select
            value={styles.fontWeight || ''}
            onValueChange={(v) => onChange('fontWeight', v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="" className="text-xs">Default</SelectItem>
              {FONT_WEIGHTS.map((w) => (
                <SelectItem key={w.value} value={w.value} className="text-xs">
                  {w.label} ({w.value})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Line Height / Letter Spacing */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Line Height</Label>
          <UnitInput
            value={styles.lineHeight}
            onChange={(v) => onChange('lineHeight', v)}
            placeholder="normal"
            disabled={disabled}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Letter Spacing</Label>
          <UnitInput
            value={styles.letterSpacing}
            onChange={(v) => onChange('letterSpacing', v)}
            placeholder="normal"
            disabled={disabled}
          />
        </div>
      </div>

      {/* Text Color */}
      <ColorTokenPicker
        label="Color"
        value={styles.color}
        onChange={(v) => onChange('color', v)}
        disabled={disabled}
      />

      {/* Text Align */}
      <div className="space-y-1.5">
        <Label className="text-[10px] text-muted-foreground">Align</Label>
        <ToggleGroup
          value={styles.textAlign}
          onChange={(v) => onChange('textAlign', v)}
          options={TEXT_ALIGN_OPTIONS}
          disabled={disabled}
        />
      </div>

      {/* Text Decoration */}
      <div className="space-y-1.5">
        <Label className="text-[10px] text-muted-foreground">Decoration</Label>
        <ToggleGroup
          value={styles.textDecoration}
          onChange={(v) => onChange('textDecoration', v)}
          options={TEXT_DECORATION_OPTIONS}
          disabled={disabled}
        />
      </div>

      {/* Text Transform */}
      <div className="space-y-1.5">
        <Label className="text-[10px] text-muted-foreground">Transform</Label>
        <ToggleGroup
          value={styles.textTransform}
          onChange={(v) => onChange('textTransform', v)}
          options={TEXT_TRANSFORM_OPTIONS}
          disabled={disabled}
        />
      </div>
    </StyleSectionHeader>
  )
}
