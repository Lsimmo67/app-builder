'use client'

import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils/cn'
import { useCanvasDnd } from './canvas-dnd-context'

interface DroppableCanvasProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function DroppableCanvas({ id, children, className }: DroppableCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'canvas',
      accepts: ['registry', 'canvas'],
    },
  })

  const { isDragging, activeItem } = useCanvasDnd()

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative min-h-[400px] transition-colors duration-200',
        isDragging && 'bg-primary/5',
        isOver && isDragging && 'bg-primary/10 ring-2 ring-primary ring-dashed',
        className
      )}
    >
      {children}

      {/* Drop indicator when dragging from registry */}
      {isDragging && activeItem?.type === 'registry' && (
        <div
          className={cn(
            'absolute inset-4 border-2 border-dashed rounded-lg flex items-center justify-center pointer-events-none transition-all',
            isOver ? 'border-primary bg-primary/10' : 'border-muted-foreground/30'
          )}
        >
          <div
            className={cn(
              'text-center p-4 rounded-lg transition-colors',
              isOver ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <p className="font-medium">
              {isOver ? 'Release to add component' : 'Drag component here'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
