'use client'

import { useCallback, useState, useMemo } from 'react'
import { useEditorStore, useCanvasStore } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LayoutSection } from './sections/layout-section'
import { SpacingSection } from './sections/spacing-section'
import { SizeSection } from './sections/size-section'
import { PositionSection } from './sections/position-section'
import { TypographySection } from './sections/typography-section'
import { BackgroundSection } from './sections/background-section'
import { BorderSection } from './sections/border-section'
import { EffectsSection } from './sections/effects-section'
import type { ElementStyles, ResponsiveStyles } from '@/types'
import { useDebouncedCallback } from '@/hooks/use-debounce'
import { DEBOUNCE_STYLE } from '@/lib/constants/debounce'
import { Monitor, Tablet, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

type Breakpoint = 'desktop' | 'tablet' | 'mobile'

interface StylePanelProps {
  disabled?: boolean
}

export function StylePanel({ disabled = false }: StylePanelProps) {
  const selectedComponentId = useEditorStore((s) => s.selectedComponentId)
  const previewDevice = useEditorStore((s) => s.previewDevice)
  const components = useCanvasStore((s) => s.components)
  const updateComponent = useCanvasStore((s) => s.updateComponent)

  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('desktop')

  const selectedComponent = components.find((c) => c.id === selectedComponentId)

  // Get styles for the active breakpoint
  const currentStyles: ElementStyles = useMemo(() => {
    if (!selectedComponent) return {}
    if (activeBreakpoint === 'desktop') {
      return selectedComponent.styles || {}
    }
    const responsive = selectedComponent.responsiveStyles || {}
    const overrides = responsive[activeBreakpoint] || {}
    // Show merged styles: desktop base + breakpoint overrides
    return { ...(selectedComponent.styles || {}), ...overrides }
  }, [selectedComponent, activeBreakpoint])

  const debouncedUpdate = useDebouncedCallback(
    (update: { styles?: ElementStyles; responsiveStyles?: ResponsiveStyles }) => {
      if (!selectedComponentId) return
      updateComponent(selectedComponentId, update)
    },
    DEBOUNCE_STYLE
  )

  const handleStyleChange = useCallback(
    (key: keyof ElementStyles, value: string) => {
      if (!selectedComponentId || !selectedComponent) return

      if (activeBreakpoint === 'desktop') {
        // Edit desktop (base) styles
        const newStyles: ElementStyles = { ...(selectedComponent.styles || {}) }
        if (value === '' || value === undefined) {
          delete (newStyles as Record<string, unknown>)[key]
        } else {
          ;(newStyles as Record<string, string>)[key] = value
        }
        debouncedUpdate({ styles: newStyles })
      } else {
        // Edit responsive override styles
        const responsive = { ...(selectedComponent.responsiveStyles || {}) }
        const breakpointStyles = { ...(responsive[activeBreakpoint] || {}) }
        if (value === '' || value === undefined) {
          delete (breakpointStyles as Record<string, unknown>)[key]
        } else {
          ;(breakpointStyles as Record<string, string>)[key] = value
        }
        // If override matches desktop value, remove it
        const desktopVal = (selectedComponent.styles || {})[key]
        if (value === desktopVal) {
          delete (breakpointStyles as Record<string, unknown>)[key]
        }
        responsive[activeBreakpoint] = breakpointStyles
        debouncedUpdate({ responsiveStyles: responsive })
      }
    },
    [selectedComponentId, selectedComponent, activeBreakpoint, debouncedUpdate]
  )

  // Section-level reset helpers
  const resetLayout = useCallback(() => {
    if (!selectedComponentId) return
    const newStyles = { ...currentStyles }
    delete newStyles.display
    delete newStyles.flexDirection
    delete newStyles.flexWrap
    delete newStyles.justifyContent
    delete newStyles.alignItems
    delete newStyles.alignSelf
    delete newStyles.flexGrow
    delete newStyles.flexShrink
    delete newStyles.gap
    delete newStyles.gridTemplateColumns
    delete newStyles.gridTemplateRows
    updateComponent(selectedComponentId, { styles: newStyles })
  }, [selectedComponentId, currentStyles, updateComponent])

  const resetSpacing = useCallback(() => {
    if (!selectedComponentId) return
    const newStyles = { ...currentStyles }
    delete newStyles.paddingTop
    delete newStyles.paddingRight
    delete newStyles.paddingBottom
    delete newStyles.paddingLeft
    delete newStyles.marginTop
    delete newStyles.marginRight
    delete newStyles.marginBottom
    delete newStyles.marginLeft
    updateComponent(selectedComponentId, { styles: newStyles })
  }, [selectedComponentId, currentStyles, updateComponent])

  const resetSize = useCallback(() => {
    if (!selectedComponentId) return
    const newStyles = { ...currentStyles }
    delete newStyles.width
    delete newStyles.height
    delete newStyles.minWidth
    delete newStyles.minHeight
    delete newStyles.maxWidth
    delete newStyles.maxHeight
    delete newStyles.overflow
    updateComponent(selectedComponentId, { styles: newStyles })
  }, [selectedComponentId, currentStyles, updateComponent])

  const resetPosition = useCallback(() => {
    if (!selectedComponentId) return
    const newStyles = { ...currentStyles }
    delete newStyles.position
    delete newStyles.top
    delete newStyles.right
    delete newStyles.bottom
    delete newStyles.left
    delete newStyles.zIndex
    updateComponent(selectedComponentId, { styles: newStyles })
  }, [selectedComponentId, currentStyles, updateComponent])

  const resetTypography = useCallback(() => {
    if (!selectedComponentId) return
    const newStyles = { ...currentStyles }
    delete newStyles.fontFamily
    delete newStyles.fontSize
    delete newStyles.fontWeight
    delete newStyles.lineHeight
    delete newStyles.letterSpacing
    delete newStyles.textAlign
    delete newStyles.textDecoration
    delete newStyles.textTransform
    delete newStyles.color
    updateComponent(selectedComponentId, { styles: newStyles })
  }, [selectedComponentId, currentStyles, updateComponent])

  const resetBackground = useCallback(() => {
    if (!selectedComponentId) return
    const newStyles = { ...currentStyles }
    delete newStyles.backgroundColor
    delete newStyles.backgroundImage
    delete newStyles.backgroundSize
    delete newStyles.backgroundPosition
    delete newStyles.backgroundRepeat
    updateComponent(selectedComponentId, { styles: newStyles })
  }, [selectedComponentId, currentStyles, updateComponent])

  const resetBorder = useCallback(() => {
    if (!selectedComponentId) return
    const newStyles = { ...currentStyles }
    delete newStyles.borderWidth
    delete newStyles.borderStyle
    delete newStyles.borderColor
    delete newStyles.borderTopWidth
    delete newStyles.borderRightWidth
    delete newStyles.borderBottomWidth
    delete newStyles.borderLeftWidth
    delete newStyles.borderRadius
    delete newStyles.borderTopLeftRadius
    delete newStyles.borderTopRightRadius
    delete newStyles.borderBottomRightRadius
    delete newStyles.borderBottomLeftRadius
    updateComponent(selectedComponentId, { styles: newStyles })
  }, [selectedComponentId, currentStyles, updateComponent])

  const resetEffects = useCallback(() => {
    if (!selectedComponentId) return
    const newStyles = { ...currentStyles }
    delete newStyles.opacity
    delete newStyles.boxShadow
    delete newStyles.transform
    delete newStyles.transition
    delete newStyles.filter
    delete newStyles.backdropFilter
    delete newStyles.mixBlendMode
    delete newStyles.cursor
    updateComponent(selectedComponentId, { styles: newStyles })
  }, [selectedComponentId, currentStyles, updateComponent])

  // Count responsive overrides
  const responsiveOverrideCount = useMemo(() => {
    if (!selectedComponent?.responsiveStyles) return { tablet: 0, mobile: 0 }
    const tablet = Object.keys(selectedComponent.responsiveStyles.tablet || {}).length
    const mobile = Object.keys(selectedComponent.responsiveStyles.mobile || {}).length
    return { tablet, mobile }
  }, [selectedComponent?.responsiveStyles])

  if (!selectedComponent) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Select an element to edit its styles
      </div>
    )
  }

  return (
    <div className="divide-y divide-border/50">
      {/* Responsive Breakpoint Selector */}
      <div className="px-3 py-2 bg-muted/30">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Breakpoint</span>
          {activeBreakpoint !== 'desktop' && (
            <Badge variant="outline" className="text-[9px] h-4 px-1">Override</Badge>
          )}
        </div>
        <div className="flex items-center gap-1 bg-background rounded-md border p-0.5">
          {([
            { key: 'desktop' as Breakpoint, icon: Monitor, label: 'Desktop', width: '1280px' },
            { key: 'tablet' as Breakpoint, icon: Tablet, label: 'Tablet', width: '768px' },
            { key: 'mobile' as Breakpoint, icon: Smartphone, label: 'Mobile', width: '375px' },
          ]).map(({ key, icon: Icon, label, width }) => (
            <Button
              key={key}
              variant={activeBreakpoint === key ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                'flex-1 h-7 text-[10px] gap-1 relative',
                activeBreakpoint === key && 'font-medium'
              )}
              onClick={() => setActiveBreakpoint(key)}
            >
              <Icon className="h-3 w-3" />
              <span className="hidden sm:inline">{label}</span>
              {key !== 'desktop' && responsiveOverrideCount[key] > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary text-[8px] text-primary-foreground flex items-center justify-center">
                  {responsiveOverrideCount[key]}
                </span>
              )}
            </Button>
          ))}
        </div>
        {activeBreakpoint !== 'desktop' && (
          <p className="text-[10px] text-muted-foreground mt-1">
            Editing styles for {activeBreakpoint} ({activeBreakpoint === 'tablet' ? 'max-width: 768px' : 'max-width: 480px'}). Only differences from desktop are saved.
          </p>
        )}
      </div>
      <LayoutSection
        styles={currentStyles}
        onChange={handleStyleChange}
        onReset={resetLayout}
        disabled={disabled}
      />
      <SpacingSection
        styles={currentStyles}
        onChange={handleStyleChange}
        onReset={resetSpacing}
        disabled={disabled}
      />
      <SizeSection
        styles={currentStyles}
        onChange={handleStyleChange}
        onReset={resetSize}
        disabled={disabled}
      />
      <PositionSection
        styles={currentStyles}
        onChange={handleStyleChange}
        onReset={resetPosition}
        disabled={disabled}
      />
      <TypographySection
        styles={currentStyles}
        onChange={handleStyleChange}
        onReset={resetTypography}
        disabled={disabled}
      />
      <BackgroundSection
        styles={currentStyles}
        onChange={handleStyleChange}
        onReset={resetBackground}
        disabled={disabled}
      />
      <BorderSection
        styles={currentStyles}
        onChange={handleStyleChange}
        onReset={resetBorder}
        disabled={disabled}
      />
      <EffectsSection
        styles={currentStyles}
        onChange={handleStyleChange}
        onReset={resetEffects}
        disabled={disabled}
      />
    </div>
  )
}
