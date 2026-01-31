'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  GripVertical,
  LayoutGrid,
  List,
} from 'lucide-react'
import type { ComponentSource, ComponentCategory } from '@/types'
import { SOURCE_LABELS, CATEGORY_LABELS } from '@/types/component'
import { componentRegistry, type ComponentRegistryItem } from '@/lib/components-registry'
import { isComponentAvailable, preloadComponent } from '@/lib/component-loader'
import { cn } from '@/lib/utils/cn'

const allSources: ComponentSource[] = ['shadcn', 'aceternity', 'osmo', 'skiper', 'gsap']
const allCategories: ComponentCategory[] = componentRegistry.getAllCategories()
const sourceCounts = componentRegistry.getSourceCounts()

interface ComponentCardProps {
  component: ComponentRegistryItem
}

function ComponentCard({ component }: ComponentCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `registry-${component.id}`,
    data: {
      type: 'registry',
      registryId: component.id,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const hasImpl = isComponentAvailable(component.id)

  const handleMouseEnter = useCallback(() => {
    if (hasImpl) {
      preloadComponent(component.id)
    }
  }, [component.id, hasImpl])

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative border rounded-lg p-3 cursor-grab hover:border-primary/50 transition-colors bg-card',
        isDragging && 'opacity-50 z-50 shadow-lg'
      )}
      onMouseEnter={handleMouseEnter}
      {...listeners}
      {...attributes}
    >
      <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Preview thumbnail */}
      <div className="aspect-video bg-muted rounded mb-2 overflow-hidden flex items-center justify-center">
        {hasImpl ? (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-muted-foreground text-[10px]">Live</span>
          </div>
        ) : (
          <span className="text-muted-foreground text-xs">Preview</span>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm truncate">{component.displayName}</span>
          <Badge variant={component.source as any} className="text-[10px] px-1.5 py-0">
            {component.source}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {component.description}
        </p>
      </div>
    </div>
  )
}

export function ComponentBrowser() {
  const [search, setSearch] = useState('')
  const [selectedSources, setSelectedSources] = useState<ComponentSource[]>(allSources)
  const [selectedCategories, setSelectedCategories] = useState<ComponentCategory[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const parentRef = useRef<HTMLDivElement>(null)

  const filteredComponents = useMemo(() => {
    return componentRegistry.filter({
      sources: selectedSources.length > 0 ? selectedSources : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      query: search || undefined,
    })
  }, [search, selectedSources, selectedCategories])

  // Virtualized rendering
  const virtualizer = useVirtualizer({
    count: filteredComponents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 130,
    overscan: 5,
  })

  const toggleSource = (source: ComponentSource) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    )
  }

  const toggleCategory = (category: ComponentCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const totalCount = componentRegistry.getAll().length

  return (
    <div className="w-80 border-r bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${totalCount} components...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="justify-between flex-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {(selectedCategories.length > 0 || selectedSources.length < allSources.length) && (
                <Badge variant="secondary" className="text-[10px] px-1 py-0">
                  {selectedCategories.length + (allSources.length - selectedSources.length)}
                </Badge>
              )}
            </span>
            {showFilters ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          <div className="flex items-center rounded-md border bg-background p-0.5 ml-2">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-6 w-6"
              onClick={() => setViewMode('list')}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-6 w-6"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="space-y-3">
            {/* Source filters */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Sources</p>
              <div className="flex flex-wrap gap-1.5">
                {allSources.map((source) => (
                  <Badge
                    key={source}
                    variant={selectedSources.includes(source) ? (source as any) : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleSource(source)}
                  >
                    {SOURCE_LABELS[source].split(' ')[0]} ({sourceCounts[source]})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Category filters */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Categories</p>
              <div className="flex flex-wrap gap-1.5">
                {allCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                    className="cursor-pointer text-xs capitalize"
                    onClick={() => toggleCategory(category)}
                  >
                    {CATEGORY_LABELS[category] || category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Component count */}
      <div className="px-4 py-2 text-xs text-muted-foreground border-b">
        {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
        {filteredComponents.length !== totalCount && ` of ${totalCount}`}
      </div>

      {/* Virtualized component list */}
      <div ref={parentRef} className="flex-1 overflow-auto">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const component = filteredComponents[virtualItem.index]
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                className="px-4 py-1.5"
              >
                <ComponentCard component={component} />
              </div>
            )
          })}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No components found</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
