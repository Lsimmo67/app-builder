'use client'

import { useState, useMemo } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  GripVertical,
} from 'lucide-react'
import type { ComponentSource, ComponentCategory } from '@/types'
import { SOURCE_LABELS, SOURCE_COLORS, CATEGORY_LABELS } from '@/types/component'
import { componentRegistry, type ComponentRegistryItem } from '@/lib/components-registry'
import { cn } from '@/lib/utils/cn'

// Get all components from registry
const allRegistryComponents = componentRegistry.getAll()

const allSources: ComponentSource[] = ['shadcn', 'aceternity', 'osmo', 'skiper', 'gsap']
const allCategories: ComponentCategory[] = componentRegistry.getAllCategories()

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative border rounded-lg p-3 cursor-grab hover:border-primary/50 transition-colors bg-card',
        isDragging && 'opacity-50 z-50 shadow-lg'
      )}
      {...listeners}
      {...attributes}
    >
      {/* Drag handle */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Preview */}
      <div className="aspect-video bg-muted rounded mb-2 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
          Preview
        </div>
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

  const filteredComponents = useMemo(() => {
    return componentRegistry.filter({
      sources: selectedSources.length > 0 ? selectedSources : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      query: search || undefined,
    })
  }, [search, selectedSources, selectedCategories])

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

  return (
    <div className="w-80 border-r bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </span>
          {showFilters ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        {showFilters && (
          <div className="space-y-3">
            {/* Source filters */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Sources</p>
              <div className="flex flex-wrap gap-1.5">
                {allSources.map((source) => (
                  <Badge
                    key={source}
                    variant={selectedSources.includes(source) ? source as any : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleSource(source)}
                  >
                    {SOURCE_LABELS[source].split(' ')[0]}
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
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Component list */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
          </p>

          <div className="space-y-2">
            {filteredComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No components found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
