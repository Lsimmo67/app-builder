'use client'

import { useMemo } from 'react'
import { useEditorStore, useCanvasStore } from '@/lib/store'
import { componentRegistry } from '@/lib/components-registry'
import { ChevronRight, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ElementBreadcrumb() {
  const selectedComponentId = useEditorStore((state) => state.selectedComponentId)
  const components = useCanvasStore((state) => state.components)
  const { selectComponent } = useEditorStore()

  // Build ancestor chain from selected component to root
  const breadcrumbs = useMemo(() => {
    if (!selectedComponentId) return []

    const chain: { id: string; label: string }[] = []
    let currentId: string | undefined = selectedComponentId

    while (currentId) {
      const comp = components.find((c) => c.id === currentId)
      if (!comp) break

      const registryItem = componentRegistry.getById(comp.componentRegistryId)
      chain.unshift({
        id: comp.id,
        label: registryItem?.displayName || comp.componentRegistryId,
      })

      currentId = comp.parentId
    }

    // Add "Body" as root
    chain.unshift({ id: '__body__', label: 'Body' })

    return chain
  }, [selectedComponentId, components])

  if (breadcrumbs.length <= 1) return null

  return (
    <div className="h-7 border-t bg-muted/30 flex items-center px-2 gap-0.5 overflow-x-auto scrollbar-none">
      <Layers className="h-3 w-3 text-muted-foreground shrink-0 mr-1" />
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1
        return (
          <div key={item.id} className="flex items-center gap-0.5 shrink-0">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            <button
              className={cn(
                'text-[11px] px-1.5 py-0.5 rounded hover:bg-muted transition-colors truncate max-w-[120px]',
                isLast
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => {
                if (item.id === '__body__') {
                  selectComponent(null)
                } else {
                  selectComponent(item.id)
                }
              }}
            >
              {item.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}
