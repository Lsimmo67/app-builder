'use client'

import { StyleSectionHeader } from '../shared/style-section-header'
import { UnitInput } from '../shared/unit-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ElementStyles } from '@/types'

interface EffectsSectionProps {
  styles: ElementStyles
  onChange: (key: keyof ElementStyles, value: string) => void
  onReset: () => void
  disabled?: boolean
}

const CURSOR_OPTIONS = [
  'default', 'pointer', 'move', 'text', 'wait', 'help',
  'not-allowed', 'grab', 'grabbing', 'crosshair', 'zoom-in', 'zoom-out',
]

const BLEND_MODE_OPTIONS = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
  'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion',
]

const SHADOW_PRESETS = [
  { label: 'SM', value: '0 1px 2px 0 rgba(0,0,0,0.05)' },
  { label: 'MD', value: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)' },
  { label: 'LG', value: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)' },
  { label: 'XL', value: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' },
  { label: '2XL', value: '0 25px 50px -12px rgba(0,0,0,0.25)' },
]

export function EffectsSection({ styles, onChange, onReset, disabled }: EffectsSectionProps) {
  const hasValues = !!(
    styles.opacity || styles.boxShadow || styles.transform ||
    styles.transition || styles.filter || styles.backdropFilter ||
    styles.mixBlendMode || styles.cursor
  )

  const opacityNum = styles.opacity ? parseFloat(styles.opacity) * 100 : 100

  return (
    <StyleSectionHeader title="Effects" defaultOpen={false} hasValues={hasValues} onReset={onReset}>
      {/* Opacity */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] text-muted-foreground">Opacity</Label>
          <span className="text-[10px] text-muted-foreground">{Math.round(opacityNum)}%</span>
        </div>
        <Slider
          value={[opacityNum]}
          onValueChange={([v]) => onChange('opacity', String(v / 100))}
          min={0}
          max={100}
          step={1}
          disabled={disabled}
          className="w-full"
        />
      </div>

      {/* Box Shadow */}
      <div className="space-y-1.5">
        <Label className="text-[10px] text-muted-foreground">Box Shadow</Label>
        <Input
          value={styles.boxShadow || ''}
          onChange={(e) => onChange('boxShadow', e.target.value)}
          placeholder="none"
          className="h-7 text-xs font-mono"
          disabled={disabled}
        />
        <div className="flex gap-1">
          {SHADOW_PRESETS.map((preset) => (
            <button
              key={preset.label}
              className="flex-1 h-6 rounded border text-[9px] font-medium hover:bg-muted transition-colors disabled:opacity-50"
              onClick={() => onChange('boxShadow', preset.value)}
              disabled={disabled}
              title={preset.value}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transform */}
      <div className="space-y-1">
        <Label className="text-[10px] text-muted-foreground">Transform</Label>
        <Input
          value={styles.transform || ''}
          onChange={(e) => onChange('transform', e.target.value)}
          placeholder="none"
          className="h-7 text-xs font-mono"
          disabled={disabled}
        />
      </div>

      {/* Transition */}
      <div className="space-y-1">
        <Label className="text-[10px] text-muted-foreground">Transition</Label>
        <Input
          value={styles.transition || ''}
          onChange={(e) => onChange('transition', e.target.value)}
          placeholder="all 0.3s ease"
          className="h-7 text-xs font-mono"
          disabled={disabled}
        />
      </div>

      {/* Filter */}
      <div className="space-y-1">
        <Label className="text-[10px] text-muted-foreground">Filter</Label>
        <Input
          value={styles.filter || ''}
          onChange={(e) => onChange('filter', e.target.value)}
          placeholder="blur(4px) brightness(1.2)"
          className="h-7 text-xs font-mono"
          disabled={disabled}
        />
      </div>

      {/* Backdrop Filter */}
      <div className="space-y-1">
        <Label className="text-[10px] text-muted-foreground">Backdrop Filter</Label>
        <Input
          value={styles.backdropFilter || ''}
          onChange={(e) => onChange('backdropFilter', e.target.value)}
          placeholder="blur(10px)"
          className="h-7 text-xs font-mono"
          disabled={disabled}
        />
      </div>

      {/* Mix Blend Mode */}
      <div className="space-y-1">
        <Label className="text-[10px] text-muted-foreground">Blend Mode</Label>
        <Select
          value={styles.mixBlendMode || ''}
          onValueChange={(v) => onChange('mixBlendMode', v)}
          disabled={disabled}
        >
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder="Normal" />
          </SelectTrigger>
          <SelectContent>
            {BLEND_MODE_OPTIONS.map((mode) => (
              <SelectItem key={mode} value={mode} className="text-xs capitalize">{mode}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cursor */}
      <div className="space-y-1">
        <Label className="text-[10px] text-muted-foreground">Cursor</Label>
        <Select
          value={styles.cursor || ''}
          onValueChange={(v) => onChange('cursor', v)}
          disabled={disabled}
        >
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            {CURSOR_OPTIONS.map((cursor) => (
              <SelectItem key={cursor} value={cursor} className="text-xs">{cursor}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </StyleSectionHeader>
  )
}
