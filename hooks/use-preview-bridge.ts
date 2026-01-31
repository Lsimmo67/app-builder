'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { EditorToPreviewMessage, PreviewToEditorMessage } from '@/lib/preview/protocol'
import type { ComponentInstance } from '@/types/component'
import type { DesignSystem } from '@/types/project'

interface UsePreviewBridgeOptions {
  onComponentClicked?: (id: string) => void
  onComponentHovered?: (id: string | null) => void
}

export function usePreviewBridge(options: UsePreviewBridgeOptions = {}) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isReady, setIsReady] = useState(false)

  // Listen for messages from preview iframe
  useEffect(() => {
    const handler = (event: MessageEvent<PreviewToEditorMessage>) => {
      if (!event.data?.type) return

      switch (event.data.type) {
        case 'PREVIEW_READY':
          setIsReady(true)
          break
        case 'COMPONENT_CLICKED':
          options.onComponentClicked?.(event.data.payload)
          break
        case 'COMPONENT_HOVERED':
          options.onComponentHovered?.(event.data.payload)
          break
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [options])

  const sendMessage = useCallback((message: EditorToPreviewMessage) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*')
    }
  }, [])

  const updateComponents = useCallback((components: ComponentInstance[]) => {
    sendMessage({ type: 'UPDATE_COMPONENTS', payload: components })
  }, [sendMessage])

  const updateDesignSystem = useCallback((designSystem: DesignSystem | null) => {
    sendMessage({ type: 'UPDATE_DESIGN_SYSTEM', payload: designSystem })
  }, [sendMessage])

  const setSelected = useCallback((id: string | null) => {
    sendMessage({ type: 'SET_SELECTED', payload: id })
  }, [sendMessage])

  const setDarkMode = useCallback((dark: boolean) => {
    sendMessage({ type: 'SET_DARK_MODE', payload: dark })
  }, [sendMessage])

  return {
    iframeRef,
    isReady,
    updateComponents,
    updateDesignSystem,
    setSelected,
    setDarkMode,
  }
}
