'use client'

import { useEffect, useState } from 'react'
import { ComponentRenderer } from '@/components/editor/canvas/component-renderer'
import type { ComponentInstance } from '@/types/component'
import type { EditorToPreviewMessage } from '@/lib/preview/protocol'

export default function PreviewPage() {
  const [components, setComponents] = useState<ComponentInstance[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const handler = (event: MessageEvent<EditorToPreviewMessage>) => {
      if (!event.data?.type) return

      switch (event.data.type) {
        case 'UPDATE_COMPONENTS':
          setComponents(event.data.payload)
          break
        case 'UPDATE_DESIGN_SYSTEM':
          // Design system updates handled by parent CSS variables
          break
        case 'SET_SELECTED':
          setSelectedId(event.data.payload)
          break
        case 'SET_DARK_MODE':
          setDarkMode(event.data.payload)
          break
      }
    }

    window.addEventListener('message', handler)

    // Signal ready to parent
    window.parent.postMessage({ type: 'PREVIEW_READY' }, '*')

    return () => window.removeEventListener('message', handler)
  }, [])

  const visibleComponents = components
    .filter((c) => !c.isHidden)
    .sort((a, b) => a.order - b.order)

  return (
    <main className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        {visibleComponents.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">No components to preview</p>
              <p className="text-sm">Add components to see them here</p>
            </div>
          </div>
        ) : (
          visibleComponents.map((component) => (
            <div
              key={component.id}
              className={selectedId === component.id ? 'ring-2 ring-primary ring-inset' : ''}
              onClick={() => {
                window.parent.postMessage(
                  { type: 'COMPONENT_CLICKED', payload: component.id },
                  '*'
                )
              }}
              onMouseEnter={() => {
                window.parent.postMessage(
                  { type: 'COMPONENT_HOVERED', payload: component.id },
                  '*'
                )
              }}
              onMouseLeave={() => {
                window.parent.postMessage(
                  { type: 'COMPONENT_HOVERED', payload: null },
                  '*'
                )
              }}
            >
              <ComponentRenderer
                registryId={component.componentRegistryId}
                props={component.props}
              />
            </div>
          ))
        )}
      </div>
    </main>
  )
}
