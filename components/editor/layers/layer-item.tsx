'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEditorStore, useCanvasStore } from '@/lib/store'
import { componentRegistry } from '@/lib/components-registry'
import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  GripVertical,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  ChevronRight,
  ChevronDown,
  Box,
  Layout,
  Type as TypeIcon,
  Image,
  Sparkles,
  MousePointer2,
  Pencil,
} from 'lucide-react'
import { ComponentInstance, ComponentSource, SOURCE_COLORS } from '@/types/component'
import { cn } from '@/lib/utils'

interface LayerItemProps {
  component: ComponentInstance
  depth?: number
  isExpanded?: boolean
  hasChildren?: boolean
  onToggleExpand?: () => void
}

// Get icon based on component category
function getComponentIcon(registryId: string) {
  const registry = componentRegistry.getById(registryId)
  if (!registry) return Box

  const category = registry.categories[0]
  switch (category) {
    case 'hero':
    case 'section':
    case 'layout':
      return Layout
    case 'text':
      return TypeIcon
    case 'media':
    case 'background':
      return Image
    case 'animation':
    case 'effect':
      return Sparkles
    case 'button':
    case 'cta':
      return MousePointer2
    default:
      return Box
  }
}

export function LayerItem({
  component,
  depth = 0,
  isExpanded = false,
  hasChildren = false,
  onToggleExpand,
}: LayerItemProps) {
  const { selectedComponentId, selectComponent, hoveredComponentId, hoverComponent } = useEditorStore()
  const { updateComponent, removeComponent, duplicateComponent } = useCanvasStore()

  const isSelected = selectedComponentId === component.id
  const isHovered = hoveredComponentId === component.id

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: component.id,
    data: {
      type: 'layer',
      component,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const [isRenaming, setIsRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const renameInputRef = useRef<HTMLInputElement>(null)

  const registry = componentRegistry.getById(component.componentRegistryId)
  const Icon = getComponentIcon(component.componentRegistryId)
  const sourceColor = SOURCE_COLORS[component.source]

  const displayName = component.displayName || registry?.displayName || component.componentRegistryId

  const handleClick = useCallback(() => {
    selectComponent(component.id)
  }, [component.id, selectComponent])

  const handleDoubleClick = useCallback(() => {
    setRenameValue(displayName)
    setIsRenaming(true)
  }, [displayName])

  const handleRenameSubmit = useCallback(() => {
    const trimmed = renameValue.trim()
    if (trimmed && trimmed !== displayName) {
      updateComponent(component.id, { displayName: trimmed })
    }
    setIsRenaming(false)
  }, [renameValue, displayName, component.id, updateComponent])

  const handleRenameKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameSubmit()
    } else if (e.key === 'Escape') {
      setIsRenaming(false)
    }
  }, [handleRenameSubmit])

  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus()
      renameInputRef.current.select()
    }
  }, [isRenaming])

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          className={cn(
            'flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer transition-colors',
            'hover:bg-muted/50',
            isSelected && 'bg-primary/10 border border-primary/30',
            isHovered && !isSelected && 'bg-muted/70',
            isDragging && 'opacity-50',
            component.isLocked && 'opacity-60',
            component.isHidden && 'opacity-40'
          )}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => hoverComponent(component.id)}
          onMouseLeave={() => hoverComponent(null)}
        >
          {/* Drag handle */}
          <button
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-3 w-3" />
          </button>

          {/* Indentation */}
          {depth > 0 && (
            <div style={{ width: depth * 16 }} className="shrink-0" />
          )}

          {/* Expand/collapse */}
          {hasChildren ? (
            <button
              className="p-0.5 hover:bg-muted rounded"
              onClick={(e) => {
                e.stopPropagation()
                onToggleExpand?.()
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Icon */}
          <div
            className="p-1 rounded"
            style={{ backgroundColor: `${sourceColor}15` }}
          >
            <Icon
              className="h-3 w-3"
              style={{ color: sourceColor === '#ffffff' ? '#666' : sourceColor }}
            />
          </div>

          {/* Name */}
          {isRenaming ? (
            <input
              ref={renameInputRef}
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={handleRenameKeyDown}
              className="flex-1 text-xs bg-background border border-primary rounded px-1 py-0 outline-none min-w-0"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={cn(
                'flex-1 truncate text-xs',
                component.isHidden && 'line-through',
                component.isLocked && 'text-muted-foreground'
              )}
            >
              {displayName}
            </span>
          )}

          {/* Status indicators */}
          <div className="flex items-center gap-0.5">
            {component.isLocked && (
              <Lock className="h-3 w-3 text-primary" />
            )}
            {component.isHidden && (
              <EyeOff className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={handleClick}>
          <MousePointer2 className="h-4 w-4 mr-2" />
          Select
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDoubleClick}>
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </ContextMenuItem>
        <ContextMenuItem onClick={() => duplicateComponent(component.id)}>
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() =>
            updateComponent(component.id, { isHidden: !component.isHidden })
          }
        >
          {component.isHidden ? (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show
            </>
          ) : (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide
            </>
          )}
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() =>
            updateComponent(component.id, { isLocked: !component.isLocked })
          }
        >
          {component.isLocked ? (
            <>
              <Unlock className="h-4 w-4 mr-2" />
              Unlock
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Lock
            </>
          )}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => {
            removeComponent(component.id)
            if (isSelected) selectComponent(null)
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
