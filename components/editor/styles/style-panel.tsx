'use client'

import { useCallback } from 'react'
import { useEditorStore, useCanvasStore } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LayoutSection } from './sections/layout-section'
import { SpacingSection } from './sections/spacing-section'
import { SizeSection } from './sections/size-section'
import { PositionSection } from './sections/position-section'
import { TypographySection } from './sections/typography-section'
import { BackgroundSection } from './sections/background-section'
import { BorderSection } from './sections/border-section'
import { EffectsSection } from './sections/effects-section'
import type { ElementStyles } from '@/types'
import { useDebouncedCallback } from '@/hooks/use-debounce'
import { DEBOUNCE_STYLE } from '@/lib/constants/debounce'

interface StylePanelProps {
  disabled?: boolean
}

export function StylePanel({ disabled = false }: StylePanelProps) {
  const selectedComponentId = useEditorStore((s) => s.selectedComponentId)
  const components = useCanvasStore((s) => s.components)
  const updateComponent = useCanvasStore((s) => s.updateComponent)

  const selectedComponent = components.find((c) => c.id === selectedComponentId)
  const currentStyles: ElementStyles = selectedComponent?.styles || {}

  const debouncedUpdate = useDebouncedCallback(
    (styles: ElementStyles) => {
      if (!selectedComponentId) return
      updateComponent(selectedComponentId, { styles })
    },
    DEBOUNCE_STYLE
  )

  const handleStyleChange = useCallback(
    (key: keyof ElementStyles, value: string) => {
      if (!selectedComponentId) return
      const newStyles: ElementStyles = { ...currentStyles }

      if (value === '' || value === undefined) {
        delete (newStyles as Record<string, unknown>)[key]
      } else {
        ;(newStyles as Record<string, string>)[key] = value
      }

      debouncedUpdate(newStyles)
    },
    [selectedComponentId, currentStyles, debouncedUpdate]
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

  if (!selectedComponent) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Select an element to edit its styles
      </div>
    )
  }

  return (
    <div className="divide-y divide-border/50">
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
