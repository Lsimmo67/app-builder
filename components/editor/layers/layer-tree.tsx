'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useEditorStore, useCanvasStore, useProjectStore } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LayerItem } from './layer-item'
import {
  Layers,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  FileText,
} from 'lucide-react'
import { ComponentInstance, ComponentSource, SOURCE_COLORS, SOURCE_LABELS } from '@/types/component'
import { componentRegistry } from '@/lib/components-registry'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TreeNode {
  id: string
  component: ComponentInstance
  children: TreeNode[]
}

// Build tree from flat list
function buildTree(components: ComponentInstance[]): TreeNode[] {
  const sorted = [...components].sort((a, b) => a.order - b.order)
  const map = new Map<string, TreeNode>()
  const roots: TreeNode[] = []

  // Create nodes
  for (const comp of sorted) {
    map.set(comp.id, { id: comp.id, component: comp, children: [] })
  }

  // Build hierarchy
  for (const comp of sorted) {
    const node = map.get(comp.id)!
    if (comp.parentId && map.has(comp.parentId)) {
      map.get(comp.parentId)!.children.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}

interface FilterState {
  sources: ComponentSource[]
  showHidden: boolean
  showLocked: boolean
}

export function LayerTree() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<FilterState>({
    sources: [],
    showHidden: true,
    showLocked: true,
  })
  const [isDragging, setIsDragging] = useState(false)

  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const currentPage = useProjectStore((state) => state.currentPage)
  const components = useCanvasStore((state) => state.components)
  const { reorderComponents, moveComponent } = useCanvasStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Filter components
  const filteredComponents = useMemo(() => {
    let result = [...components]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((c) =>
        c.componentRegistryId.toLowerCase().includes(query)
      )
    }

    // Source filter
    if (filters.sources.length > 0) {
      result = result.filter((c) => filters.sources.includes(c.source))
    }

    // Hidden filter
    if (!filters.showHidden) {
      result = result.filter((c) => !c.isHidden)
    }

    // Locked filter
    if (!filters.showLocked) {
      result = result.filter((c) => !c.isLocked)
    }

    return result
  }, [components, searchQuery, filters])

  // Build tree
  const tree = useMemo(() => buildTree(filteredComponents), [filteredComponents])

  // Toggle node expansion
  const toggleExpand = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  // Expand all
  const expandAll = useCallback(() => {
    setExpandedNodes(new Set(components.map((c) => c.id)))
  }, [components])

  // Collapse all
  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set())
  }, [])

  // Handle drag start
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setIsDragging(true)
    setDragOverId(null)
  }, [])

  // Handle drag over — detect cross-level hover
  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { over } = event
      setDragOverId(over ? String(over.id) : null)
    },
    []
  )

  // Handle drag end — supports cross-level moves
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsDragging(false)
      setDragOverId(null)
      const { active, over } = event

      if (!over || active.id === over.id) return

      const activeComp = components.find((c) => c.id === active.id)
      const overComp = components.find((c) => c.id === over.id)
      if (!activeComp || !overComp) return

      // Check if dropping onto a container component (cross-level move)
      const overRegistry = componentRegistry.getById(overComp.componentRegistryId)
      const isOverContainer = overRegistry?.acceptsChildren ?? false

      if (isOverContainer && activeComp.parentId !== overComp.id) {
        // Move into the container as a child
        const children = components
          .filter((c) => c.parentId === overComp.id)
          .sort((a, b) => a.order - b.order)
        const newOrder = children.length > 0 ? Math.max(...children.map((c) => c.order)) + 1 : 0
        moveComponent(activeComp.id, newOrder, overComp.id)
        // Auto-expand the target container
        setExpandedNodes((prev) => new Set([...prev, overComp.id]))
      } else if (activeComp.parentId === overComp.parentId) {
        // Same level reorder
        const siblings = components
          .filter((c) => c.parentId === activeComp.parentId)
          .sort((a, b) => a.order - b.order)
        const oldIndex = siblings.findIndex((c) => c.id === active.id)
        const newIndex = siblings.findIndex((c) => c.id === over.id)
        if (oldIndex !== -1 && newIndex !== -1) {
          reorderComponents(oldIndex, newIndex, activeComp.parentId)
        }
      } else {
        // Cross-level: move to sibling level of the target
        const targetSiblings = components
          .filter((c) => c.parentId === overComp.parentId)
          .sort((a, b) => a.order - b.order)
        const targetIndex = targetSiblings.findIndex((c) => c.id === over.id)
        const newOrder = targetIndex >= 0 ? targetIndex + 1 : targetSiblings.length
        moveComponent(activeComp.id, newOrder, overComp.parentId)
      }
    },
    [components, reorderComponents, moveComponent]
  )

  // Toggle source filter
  const toggleSourceFilter = useCallback((source: ComponentSource) => {
    setFilters((prev) => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source],
    }))
  }, [])

  // Render tree node recursively
  const renderNode = (node: TreeNode, depth: number = 0): React.ReactNode => {
    const hasChildren = node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)
    const isDropTarget = dragOverId === node.id
    const nodeRegistry = componentRegistry.getById(node.component.componentRegistryId)
    const isContainer = nodeRegistry?.acceptsChildren ?? false

    return (
      <div key={node.id}>
        <LayerItem
          component={node.component}
          depth={depth}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          onToggleExpand={() => toggleExpand(node.id)}
          isDropTarget={isDropTarget && isContainer}
        />
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <h3 className="font-medium text-sm">Layers</h3>
            <Badge variant="secondary" className="text-xs">
              {components.length}
            </Badge>
          </div>

          {/* Filter dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-7 w-7',
                  filters.sources.length > 0 && 'text-primary'
                )}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
              {(Object.keys(SOURCE_LABELS) as ComponentSource[]).map((source) => (
                <DropdownMenuCheckboxItem
                  key={source}
                  checked={filters.sources.includes(source)}
                  onCheckedChange={() => toggleSourceFilter(source)}
                >
                  <div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: SOURCE_COLORS[source] }}
                  />
                  {SOURCE_LABELS[source]}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filters.showHidden}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({ ...prev, showHidden: checked }))
                }
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Show Hidden
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.showLocked}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({ ...prev, showLocked: checked }))
                }
              >
                <Lock className="h-4 w-4 mr-2" />
                Show Locked
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search layers..."
            className="h-7 pl-7 text-xs"
          />
        </div>

        {/* Page name */}
        {currentPage && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FileText className="h-3 w-3" />
            <span>Page: {currentPage.name}</span>
          </div>
        )}
      </div>

      {/* Tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {components.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No components yet</p>
              <p className="text-xs">Drag components from the library</p>
            </div>
          ) : filteredComponents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No matching components</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredComponents.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-0.5">
                  {tree.map((node) => renderNode(node))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </ScrollArea>

      {/* Footer actions */}
      {components.length > 0 && (
        <div className="p-2 border-t flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs flex-1"
            onClick={expandAll}
          >
            <ChevronDown className="h-3 w-3 mr-1" />
            Expand All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs flex-1"
            onClick={collapseAll}
          >
            <ChevronRight className="h-3 w-3 mr-1" />
            Collapse All
          </Button>
        </div>
      )}
    </div>
  )
}
