'use client'

import { useMemo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCanvasStore, useEditorStore } from '@/lib/store'
import { componentRegistry } from '@/lib/components-registry'
import { generateSingleComponentHtml } from '@/components/editor/preview/preview-generator'
import { DEVICE_WIDTHS } from '@/types'
import type { ComponentInstance } from '@/types'
import { Plus, GripVertical, Lock, Eye, EyeOff, Trash2, Copy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'
import { ComponentRenderer } from './component-renderer'
import { isComponentAvailable } from '@/lib/component-loader'

interface SortableComponentProps {
  instance: ComponentInstance
}

function SortableComponent({ instance }: SortableComponentProps) {
  const { selectedComponentId, setSelectedComponentId, setHoveredComponentId } = useEditorStore()
  const { updateComponent, removeComponent, duplicateComponent } = useCanvasStore()
  const registryItem = componentRegistry.getById(instance.componentRegistryId)

  // Generate inline HTML preview for this component
  const previewHtml = useMemo(() => {
    try {
      return generateSingleComponentHtml(instance)
    } catch {
      return ''
    }
  }, [instance])

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative',
        isDragging && 'opacity-50 z-50',
        instance.isHidden && 'opacity-40',
      )}
      onClick={(e) => {
        e.stopPropagation()
        if (!instance.isLocked) setSelectedComponentId(instance.id)
      }}
      onMouseEnter={() => setHoveredComponentId(instance.id)}
      onMouseLeave={() => setHoveredComponentId(null)}
    >
      {/* Component Toolbar */}
      <div
        className={cn(
          'absolute -top-10 left-0 right-0 flex items-center justify-between px-2 py-1 bg-card border rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity z-20',
          isSelected && 'opacity-100'
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'p-1 cursor-grab active:cursor-grabbing',
              instance.isLocked && 'cursor-not-allowed opacity-50'
            )}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="text-xs font-medium">{registryItem?.displayName || 'Component'}</span>
          <Badge variant={instance.source as any} className="text-[10px] px-1 py-0">
            {instance.source}
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              updateComponent(instance.id, { isHidden: !instance.isHidden })
            }}
            className="p-1 hover:bg-muted rounded"
            title={instance.isHidden ? 'Show' : 'Hide'}
          >
            {instance.isHidden ? (
              <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              updateComponent(instance.id, { isLocked: !instance.isLocked })
            }}
            className={cn('p-1 hover:bg-muted rounded', instance.isLocked && 'text-amber-500')}
            title={instance.isLocked ? 'Unlock' : 'Lock'}
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              duplicateComponent(instance.id)
            }}
            className="p-1 hover:bg-muted rounded"
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              if (!instance.isLocked) {
                removeComponent(instance.id)
                if (isSelected) setSelectedComponentId(null)
              }
            }}
            disabled={instance.isLocked}
            className={cn(
              'p-1 hover:bg-destructive/10 rounded',
              instance.isLocked && 'opacity-50 cursor-not-allowed'
            )}
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-destructive" />
          </button>
        </div>
      </div>

      {/* Component Content */}
      <div
        className={cn(
          'relative border rounded-lg cursor-pointer transition-all overflow-hidden',
          isSelected ? 'ring-2 ring-primary' : 'hover:border-primary/50',
          instance.isHidden && 'pointer-events-none'
        )}
      >
        {isComponentAvailable(instance.componentRegistryId) ? (
          <>
            <div className="pointer-events-none">
              <ComponentRenderer
                registryId={instance.componentRegistryId}
                props={instance.props}
                componentName={registryItem?.displayName}
              />
            </div>
            {/* Interactive overlay for selection */}
            <div className="absolute inset-0" />
          </>
        ) : (
          <div className="h-24 bg-muted/50 rounded flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium">{registryItem?.displayName || 'Unknown'}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {registryItem?.description?.slice(0, 50) || 'Component preview'}
                {registryItem?.description && registryItem.description.length > 50 ? '...' : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function Canvas() {
  const { components } = useCanvasStore()
  const { previewDevice, setSelectedComponentId } = useEditorStore()
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
    data: {
      type: 'canvas',
      accepts: ['registry'],
    },
  })

  const canvasWidth = DEVICE_WIDTHS[previewDevice]

  return (
    <div className="flex-1 bg-muted/30 overflow-auto p-8">
      <div
        className="mx-auto bg-background border rounded-lg shadow-sm min-h-[600px] transition-all duration-300"
        style={{ width: canvasWidth, maxWidth: '100%' }}
        onClick={() => setSelectedComponentId(null)}
      >
        <div
          ref={setNodeRef}
          className={cn(
            'min-h-[600px] p-4 transition-colors',
            isOver && 'bg-primary/5 ring-2 ring-dashed ring-primary'
          )}
        >
          {components.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors',
                isOver ? 'bg-primary/20' : 'bg-muted'
              )}>
                <Plus className={cn(
                  'h-8 w-8',
                  isOver ? 'text-primary' : 'text-muted-foreground'
                )} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {isOver ? 'Drop to add' : 'Start building'}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {isOver 
                  ? 'Release to add the component to your page'
                  : 'Drag components from the sidebar to start building your page.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-6 pt-8">
              {[...components]
                .sort((a, b) => a.order - b.order)
                .map((instance) => (
                  <SortableComponent key={instance.id} instance={instance} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
