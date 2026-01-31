'use client'

import React, { forwardRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Lock, Eye, EyeOff, Trash2, Copy } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useEditorStore, useCanvasStore } from '@/lib/store'
import type { ComponentInstance } from '@/types'

interface SortableCanvasItemProps {
  instance: ComponentInstance
  children: React.ReactNode
  className?: string
}

export const SortableCanvasItem = forwardRef<HTMLDivElement, SortableCanvasItemProps>(
  ({ instance, children, className }, ref) => {
    const { selectedComponentId, setSelectedComponentId, setHoveredComponentId } = useEditorStore()
    const { updateComponent, removeComponent, duplicateComponent } = useCanvasStore()
    
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: instance.id,
      data: {
        type: 'canvas',
        instanceId: instance.id,
      },
      disabled: instance.isLocked,
    })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    const isSelected = selectedComponentId === instance.id
    const isHidden = instance.isHidden
    const isLocked = instance.isLocked

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isLocked) {
        setSelectedComponentId(instance.id)
      }
    }

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isLocked) {
        removeComponent(instance.id)
        if (isSelected) {
          setSelectedComponentId(null)
        }
      }
    }

    const handleDuplicate = (e: React.MouseEvent) => {
      e.stopPropagation()
      duplicateComponent(instance.id)
    }

    const handleToggleVisibility = (e: React.MouseEvent) => {
      e.stopPropagation()
      updateComponent(instance.id, { isHidden: !isHidden })
    }

    const handleToggleLock = (e: React.MouseEvent) => {
      e.stopPropagation()
      updateComponent(instance.id, { isLocked: !isLocked })
    }

    return (
      <div
        ref={(node) => {
          setNodeRef(node)
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        style={style}
        className={cn(
          'relative group',
          isDragging && 'opacity-50 z-50',
          isSelected && 'ring-2 ring-primary ring-offset-2',
          isHidden && 'opacity-40',
          isLocked && 'cursor-not-allowed',
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => setHoveredComponentId(instance.id)}
        onMouseLeave={() => setHoveredComponentId(null)}
      >
        {/* Component Toolbar */}
        <div
          className={cn(
            'absolute -top-10 left-0 right-0 flex items-center justify-between px-2 py-1 bg-card border rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity z-10',
            isSelected && 'opacity-100'
          )}
        >
          {/* Drag Handle */}
          <div
            className={cn(
              'p-1 cursor-grab active:cursor-grabbing',
              isLocked && 'cursor-not-allowed opacity-50'
            )}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleVisibility}
              className="p-1 hover:bg-muted rounded"
              title={isHidden ? 'Show' : 'Hide'}
            >
              {isHidden ? (
                <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>

            <button
              onClick={handleToggleLock}
              className={cn('p-1 hover:bg-muted rounded', isLocked && 'text-amber-500')}
              title={isLocked ? 'Unlock' : 'Lock'}
            >
              <Lock className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleDuplicate}
              className="p-1 hover:bg-muted rounded"
              title="Duplicate"
            >
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              onClick={handleDelete}
              disabled={isLocked}
              className={cn(
                'p-1 hover:bg-destructive/10 rounded',
                isLocked && 'opacity-50 cursor-not-allowed'
              )}
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5 text-destructive" />
            </button>
          </div>
        </div>

        {/* Component Content */}
        <div className={cn('transition-opacity', isHidden && 'pointer-events-none')}>
          {children}
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute inset-0 pointer-events-none border-2 border-primary rounded" />
        )}
      </div>
    )
  }
)

SortableCanvasItem.displayName = 'SortableCanvasItem'
