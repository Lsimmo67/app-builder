'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
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
import { Badge } from '@/components/ui/badge'
import { Palette, Check, Plus, Trash2, Search, Type, Loader2, X, Upload } from 'lucide-react'
import { useDesignSystemStore } from '@/lib/store'
import { presets, type DesignSystemPreset } from '@/lib/design-tokens/presets'
import type { ColorTokens, TypographyTokens, BorderRadiusTokens, ShadowTokens, GoogleFontConfig, TypographyScale, TypographyScaleEntry, CustomFontConfig } from '@/types'

// Popular Google Fonts curated list for offline browsing
const POPULAR_GOOGLE_FONTS = [
  { family: 'Inter', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Roboto', weights: [100, 300, 400, 500, 700, 900] },
  { family: 'Open Sans', weights: [300, 400, 500, 600, 700, 800] },
  { family: 'Lato', weights: [100, 300, 400, 700, 900] },
  { family: 'Montserrat', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Poppins', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Raleway', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Nunito', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Playfair Display', weights: [400, 500, 600, 700, 800, 900] },
  { family: 'Source Sans 3', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Oswald', weights: [200, 300, 400, 500, 600, 700] },
  { family: 'Merriweather', weights: [300, 400, 700, 900] },
  { family: 'Rubik', weights: [300, 400, 500, 600, 700, 800, 900] },
  { family: 'Work Sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'DM Sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Noto Sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'PT Sans', weights: [400, 700] },
  { family: 'Fira Sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Cabin', weights: [400, 500, 600, 700] },
  { family: 'Space Grotesk', weights: [300, 400, 500, 600, 700] },
  { family: 'Manrope', weights: [200, 300, 400, 500, 600, 700, 800] },
  { family: 'IBM Plex Sans', weights: [100, 200, 300, 400, 500, 600, 700] },
  { family: 'Sora', weights: [100, 200, 300, 400, 500, 600, 700, 800] },
  { family: 'JetBrains Mono', weights: [100, 200, 300, 400, 500, 600, 700, 800] },
  { family: 'Fira Code', weights: [300, 400, 500, 600, 700] },
  { family: 'Outfit', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Plus Jakarta Sans', weights: [200, 300, 400, 500, 600, 700, 800] },
  { family: 'Geist', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Bricolage Grotesque', weights: [200, 300, 400, 500, 600, 700, 800] },
  { family: 'Instrument Sans', weights: [400, 500, 600, 700] },
]

const DEFAULT_TYPOGRAPHY_SCALE: TypographyScale = {
  h1: { fontFamily: 'inherit', fontSize: '3rem', fontWeight: 700, lineHeight: '1.2' },
  h2: { fontFamily: 'inherit', fontSize: '2.25rem', fontWeight: 600, lineHeight: '1.2' },
  h3: { fontFamily: 'inherit', fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.3' },
  h4: { fontFamily: 'inherit', fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.4' },
  h5: { fontFamily: 'inherit', fontSize: '1.125rem', fontWeight: 600, lineHeight: '1.4' },
  h6: { fontFamily: 'inherit', fontSize: '1rem', fontWeight: 600, lineHeight: '1.4' },
  p: { fontFamily: 'inherit', fontSize: '1rem', fontWeight: 400, lineHeight: '1.6' },
}

function buildGoogleFontsUrl(fonts: GoogleFontConfig[]): string {
  if (fonts.length === 0) return ''
  const families = fonts.map((f) => {
    const weights = f.weights.sort().join(';')
    return `family=${encodeURIComponent(f.family)}:wght@${weights}`
  })
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`
}

function registerCustomFont(font: CustomFontConfig) {
  try {
    const formatStr = font.format === 'truetype' ? 'truetype' : font.format
    const fontFace = new FontFace(
      font.family,
      `url(${font.dataUrl}) format("${formatStr}")`,
      {
        weight: String(font.weight || 400),
        style: font.style || 'normal',
      }
    )
    fontFace.load().then((loaded) => {
      document.fonts.add(loaded)
    })
  } catch {
    // FontFace API not available or failed
  }
}

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

  const handleShadowChange = useCallback(
    (key: string, value: string) => {
      if (!designSystem) return
      updateDesignSystem({
        shadows: {
          ...(designSystem.shadows || { sm: '', md: '', lg: '', xl: '', '2xl': '', inner: '' }),
          [key]: value,
        },
      })
    },
    [designSystem, updateDesignSystem]
  )

  const handleSpacingScaleChange = useCallback(
    (index: number, value: number) => {
      if (!designSystem) return
      const newScale = [...designSystem.spacing.scale]
      newScale[index] = value
      updateDesignSystem({
        spacing: { ...designSystem.spacing, scale: newScale },
      })
    },
    [designSystem, updateDesignSystem]
  )

  const handleSpacingScaleAdd = useCallback(() => {
    if (!designSystem) return
    const scale = designSystem.spacing.scale
    const lastVal = scale[scale.length - 1] || 0
    updateDesignSystem({
      spacing: { ...designSystem.spacing, scale: [...scale, lastVal + 8] },
    })
  }, [designSystem, updateDesignSystem])

  const handleSpacingScaleRemove = useCallback(
    (index: number) => {
      if (!designSystem) return
      const newScale = designSystem.spacing.scale.filter((_, i) => i !== index)
      updateDesignSystem({
        spacing: { ...designSystem.spacing, scale: newScale },
      })
    },
    [designSystem, updateDesignSystem]
  )

  // Google Fonts management
  const [fontSearch, setFontSearch] = useState('')

  const handleAddGoogleFont = useCallback(
    (font: { family: string; weights: number[] }) => {
      if (!designSystem) return
      const existing = designSystem.googleFonts || []
      if (existing.some((f) => f.family === font.family)) return
      const newFont: GoogleFontConfig = {
        family: font.family,
        weights: [400, 700],
        styles: ['normal'],
      }
      updateDesignSystem({ googleFonts: [...existing, newFont] })
      // Load the font dynamically
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = buildGoogleFontsUrl([newFont])
      document.head.appendChild(link)
    },
    [designSystem, updateDesignSystem]
  )

  const handleRemoveGoogleFont = useCallback(
    (family: string) => {
      if (!designSystem) return
      const existing = designSystem.googleFonts || []
      updateDesignSystem({ googleFonts: existing.filter((f) => f.family !== family) })
    },
    [designSystem, updateDesignSystem]
  )

  const handleToggleFontWeight = useCallback(
    (family: string, weight: number) => {
      if (!designSystem) return
      const existing = designSystem.googleFonts || []
      const font = existing.find((f) => f.family === family)
      if (!font) return
      const weights = font.weights.includes(weight)
        ? font.weights.filter((w) => w !== weight)
        : [...font.weights, weight].sort()
      if (weights.length === 0) return // must have at least one weight
      const updated = existing.map((f) =>
        f.family === family ? { ...f, weights } : f
      )
      updateDesignSystem({ googleFonts: updated })
    },
    [designSystem, updateDesignSystem]
  )

  // Custom font upload
  const fontUploadRef = useRef<HTMLInputElement>(null)

  const handleCustomFontUpload = useCallback(
    async (file: File) => {
      if (!designSystem) return
      const ext = file.name.split('.').pop()?.toLowerCase()
      let format: CustomFontConfig['format']
      if (ext === 'woff2') format = 'woff2'
      else if (ext === 'woff') format = 'woff'
      else if (ext === 'ttf') format = 'truetype'
      else return

      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Extract font family from filename (user can rename later)
      const family = file.name
        .replace(/\.(woff2?|ttf)$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

      const existing = designSystem.customFonts || []
      const newFont: CustomFontConfig = {
        family,
        fileName: file.name,
        format,
        dataUrl,
        weight: 400,
        style: 'normal',
      }

      updateDesignSystem({ customFonts: [...existing, newFont] })

      // Register the font face in the browser
      registerCustomFont(newFont)
    },
    [designSystem, updateDesignSystem]
  )

  const handleRemoveCustomFont = useCallback(
    (fileName: string) => {
      if (!designSystem) return
      const existing = designSystem.customFonts || []
      updateDesignSystem({ customFonts: existing.filter((f) => f.fileName !== fileName) })
    },
    [designSystem, updateDesignSystem]
  )

  const handleCustomFontWeightChange = useCallback(
    (fileName: string, weight: number) => {
      if (!designSystem) return
      const existing = designSystem.customFonts || []
      updateDesignSystem({
        customFonts: existing.map((f) =>
          f.fileName === fileName ? { ...f, weight } : f
        ),
      })
    },
    [designSystem, updateDesignSystem]
  )

  // Load custom fonts on mount
  useMemo(() => {
    if (!designSystem?.customFonts?.length) return
    for (const font of designSystem.customFonts) {
      registerCustomFont(font)
    }
  }, [designSystem?.customFonts])

  // Typography Scale management
  const handleTypographyScaleChange = useCallback(
    (element: string, key: keyof TypographyScaleEntry, value: string | number) => {
      if (!designSystem) return
      const scale = designSystem.typographyScale || { ...DEFAULT_TYPOGRAPHY_SCALE }
      const entry = scale[element] || DEFAULT_TYPOGRAPHY_SCALE[element] || DEFAULT_TYPOGRAPHY_SCALE.p
      updateDesignSystem({
        typographyScale: {
          ...scale,
          [element]: { ...entry, [key]: value },
        },
      })
    },
    [designSystem, updateDesignSystem]
  )

  const handleInitTypographyScale = useCallback(() => {
    if (!designSystem) return
    updateDesignSystem({ typographyScale: { ...DEFAULT_TYPOGRAPHY_SCALE } })
  }, [designSystem, updateDesignSystem])

  // Load Google Fonts on mount
  const loadedFontsRef = useCallback(() => {
    if (!designSystem?.googleFonts?.length) return
    const url = buildGoogleFontsUrl(designSystem.googleFonts)
    if (!url) return
    const existing = document.querySelector(`link[href="${url}"]`)
    if (existing) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
  }, [designSystem?.googleFonts])

  // Load fonts when component mounts
  useState(() => { loadedFontsRef() })

  // Get all available font families for selectors
  const allFontFamilies = useMemo(() => {
    const fonts = ['inherit', 'system-ui, sans-serif']
    if (designSystem?.typography.fontFamily.heading) fonts.push(designSystem.typography.fontFamily.heading)
    if (designSystem?.typography.fontFamily.body) fonts.push(designSystem.typography.fontFamily.body)
    if (designSystem?.typography.fontFamily.mono) fonts.push(designSystem.typography.fontFamily.mono)
    if (designSystem?.googleFonts) {
      for (const f of designSystem.googleFonts) {
        if (!fonts.includes(f.family)) fonts.push(f.family)
      }
    }
    if (designSystem?.customFonts) {
      for (const f of designSystem.customFonts) {
        if (!fonts.includes(f.family)) fonts.push(f.family)
      }
    }
    return [...new Set(fonts)]
  }, [designSystem])

  const filteredGoogleFonts = useMemo(() => {
    if (!fontSearch) return POPULAR_GOOGLE_FONTS
    const q = fontSearch.toLowerCase()
    return POPULAR_GOOGLE_FONTS.filter((f) => f.family.toLowerCase().includes(q))
  }, [fontSearch])

  if (!designSystem) return null

  const colorEntries = Object.entries(designSystem.colors).filter(
    ([key]) => !key.startsWith('_')
  )

  const installedFonts = designSystem.googleFonts || []
  const customFonts = designSystem.customFonts || []
  const typographyScale = designSystem.typographyScale

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
            <TabsList className="w-full mt-3 flex-wrap h-auto gap-0.5">
              <TabsTrigger value="presets" className="flex-1 text-xs">
                Presets
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex-1 text-xs">
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex-1 text-xs">
                Type
              </TabsTrigger>
              <TabsTrigger value="fonts" className="flex-1 text-xs">
                Fonts
              </TabsTrigger>
              <TabsTrigger value="scale" className="flex-1 text-xs">
                Scale
              </TabsTrigger>
              <TabsTrigger value="spacing" className="flex-1 text-xs">
                Spacing
              </TabsTrigger>
              <TabsTrigger value="shadows" className="flex-1 text-xs">
                Shadows
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
                <div className="space-y-2">
                  {designSystem.spacing.scale.map((val, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-4">{idx}</span>
                      <Input
                        type="number"
                        value={val}
                        onChange={(e) => handleSpacingScaleChange(idx, parseInt(e.target.value) || 0)}
                        className="h-7 text-xs flex-1"
                      />
                      <div
                        className="bg-primary/20 border border-primary/30 h-4"
                        style={{ width: Math.min(val, 64) }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleSpacingScaleRemove(idx)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-7 text-xs"
                    onClick={handleSpacingScaleAdd}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Step
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Shadows Tab */}
            <TabsContent value="shadows" className="mt-3 space-y-4">
              {designSystem.shadows ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Edit shadow tokens. Values use CSS box-shadow syntax.
                  </p>
                  {Object.entries(designSystem.shadows).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-xs">{key}</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          value={value as string}
                          onChange={(e) => handleShadowChange(key, e.target.value)}
                          className="h-7 text-xs font-mono flex-1"
                          placeholder="0 1px 3px rgba(0,0,0,0.12)"
                        />
                        <div
                          className="h-8 w-8 rounded bg-background border shrink-0"
                          style={{ boxShadow: value as string }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-3">No shadow tokens defined</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateDesignSystem({
                        shadows: {
                          sm: '0 1px 2px rgba(0,0,0,0.05)',
                          md: '0 4px 6px rgba(0,0,0,0.07)',
                          lg: '0 10px 15px rgba(0,0,0,0.1)',
                          xl: '0 20px 25px rgba(0,0,0,0.1)',
                          '2xl': '0 25px 50px rgba(0,0,0,0.15)',
                          inner: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                        },
                      })
                    }}
                  >
                    Add Default Shadows
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Google Fonts Tab */}
            <TabsContent value="fonts" className="mt-3 space-y-4">
              {/* Installed Fonts */}
              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Installed Fonts ({installedFonts.length})
                </Label>
                {installedFonts.length === 0 ? (
                  <p className="text-xs text-muted-foreground mt-2">
                    No Google Fonts installed. Add fonts from the list below.
                  </p>
                ) : (
                  <div className="space-y-2 mt-2">
                    {installedFonts.map((font) => {
                      const fontInfo = POPULAR_GOOGLE_FONTS.find((f) => f.family === font.family)
                      const availableWeights = fontInfo?.weights || font.weights
                      return (
                        <div key={font.family} className="border rounded-lg p-2.5">
                          <div className="flex items-center justify-between">
                            <span
                              className="font-medium text-sm"
                              style={{ fontFamily: `"${font.family}", sans-serif` }}
                            >
                              {font.family}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleRemoveGoogleFont(font.family)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {availableWeights.map((w) => (
                              <Badge
                                key={w}
                                variant={font.weights.includes(w) ? 'default' : 'outline'}
                                className="text-[9px] px-1 py-0 cursor-pointer"
                                onClick={() => handleToggleFontWeight(font.family, w)}
                              >
                                {w}
                              </Badge>
                            ))}
                          </div>
                          <p
                            className="text-xs mt-1.5 text-muted-foreground"
                            style={{ fontFamily: `"${font.family}", sans-serif` }}
                          >
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Font Browser */}
              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Add Google Font
                </Label>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    value={fontSearch}
                    onChange={(e) => setFontSearch(e.target.value)}
                    placeholder="Search fonts..."
                    className="h-8 pl-7 text-xs"
                  />
                </div>
                <div className="space-y-1 mt-2 max-h-[300px] overflow-y-auto">
                  {filteredGoogleFonts.map((font) => {
                    const isInstalled = installedFonts.some((f) => f.family === font.family)
                    return (
                      <div
                        key={font.family}
                        className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-sm">{font.family}</span>
                        <Button
                          variant={isInstalled ? 'secondary' : 'outline'}
                          size="sm"
                          className="h-6 text-[10px] px-2"
                          disabled={isInstalled}
                          onClick={() => handleAddGoogleFont(font)}
                        >
                          {isInstalled ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Custom Font Upload */}
              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Custom Fonts ({customFonts.length})
                </Label>
                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  Upload .woff, .woff2, or .ttf font files.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-8 text-xs mb-2"
                  onClick={() => fontUploadRef.current?.click()}
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Upload Font File
                </Button>
                <input
                  ref={fontUploadRef}
                  type="file"
                  accept=".woff,.woff2,.ttf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleCustomFontUpload(file)
                    if (fontUploadRef.current) fontUploadRef.current.value = ''
                  }}
                />
                {customFonts.length > 0 && (
                  <div className="space-y-2">
                    {customFonts.map((font) => (
                      <div key={font.fileName} className="border rounded-lg p-2.5">
                        <div className="flex items-center justify-between">
                          <span
                            className="font-medium text-sm"
                            style={{ fontFamily: `"${font.family}", sans-serif` }}
                          >
                            {font.family}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleRemoveCustomFont(font.fileName)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[9px]">
                            {font.format === 'truetype' ? 'TTF' : font.format.toUpperCase()}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground truncate">
                            {font.fileName}
                          </span>
                        </div>
                        <div className="mt-1.5">
                          <Label className="text-[9px] text-muted-foreground">Weight</Label>
                          <Select
                            value={String(font.weight || 400)}
                            onValueChange={(v) => handleCustomFontWeightChange(font.fileName, Number(v))}
                          >
                            <SelectTrigger className="h-6 text-[10px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => (
                                <SelectItem key={w} value={String(w)} className="text-xs">
                                  {w}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <p
                          className="text-xs mt-1.5 text-muted-foreground"
                          style={{ fontFamily: `"${font.family}", sans-serif` }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Assign to Design System */}
              {(installedFonts.length > 0 || customFonts.length > 0) && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Assign to Design System
                  </Label>
                  <div className="space-y-2 mt-2">
                    {(['heading', 'body', 'mono'] as const).map((role) => (
                      <div key={role} className="flex items-center gap-2">
                        <Label className="text-xs w-16 capitalize">{role}</Label>
                        <Select
                          value={designSystem.typography.fontFamily[role] || ''}
                          onValueChange={(value) => {
                            const newTypo = {
                              ...designSystem.typography,
                              fontFamily: {
                                ...designSystem.typography.fontFamily,
                                [role]: value,
                              },
                            }
                            updateDesignSystem({ typography: newTypo })
                          }}
                        >
                          <SelectTrigger className="h-7 text-xs flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {allFontFamilies.map((f) => (
                              <SelectItem key={f} value={f} className="text-xs">
                                <span style={{ fontFamily: `"${f}", sans-serif` }}>{f}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Typography Scale Tab */}
            <TabsContent value="scale" className="mt-3 space-y-4">
              {!typographyScale ? (
                <div className="text-center py-8">
                  <Type className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Typography Scale</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Define font settings for each HTML element type (H1-H6, P).
                  </p>
                  <Button size="sm" onClick={handleInitTypographyScale}>
                    <Plus className="h-3 w-3 mr-1" />
                    Initialize Scale
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Typography Scale
                  </Label>
                  {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const).map((element) => {
                    const entry = typographyScale[element] || DEFAULT_TYPOGRAPHY_SCALE[element]
                    return (
                      <div key={element} className="border rounded-lg p-2.5">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-[10px] uppercase font-mono">
                            {element}
                          </Badge>
                          <span
                            className="text-xs text-muted-foreground truncate max-w-[150px]"
                            style={{
                              fontFamily: entry.fontFamily === 'inherit' ? undefined : `"${entry.fontFamily}", sans-serif`,
                              fontSize: '11px',
                              fontWeight: entry.fontWeight,
                            }}
                          >
                            Preview Text
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <div>
                            <Label className="text-[9px] text-muted-foreground">Font Family</Label>
                            <Select
                              value={entry.fontFamily}
                              onValueChange={(v) => handleTypographyScaleChange(element, 'fontFamily', v)}
                            >
                              <SelectTrigger className="h-7 text-[10px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {allFontFamilies.map((f) => (
                                  <SelectItem key={f} value={f} className="text-xs">
                                    {f}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-[9px] text-muted-foreground">Size</Label>
                            <Input
                              value={entry.fontSize}
                              onChange={(e) => handleTypographyScaleChange(element, 'fontSize', e.target.value)}
                              className="h-7 text-[10px]"
                            />
                          </div>
                          <div>
                            <Label className="text-[9px] text-muted-foreground">Weight</Label>
                            <Select
                              value={String(entry.fontWeight)}
                              onValueChange={(v) => handleTypographyScaleChange(element, 'fontWeight', Number(v))}
                            >
                              <SelectTrigger className="h-7 text-[10px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => (
                                  <SelectItem key={w} value={String(w)} className="text-xs">
                                    {w}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-[9px] text-muted-foreground">Line Height</Label>
                            <Input
                              value={entry.lineHeight}
                              onChange={(e) => handleTypographyScaleChange(element, 'lineHeight', e.target.value)}
                              className="h-7 text-[10px]"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
