'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { nanoid } from 'nanoid'
import { EditorToolbar } from '@/components/editor/toolbar/editor-toolbar'
import { ComponentBrowser } from '@/components/editor/sidebar/component-browser'
import { Canvas } from '@/components/editor/canvas/canvas-container'
import { PropertiesPanel } from '@/components/editor/properties/properties-panel'
import { LayerTree } from '@/components/editor/layers'
import { useProjectStore, useCanvasStore, useDesignSystemStore, useEditorStore } from '@/lib/store'
import { componentRegistry } from '@/lib/components-registry'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { useState, useCallback } from 'react'
import type { ComponentInstance } from '@/types'

// Dynamic imports for heavy components
const CodePanel = dynamic(
  () => import('@/components/editor/code').then(m => ({ default: m.CodePanel })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }
)

const PreviewFrame = dynamic(
  () => import('@/components/editor/preview').then(m => ({ default: m.PreviewFrame })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }
)

export default function EditorPage() {
  const params = useParams()
  const projectId = params.id as string

  const { currentProject, currentPage, loadProject, isLoading: projectLoading } = useProjectStore()
  const { components, loadComponents, addComponent, reorderComponents } = useCanvasStore()
  const { loadDesignSystem } = useDesignSystemStore()
  const { viewMode, sidebarOpen, propertiesOpen, layerTreeOpen } = useEditorStore()

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeData, setActiveData] = useState<{ type: string; registryId?: string } | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (projectId) {
      loadProject(projectId)
      loadDesignSystem(projectId)
    }
  }, [projectId, loadProject, loadDesignSystem])

  useEffect(() => {
    if (currentPage) {
      loadComponents(currentPage.id)
    }
  }, [currentPage, loadComponents])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)
    setActiveData(active.data.current as any)
  }, [])

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)
      setActiveData(null)

      if (!over) return
      if (!currentPage) return

      const activeData = active.data.current as { type: string; registryId?: string; instanceId?: string }

      // Dragging from registry to canvas
      if (activeData?.type === 'registry' && activeData.registryId) {
        const registryItem = componentRegistry.getById(activeData.registryId)
        if (!registryItem) return

        const newInstance: ComponentInstance = {
          id: nanoid(),
          pageId: currentPage.id,
          parentId: undefined,
          componentRegistryId: registryItem.id,
          source: registryItem.source,
          order: components.length,
          props: registryItem.props.reduce((acc, prop) => {
            if (prop.default !== undefined) {
              acc[prop.name] = prop.default
            }
            return acc
          }, {} as Record<string, unknown>),
          customCode: undefined,
          customStyles: undefined,
          isLocked: false,
          isHidden: false,
        }

        await addComponent(newInstance)
      }
      // Reordering within canvas
      else if (activeData?.type === 'canvas' && active.id !== over.id) {
        const oldIndex = components.findIndex((c) => c.id === active.id)
        const newIndex = components.findIndex((c) => c.id === over.id)

        if (oldIndex !== -1 && newIndex !== -1) {
          await reorderComponents(oldIndex, newIndex)
        }
      }
    },
    [currentPage, components, addComponent, reorderComponents]
  )

  if (projectLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Render based on view mode
  const renderMainContent = () => {
    switch (viewMode) {
      case 'visual':
        return (
          <div className="flex-1 flex overflow-hidden">
            {sidebarOpen && <ComponentBrowser />}
            {layerTreeOpen && (
              <div className="w-64 border-r bg-card overflow-hidden">
                <LayerTree />
              </div>
            )}
            <Canvas />
            {propertiesOpen && <PropertiesPanel />}
          </div>
        )

      case 'split':
        return (
          <div className="flex-1 flex overflow-hidden">
            {/* Left side - Canvas with optional sidebar */}
            <div className="flex-1 flex overflow-hidden min-w-0" style={{ flex: '0 0 60%' }}>
              {sidebarOpen && <ComponentBrowser />}
              {layerTreeOpen && (
                <div className="w-64 border-r bg-card overflow-hidden">
                  <LayerTree />
                </div>
              )}
              <Canvas />
            </div>

            {/* Resize Handle */}
            <div className="w-1 bg-border hover:bg-primary/20 transition-colors cursor-col-resize" />

            {/* Right side - Code Panel */}
            <div className="flex-1 min-w-0" style={{ flex: '0 0 40%' }}>
              <CodePanel />
            </div>
          </div>
        )

      case 'code':
        return <CodePanel />

      case 'preview':
        return <PreviewFrame />

      default:
        return <Canvas />
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={components.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="h-screen flex flex-col overflow-hidden">
          {/* Toolbar */}
          <EditorToolbar />

          {/* Main Editor Area */}
          {renderMainContent()}
        </div>
      </SortableContext>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeId && activeData?.type === 'registry' && activeData.registryId && (
          <DragOverlayContent registryId={activeData.registryId} />
        )}
        {activeId && activeData?.type === 'canvas' && (
          <div className="bg-card border rounded-lg p-4 shadow-2xl opacity-90">
            <span className="text-sm">Moving component...</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

function DragOverlayContent({ registryId }: { registryId: string }) {
  const registryItem = componentRegistry.getById(registryId)
  if (!registryItem) return null

  return (
    <div className="bg-card border rounded-lg p-4 shadow-2xl opacity-95 w-64">
      <div className="flex items-center gap-2">
        <Badge variant={registryItem.source as any} className="text-xs">
          {registryItem.source}
        </Badge>
        <span className="font-medium">{registryItem.displayName}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
        {registryItem.description}
      </p>
    </div>
  )
}
