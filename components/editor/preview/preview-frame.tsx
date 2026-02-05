'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCanvasStore, useDesignSystemStore, useEditorStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { generatePreviewHtml } from './preview-generator'
import { usePreviewBridge } from '@/hooks/use-preview-bridge'
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  ExternalLink,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type DeviceType = 'desktop' | 'tablet' | 'mobile'

const DEVICE_SIZES: Record<DeviceType, { width: number; height: number; label: string }> = {
  desktop: { width: 1280, height: 800, label: 'Desktop' },
  tablet: { width: 768, height: 1024, label: 'Tablet' },
  mobile: { width: 375, height: 667, label: 'Mobile' },
}

interface PreviewFrameProps {
  className?: string
}

export function PreviewFrame({ className }: PreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [device, setDevice] = useState<DeviceType>('desktop')
  const [zoom, setZoom] = useState(100)
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoResize, setAutoResize] = useState(true)
  const [useLivePreview, setUseLivePreview] = useState(true)

  const components = useCanvasStore((state) => state.components)
  const designSystem = useDesignSystemStore((state) => state.designSystem)
  const { selectComponent, hoverComponent } = useEditorStore()

  // Live preview bridge
  const { iframeRef, isReady, updateComponents, updateDesignSystem, setDarkMode: setPreviewDark } =
    usePreviewBridge({
      onComponentClicked: (id) => selectComponent(id),
      onComponentHovered: (id) => hoverComponent(id),
    })

  // Fallback HTML for non-live preview
  const fallbackRef = useRef<HTMLIFrameElement>(null)
  const htmlContent = useMemo(() => {
    if (useLivePreview) return ''
    return generatePreviewHtml(components, designSystem, { darkMode })
  }, [components, designSystem, darkMode, useLivePreview])

  // Sync components to live preview
  useEffect(() => {
    if (useLivePreview && isReady) {
      updateComponents(components)
    }
  }, [components, isReady, useLivePreview, updateComponents])

  // Sync design system
  useEffect(() => {
    if (useLivePreview && isReady) {
      updateDesignSystem(designSystem)
    }
  }, [designSystem, isReady, useLivePreview, updateDesignSystem])

  // Sync dark mode
  useEffect(() => {
    if (useLivePreview && isReady) {
      setPreviewDark(darkMode)
    }
  }, [darkMode, isReady, useLivePreview, setPreviewDark])

  // Fallback HTML update
  useEffect(() => {
    if (!useLivePreview && fallbackRef.current) {
      setIsLoading(true)
      fallbackRef.current.srcdoc = htmlContent
    }
  }, [htmlContent, useLivePreview])

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleRefresh = useCallback(() => {
    if (useLivePreview && iframeRef.current) {
      setIsLoading(true)
      iframeRef.current.src = iframeRef.current.src
    } else if (fallbackRef.current) {
      setIsLoading(true)
      fallbackRef.current.srcdoc = htmlContent
    }
  }, [useLivePreview, htmlContent, iframeRef])

  const handleOpenNewTab = useCallback(() => {
    if (useLivePreview) {
      window.open('/preview', '_blank')
    } else {
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }
  }, [useLivePreview, htmlContent])

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
  }, [])

  const deviceSize = DEVICE_SIZES[device]
  const scale = zoom / 100

  // Auto-resize to fit container
  useEffect(() => {
    if (!autoResize || !containerRef.current) return
    const container = containerRef.current
    const containerWidth = container.clientWidth - 32
    const containerHeight = container.clientHeight - 32
    const scaleX = containerWidth / deviceSize.width
    const scaleY = containerHeight / deviceSize.height
    const fitScale = Math.min(scaleX, scaleY, 1) * 100
    if (Math.abs(fitScale - zoom) > 5) {
      setZoom(Math.round(fitScale))
    }
  }, [device, autoResize, deviceSize, zoom])

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-muted/30',
        isFullscreen && 'fixed inset-0 z-50 bg-background',
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {/* Device selector */}
          <div className="flex items-center rounded-md border bg-background p-0.5">
            {(Object.keys(DEVICE_SIZES) as DeviceType[]).map((d) => (
              <Button
                key={d}
                variant={device === d ? 'secondary' : 'ghost'}
                size="icon"
                className="h-7 w-7"
                onClick={() => setDevice(d)}
                title={DEVICE_SIZES[d].label}
              >
                {d === 'desktop' && <Monitor className="h-4 w-4" />}
                {d === 'tablet' && <Tablet className="h-4 w-4" />}
                {d === 'mobile' && <Smartphone className="h-4 w-4" />}
              </Button>
            ))}
          </div>

          <Badge variant="outline" className="text-xs font-mono">
            {deviceSize.width} x {deviceSize.height}
          </Badge>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setZoom(Math.max(25, zoom - 10))}
              disabled={zoom <= 25}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="w-24">
              <Slider
                value={[zoom]}
                onValueChange={([v]) => {
                  setZoom(v)
                  setAutoResize(false)
                }}
                min={25}
                max={150}
                step={5}
                className="cursor-pointer"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              disabled={zoom >= 150}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Badge variant="secondary" className="text-xs ml-1">
              {zoom}%
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Live/Static toggle */}
          <Button
            variant={useLivePreview ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setUseLivePreview(!useLivePreview)}
            title={useLivePreview ? 'Using live React preview' : 'Using static HTML preview'}
          >
            {useLivePreview ? 'Live' : 'Static'}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleRefresh}
            disabled={isLoading}
            title="Refresh preview"
          >
            <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleOpenNewTab}
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Preview container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 flex items-start justify-center"
        style={{
          background: darkMode
            ? 'repeating-conic-gradient(#1a1a1a 0% 25%, #222 0% 50%) 50% / 20px 20px'
            : 'repeating-conic-gradient(#f5f5f5 0% 25%, #fff 0% 50%) 50% / 20px 20px',
        }}
      >
        <div
          className="relative bg-background shadow-2xl rounded-lg overflow-hidden transition-all duration-200"
          style={{
            width: deviceSize.width,
            height: deviceSize.height,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Live React Preview */}
          {useLivePreview && (
            <iframe
              ref={iframeRef}
              src="/preview"
              title="Live Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              onLoad={handleIframeLoad}
            />
          )}

          {/* Fallback HTML Preview */}
          {!useLivePreview && (
            <iframe
              ref={fallbackRef}
              title="Static Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              onLoad={handleIframeLoad}
            />
          )}

          {device !== 'desktop' && (
            <div
              className="absolute inset-0 pointer-events-none border-4 rounded-lg"
              style={{ borderColor: 'rgba(0,0,0,0.1)' }}
            />
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-3 py-1.5 border-t bg-background/80 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>
          {components.filter((c) => !c.isHidden).length} visible components
        </span>
        <span>
          {useLivePreview ? 'Live React' : 'Static HTML'} {' \u2022 '}
          {darkMode ? 'Dark' : 'Light'} mode {' \u2022 '} {deviceSize.label}
        </span>
      </div>
    </div>
  )
}
