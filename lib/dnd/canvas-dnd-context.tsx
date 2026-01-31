'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
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
  DragOverEvent,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { nanoid } from 'nanoid'
import { useCanvasStore } from '@/lib/store'
import { componentRegistry } from '@/lib/components-registry'
import type { ComponentInstance } from '@/types'

interface DragItem {
  id: UniqueIdentifier
  type: 'registry' | 'canvas'
  data: {
    registryId?: string
    instanceId?: string
  }
}

interface CanvasDndContextType {
  activeId: UniqueIdentifier | null
  activeItem: DragItem | null
  overId: UniqueIdentifier | null
  isDragging: boolean
}

const CanvasDndContext = createContext<CanvasDndContextType>({
  activeId: null,
  activeItem: null,
  overId: null,
  isDragging: false,
})

export const useCanvasDnd = () => useContext(CanvasDndContext)

interface CanvasDndProviderProps {
  children: ReactNode
  pageId: string
}

export function CanvasDndProvider({ children, pageId }: CanvasDndProviderProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeItem, setActiveItem] = useState<DragItem | null>(null)
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null)

  const { components, addComponent, moveComponent, reorderComponents } = useCanvasStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)

    // Determine drag type from data
    const dragData = active.data.current as DragItem['data'] & { type: 'registry' | 'canvas' }
    
    setActiveItem({
      id: active.id,
      type: dragData?.type || 'canvas',
      data: dragData || {},
    })
  }, [])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event
    setOverId(over?.id || null)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      setActiveId(null)
      setActiveItem(null)
      setOverId(null)

      if (!over) return

      const activeData = active.data.current as DragItem['data'] & { type: 'registry' | 'canvas' }
      
      // Case 1: Dragging from registry to canvas
      if (activeData?.type === 'registry' && activeData.registryId) {
        const registryItem = componentRegistry.getById(activeData.registryId)
        if (!registryItem) return

        // Create new component instance
        const newInstance: ComponentInstance = {
          id: nanoid(),
          pageId,
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

        addComponent(newInstance)
      }
      // Case 2: Reordering within canvas
      else if (activeData?.type === 'canvas' && active.id !== over.id) {
        const oldIndex = components.findIndex((c) => c.id === active.id)
        const newIndex = components.findIndex((c) => c.id === over.id)

        if (oldIndex !== -1 && newIndex !== -1) {
          reorderComponents(oldIndex, newIndex)
        }
      }
    },
    [pageId, components, addComponent, reorderComponents]
  )

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
    setActiveItem(null)
    setOverId(null)
  }, [])

  return (
    <CanvasDndContext.Provider
      value={{
        activeId,
        activeItem,
        overId,
        isDragging: activeId !== null,
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={components.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>

        <DragOverlay>
          {activeItem && (
            <DragOverlayContent item={activeItem} />
          )}
        </DragOverlay>
      </DndContext>
    </CanvasDndContext.Provider>
  )
}

function DragOverlayContent({ item }: { item: DragItem }) {
  if (item.type === 'registry' && item.data.registryId) {
    const registryItem = componentRegistry.getById(item.data.registryId)
    if (!registryItem) return null

    return (
      <div className="bg-card border rounded-lg p-4 shadow-2xl opacity-90 w-64">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: getSourceColor(registryItem.source),
            }}
          />
          <span className="font-medium">{registryItem.displayName}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {registryItem.description}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-4 shadow-2xl opacity-90">
      <span className="text-sm">Moving component...</span>
    </div>
  )
}

function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    shadcn: '#000000',
    aceternity: '#6366f1',
    osmo: '#10b981',
    skiper: '#f59e0b',
    gsap: '#22c55e',
  }
  return colors[source] || '#888888'
}
