'use client'

import { useState, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HexColorPicker } from 'react-colorful'
import { RotateCcw } from 'lucide-react'
import { useDebouncedCallback } from '@/hooks/use-debounce'
import { useDesignSystemStore } from '@/lib/store'

interface StyleEditorProps {
  customStyles: string | undefined
  onChange: (styles: string) => void
  disabled?: boolean
}

interface StyleValues {
  paddingTop: string
  paddingRight: string
  paddingBottom: string
  paddingLeft: string
  marginTop: string
  marginRight: string
  marginBottom: string
  marginLeft: string
  backgroundColor: string
  color: string
  fontSize: string
  fontWeight: string
  textAlign: string
  borderRadius: string
  borderWidth: string
  borderColor: string
  opacity: string
  maxWidth: string
}

const defaultStyles: StyleValues = {
  paddingTop: '',
  paddingRight: '',
  paddingBottom: '',
  paddingLeft: '',
  marginTop: '',
  marginRight: '',
  marginBottom: '',
  marginLeft: '',
  backgroundColor: '',
  color: '',
  fontSize: '',
  fontWeight: '',
  textAlign: '',
  borderRadius: '',
  borderWidth: '',
  borderColor: '',
  opacity: '',
  maxWidth: '',
}

function parseStyles(css: string | undefined): StyleValues {
  if (!css) return { ...defaultStyles }
  const styles = { ...defaultStyles }
  const rules = css.split(';').filter(Boolean)
  for (const rule of rules) {
    const [prop, val] = rule.split(':').map((s) => s.trim())
    if (!prop || !val) continue
    const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    if (camelProp in styles) {
      ;(styles as Record<string, string>)[camelProp] = val
    }
  }
  return styles
}

function serializeStyles(styles: StyleValues): string {
  const entries: string[] = []
  for (const [key, value] of Object.entries(styles)) {
    if (!value) continue
    const kebabKey = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
    entries.push(`${kebabKey}: ${value}`)
  }
  return entries.join('; ')
}

function ColorPickerInline({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (val: string) => void
  label: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex gap-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-7 w-7 p-0 shrink-0">
              <div
                className="h-4 w-4 rounded border"
                style={{ backgroundColor: value || 'transparent' }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <HexColorPicker color={value || '#000000'} onChange={onChange} />
          </PopoverContent>
        </Popover>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="h-7 text-xs font-mono"
        />
      </div>
    </div>
  )
}

export function StyleEditor({ customStyles, onChange, disabled }: StyleEditorProps) {
  const [styles, setStyles] = useState<StyleValues>(() => parseStyles(customStyles))
  const designSystem = useDesignSystemStore((state) => state.designSystem)

  useEffect(() => {
    setStyles(parseStyles(customStyles))
  }, [customStyles])

  const debouncedOnChange = useDebouncedCallback((newStyles: StyleValues) => {
    const serialized = serializeStyles(newStyles)
    onChange(serialized)
  }, 200)

  const updateStyle = useCallback(
    (key: keyof StyleValues, value: string) => {
      setStyles((prev) => {
        const next = { ...prev, [key]: value }
        debouncedOnChange(next)
        return next
      })
    },
    [debouncedOnChange]
  )

  const handleReset = useCallback(() => {
    setStyles({ ...defaultStyles })
    onChange('')
  }, [onChange])

  const hasStyles = Object.values(styles).some(Boolean)

  return (
    <div className="space-y-4">
      {hasStyles && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={handleReset}
            disabled={disabled}
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset all
          </Button>
        </div>
      )}

      {/* Spacing - Padding */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Padding
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {(['Top', 'Right', 'Bottom', 'Left'] as const).map((dir) => {
            const key = `padding${dir}` as keyof StyleValues
            return (
              <div key={key} className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">{dir}</Label>
                <Input
                  value={styles[key]}
                  onChange={(e) => updateStyle(key, e.target.value)}
                  placeholder="0px"
                  className="h-7 text-xs"
                  disabled={disabled}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Spacing - Margin */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Margin
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {(['Top', 'Right', 'Bottom', 'Left'] as const).map((dir) => {
            const key = `margin${dir}` as keyof StyleValues
            return (
              <div key={key} className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">{dir}</Label>
                <Input
                  value={styles[key]}
                  onChange={(e) => updateStyle(key, e.target.value)}
                  placeholder="0px"
                  className="h-7 text-xs"
                  disabled={disabled}
                />
              </div>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Colors */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Colors
        </h4>
        <div className="space-y-2">
          <ColorPickerInline
            label="Background"
            value={styles.backgroundColor}
            onChange={(val) => updateStyle('backgroundColor', val)}
          />
          <ColorPickerInline
            label="Text Color"
            value={styles.color}
            onChange={(val) => updateStyle('color', val)}
          />
          <ColorPickerInline
            label="Border Color"
            value={styles.borderColor}
            onChange={(val) => updateStyle('borderColor', val)}
          />
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Typography */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Typography
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Font Size</Label>
            <Input
              value={styles.fontSize}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              placeholder="16px"
              className="h-7 text-xs"
              disabled={disabled}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Font Weight</Label>
            <Select
              value={styles.fontWeight || ''}
              onValueChange={(val) => updateStyle('fontWeight', val)}
              disabled={disabled}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Default</SelectItem>
                <SelectItem value="300">Light (300)</SelectItem>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semibold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
                <SelectItem value="800">Extra Bold (800)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-1">
            <Label className="text-[10px] text-muted-foreground">Text Align</Label>
            <div className="flex gap-1">
              {['left', 'center', 'right', 'justify'].map((align) => (
                <Button
                  key={align}
                  variant={styles.textAlign === align ? 'secondary' : 'outline'}
                  size="sm"
                  className="h-7 flex-1 text-xs capitalize"
                  onClick={() => updateStyle('textAlign', styles.textAlign === align ? '' : align)}
                  disabled={disabled}
                >
                  {align}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Border & Layout */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Border & Layout
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Border Radius</Label>
            <Input
              value={styles.borderRadius}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              placeholder="0px"
              className="h-7 text-xs"
              disabled={disabled}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Border Width</Label>
            <Input
              value={styles.borderWidth}
              onChange={(e) => updateStyle('borderWidth', e.target.value)}
              placeholder="0px"
              className="h-7 text-xs"
              disabled={disabled}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Opacity</Label>
            <Input
              value={styles.opacity}
              onChange={(e) => updateStyle('opacity', e.target.value)}
              placeholder="1"
              className="h-7 text-xs"
              disabled={disabled}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Max Width</Label>
            <Input
              value={styles.maxWidth}
              onChange={(e) => updateStyle('maxWidth', e.target.value)}
              placeholder="none"
              className="h-7 text-xs"
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* Raw CSS preview */}
      {hasStyles && (
        <>
          <div className="h-px bg-border" />
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Generated CSS
            </h4>
            <pre className="text-[10px] bg-muted rounded p-2 overflow-x-auto whitespace-pre-wrap break-all font-mono text-muted-foreground">
              {serializeStyles(styles)}
            </pre>
          </div>
        </>
      )}
    </div>
  )
}
