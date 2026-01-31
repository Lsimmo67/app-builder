'use client'

import React, { forwardRef } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface DraggableRegistryItemProps {
  id: string
  registryId: string
  children: React.ReactNode
  className?: string
}

export const DraggableRegistryItem = forwardRef<HTMLDivElement, DraggableRegistryItemProps>(
  ({ id, registryId, children, className }, ref) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id,
      data: {
        type: 'registry',
        registryId,
      },
    })

    const style = {
      transform: CSS.Translate.toString(transform),
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
          'relative group cursor-grab active:cursor-grabbing',
          isDragging && 'opacity-50 z-50',
          className
        )}
        {...attributes}
        {...listeners}
      >
        {/* Drag Handle */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        {children}
      </div>
    )
  }
)

DraggableRegistryItem.displayName = 'DraggableRegistryItem'
