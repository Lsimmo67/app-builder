'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HexColorPicker } from 'react-colorful'
import { Palette, Check } from 'lucide-react'
import { useDesignSystemStore } from '@/lib/store'
import { presets, type DesignSystemPreset } from '@/lib/design-tokens/presets'
import type { ColorTokens, TypographyTokens, BorderRadiusTokens } from '@/types'

function ColorTokenEditor({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="h-7 w-7 rounded border shrink-0" style={{ backgroundColor: value }} />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start" side="left">
          <HexColorPicker color={value} onChange={onChange} />
        </PopoverContent>
      </Popover>
      <div className="flex-1 min-w-0">
        <Label className="text-[10px] text-muted-foreground capitalize">{label}</Label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 text-[11px] font-mono px-1.5"
        />
      </div>
    </div>
  )
}

export function DesignSystemPanel() {
  const { designSystem, updateDesignSystem, applyPreset } = useDesignSystemStore()
  const [open, setOpen] = useState(false)

  const handleColorChange = useCallback(
    (key: string, value: string) => {
      if (!designSystem) return
      updateDesignSystem({
        colors: {
          ...designSystem.colors,
          [key]: value,
        },
      })
    },
    [designSystem, updateDesignSystem]
  )

  const handleTypographyChange = useCallback(
    (section: keyof TypographyTokens, key: string, value: string | number) => {
      if (!designSystem) return
      updateDesignSystem({
        typography: {
          ...designSystem.typography,
          [section]: {
            ...designSystem.typography[section],
            [key]: value,
          },
        },
      })
    },
    [designSystem, updateDesignSystem]
  )

  const handleBorderRadiusChange = useCallback(
    (key: string, value: string) => {
      if (!designSystem) return
      updateDesignSystem({
        borderRadius: {
          ...designSystem.borderRadius,
          [key]: value,
        },
      })
    },
    [designSystem, updateDesignSystem]
  )

  const handlePresetApply = useCallback(
    (preset: DesignSystemPreset) => {
      applyPreset(preset.id)
    },
    [applyPreset]
  )

  if (!designSystem) return null

  const colorEntries = Object.entries(designSystem.colors).filter(
    ([key]) => !key.startsWith('_')
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Palette className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>Design System</TooltipContent>
      </Tooltip>

      <SheetContent className="w-[420px] sm:max-w-[420px] p-0">
        <SheetHeader className="p-4 pb-0">
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Design System
          </SheetTitle>
          <SheetDescription>
            Define global styles for your project: colors, typography, and spacing.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="presets" className="flex flex-col h-[calc(100vh-120px)]">
          <div className="px-4">
            <TabsList className="w-full mt-3">
              <TabsTrigger value="presets" className="flex-1 text-xs">
                Presets
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex-1 text-xs">
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex-1 text-xs">
                Typography
              </TabsTrigger>
              <TabsTrigger value="spacing" className="flex-1 text-xs">
                Spacing
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 px-4">
            {/* Presets Tab */}
            <TabsContent value="presets" className="mt-3 space-y-3">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-primary/50 ${
                    designSystem.presetId === preset.id ? 'ring-2 ring-primary border-primary' : ''
                  }`}
                  onClick={() => handlePresetApply(preset)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium">{preset.name}</h4>
                      <p className="text-xs text-muted-foreground">{preset.description}</p>
                    </div>
                    {designSystem.presetId === preset.id && (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    )}
                  </div>
                  {/* Color preview */}
                  <div className="flex gap-1 mt-2">
                    {Object.entries(preset.tokens.colors)
                      .slice(0, 8)
                      .map(([key, val]) => (
                        <div
                          key={key}
                          className="h-5 flex-1 rounded-sm border"
                          style={{ backgroundColor: val }}
                          title={`${key}: ${val}`}
                        />
                      ))}
                  </div>
                  {/* Typography preview */}
                  <div className="text-[10px] text-muted-foreground mt-2">
                    Fonts: {preset.tokens.typography.fontFamily.heading} / {preset.tokens.typography.fontFamily.body}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Colors Tab */}
            <TabsContent value="colors" className="mt-3 space-y-2">
              <p className="text-xs text-muted-foreground mb-3">
                Click a color swatch to change it. Changes apply globally.
              </p>
              {colorEntries.map(([key, value]) => (
                <ColorTokenEditor
                  key={key}
                  label={key.replace(/([A-Z])/g, ' $1').trim()}
                  value={value as string}
                  onChange={(val) => handleColorChange(key, val)}
                />
              ))}
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="mt-3 space-y-4">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Font Families
                </h4>
                <div className="space-y-2">
                  {Object.entries(designSystem.typography.fontFamily).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-xs capitalize">{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) =>
                          handleTypographyChange('fontFamily', key, e.target.value)
                        }
                        className="h-8 text-sm"
                        placeholder="Font name..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Font Sizes
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(designSystem.typography.fontSize).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) =>
                          handleTypographyChange('fontSize', key, e.target.value)
                        }
                        className="h-7 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Font Weights
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(designSystem.typography.fontWeight).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground capitalize">{key}</Label>
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleTypographyChange('fontWeight', key, parseInt(e.target.value) || 400)
                        }
                        className="h-7 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Line Heights
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(designSystem.typography.lineHeight).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground capitalize">{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) =>
                          handleTypographyChange('lineHeight', key, e.target.value)
                        }
                        className="h-7 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Spacing Tab */}
            <TabsContent value="spacing" className="mt-3 space-y-4">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Border Radius
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(designSystem.borderRadius).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">{key}</Label>
                      <div className="flex gap-1 items-center">
                        <Input
                          value={value}
                          onChange={(e) => handleBorderRadiusChange(key, e.target.value)}
                          className="h-7 text-xs"
                        />
                        <div
                          className="h-6 w-6 border-2 border-foreground/20 shrink-0"
                          style={{ borderRadius: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Spacing Unit
                </h4>
                <div className="space-y-1">
                  <Label className="text-[10px] text-muted-foreground">Base unit (px)</Label>
                  <Input
                    type="number"
                    value={designSystem.spacing.unit}
                    onChange={(e) =>
                      updateDesignSystem({
                        spacing: {
                          ...designSystem.spacing,
                          unit: parseInt(e.target.value) || 4,
                        },
                      })
                    }
                    className="h-7 text-xs w-24"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Spacing Scale
                </h4>
                <div className="flex flex-wrap gap-2">
                  {designSystem.spacing.scale.map((val, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <div
                        className="bg-primary/20 border border-primary/30"
                        style={{ width: Math.min(val, 48), height: 16 }}
                      />
                      <span className="text-[10px] text-muted-foreground">{val}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
