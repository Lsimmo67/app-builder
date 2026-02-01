'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  GripVertical,
  List,
  // Element icons
  PanelTop,
  Square,
  BoxSelect,
  Columns3,
  LayoutDashboard,
  Grid3X3,
  Heading1,
  AlignLeft,
  Type,
  Link2,
  FileText,
  ListOrdered,
  Image,
  Video,
  FormInput,
  TextCursorInput,
  AlignJustify,
  ChevronDownSquareIcon,
  MousePointerClick,
  ExternalLink,
  Blocks,
  Puzzle,
} from 'lucide-react'
import type { ComponentSource, ComponentCategory } from '@/types'
import { SOURCE_LABELS, CATEGORY_LABELS } from '@/types/component'
import { componentRegistry, type ComponentRegistryItem } from '@/lib/components-registry'
import { isComponentAvailable, preloadComponent } from '@/lib/component-loader'
import { cn } from '@/lib/utils/cn'
import { ComponentPreview } from './component-preview'
import { CategoryIcon } from './category-icons'

// ─── Element Icons Map ───────────────────────────────────────────────
const ELEMENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'builtin-section': PanelTop,
  'builtin-container': Square,
  'builtin-div-block': BoxSelect,
  'builtin-flex-box': Columns3,
  'builtin-grid-layout': Grid3X3,
  'builtin-columns': LayoutDashboard,
  'builtin-link-block': ExternalLink,
  'builtin-heading': Heading1,
  'builtin-paragraph': AlignLeft,
  'builtin-text-block': Type,
  'builtin-link-element': Link2,
  'builtin-rich-text': FileText,
  'builtin-list-element': ListOrdered,
  'builtin-image': Image,
  'builtin-video': Video,
  'builtin-form-block': FormInput,
  'builtin-input-field': TextCursorInput,
  'builtin-text-area': AlignJustify,
  'builtin-select-field': ChevronDownSquareIcon,
  'builtin-button-element': MousePointerClick,
}

// ─── Element Categories (Webflow-style) ──────────────────────────────
const ELEMENT_SECTIONS = [
  {
    title: 'Layout',
    ids: [
      'builtin-section',
      'builtin-container',
      'builtin-div-block',
      'builtin-flex-box',
      'builtin-grid-layout',
      'builtin-columns',
      'builtin-link-block',
    ],
  },
  {
    title: 'Typography',
    ids: [
      'builtin-heading',
      'builtin-paragraph',
      'builtin-text-block',
      'builtin-link-element',
      'builtin-rich-text',
      'builtin-list-element',
    ],
  },
  {
    title: 'Media',
    ids: ['builtin-image', 'builtin-video'],
  },
  {
    title: 'Forms',
    ids: [
      'builtin-form-block',
      'builtin-input-field',
      'builtin-text-area',
      'builtin-select-field',
      'builtin-button-element',
    ],
  },
]

// ─── Draggable Element Tile (Webflow-style) ──────────────────────────
function ElementTile({ component }: { component: ComponentRegistryItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `registry-${component.id}`,
    data: {
      type: 'registry',
      registryId: component.id,
    },
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  const Icon = ELEMENT_ICONS[component.id] || BoxSelect

  const handleMouseEnter = useCallback(() => {
    preloadComponent(component.id)
  }, [component.id])

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg cursor-grab',
        'border border-transparent hover:border-primary/30 hover:bg-accent/50',
        'transition-all duration-150 select-none',
        isDragging && 'opacity-50 shadow-lg border-primary/50 bg-accent z-50'
      )}
      onMouseEnter={handleMouseEnter}
      {...listeners}
      {...attributes}
    >
      <div className="w-9 h-9 rounded-md bg-muted/60 flex items-center justify-center">
        <Icon className="h-[18px] w-[18px] text-foreground/70" />
      </div>
      <span className="text-[10px] font-medium text-center leading-tight text-muted-foreground">
        {component.displayName}
      </span>
    </div>
  )
}

// ─── Draggable Component Card (library components) ───────────────────
function ComponentCard({
  component,
  isPreviewVisible,
  onPreviewEnter,
  onPreviewLeave,
}: {
  component: ComponentRegistryItem
  isPreviewVisible: boolean
  onPreviewEnter: (id: string) => void
  onPreviewLeave: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `registry-${component.id}`,
    data: {
      type: 'registry',
      registryId: component.id,
    },
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  const hasImpl = isComponentAvailable(component.id)

  const handleMouseEnter = useCallback(() => {
    if (hasImpl) {
      preloadComponent(component.id)
    }
    onPreviewEnter(component.id)
  }, [component.id, hasImpl, onPreviewEnter])

  const handleMouseLeave = useCallback(() => {
    onPreviewLeave()
  }, [onPreviewLeave])

  // Extract default props from component prop definitions
  const defaultProps = useMemo(() => {
    const props: Record<string, unknown> = {}
    component.props.forEach((p) => {
      if (p.default !== undefined) {
        props[p.name] = p.default
      }
    })
    return props
  }, [component.props])

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'group relative border rounded-lg p-2.5 cursor-grab hover:border-primary/50 transition-colors bg-card',
          isDragging && 'opacity-50 z-50 shadow-lg'
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...listeners}
        {...attributes}
      >
        <div className="flex items-start gap-2.5">
          <div className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              {hasImpl ? (
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 shrink-0" />
              )}
              <span className="font-medium text-sm truncate">{component.displayName}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
              {component.description}
            </p>
            <div className="flex items-center gap-1.5">
              <Badge variant={component.source as BadgeProps['variant']} className="text-[10px] px-1.5 py-0">
                {component.source}
              </Badge>
              {component.categories[0] && (
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground capitalize">
                  <CategoryIcon category={component.categories[0]} className="h-3 w-3" />
                  {component.categories[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {isPreviewVisible && (
        <div className="border rounded-md overflow-hidden bg-background h-24 mt-1.5 mb-1">
          <ComponentPreview
            registryId={component.id}
            defaultProps={defaultProps}
          />
        </div>
      )}
    </div>
  )
}

// ─── Library Source Filters ──────────────────────────────────────────
const librarySources: ComponentSource[] = ['shadcn', 'aceternity', 'osmo', 'skiper', 'gsap']
const allCategories: ComponentCategory[] = componentRegistry.getAllCategories()
const sourceCounts = componentRegistry.getSourceCounts()

// ─── Main ComponentBrowser ──────────────────────────────────────────
export function ComponentBrowser() {
  const [activeTab, setActiveTab] = useState<'elements' | 'components'>('elements')
  const [search, setSearch] = useState('')
  const [selectedSources, setSelectedSources] = useState<ComponentSource[]>(librarySources)
  const [selectedCategories, setSelectedCategories] = useState<ComponentCategory[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const [previewId, setPreviewId] = useState<string | null>(null)

  const parentRef = useRef<HTMLDivElement>(null)
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Build element data from registry
  const builtinElements = useMemo(() => {
    return componentRegistry.filter({ sources: ['builtin'] })
  }, [])

  const builtinMap = useMemo(() => {
    const map = new Map<string, ComponentRegistryItem>()
    builtinElements.forEach((el) => map.set(el.id, el))
    return map
  }, [builtinElements])

  // Filtered library components (exclude builtin)
  const filteredComponents = useMemo(() => {
    return componentRegistry
      .filter({
        sources: selectedSources.length > 0 ? selectedSources : undefined,
        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
        query: search || undefined,
      })
      .filter((c) => c.source !== 'builtin')
  }, [search, selectedSources, selectedCategories])

  // Virtualized rendering for components tab (dynamic height for preview expansion)
  const virtualizer = useVirtualizer({
    count: filteredComponents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 82,
    measureElement: (el) => el.getBoundingClientRect().height,
    overscan: 5,
  })

  const toggleSource = (source: ComponentSource) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    )
  }

  const toggleCategory = (category: ComponentCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const toggleSectionCollapse = (title: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  const handlePreviewEnter = useCallback((id: string) => {
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current)
    previewTimerRef.current = setTimeout(() => setPreviewId(id), 400)
  }, [])

  const handlePreviewLeave = useCallback(() => {
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current)
    previewTimerRef.current = null
    setPreviewId(null)
  }, [])

  const libraryCount = componentRegistry.getAll().filter((c) => c.source !== 'builtin').length

  return (
    <div className="w-80 min-w-[320px] border-r bg-card flex flex-col h-full overflow-hidden">
      {/* ─── Tab Switcher ─── */}
      <div className="flex border-b shrink-0">
        <button
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors',
            activeTab === 'elements'
              ? 'text-primary border-b-2 border-primary bg-accent/30'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
          )}
          onClick={() => setActiveTab('elements')}
        >
          <Blocks className="h-4 w-4" />
          Elements
        </button>
        <button
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors',
            activeTab === 'components'
              ? 'text-primary border-b-2 border-primary bg-accent/30'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
          )}
          onClick={() => setActiveTab('components')}
        >
          <Puzzle className="h-4 w-4" />
          Components
        </button>
      </div>

      {/* ═══ ELEMENTS TAB (Webflow-style) ═══ */}
      {activeTab === 'elements' && (
        <div className="flex-1 overflow-auto">
          <div className="p-3 space-y-1">
            {ELEMENT_SECTIONS.map((section) => {
              const isCollapsed = collapsedSections.has(section.title)
              return (
                <div key={section.title}>
                  {/* Section Header */}
                  <button
                    className="flex items-center gap-1.5 w-full px-1 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => toggleSectionCollapse(section.title)}
                  >
                    {isCollapsed ? (
                      <ChevronRight className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                    {section.title}
                  </button>

                  {/* Element Grid */}
                  {!isCollapsed && (
                    <div className="grid grid-cols-4 gap-0.5 pb-2">
                      {section.ids.map((id) => {
                        const comp = builtinMap.get(id)
                        if (!comp) return null
                        return <ElementTile key={id} component={comp} />
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quick tip */}
          <div className="mx-3 mt-2 mb-4 p-3 rounded-lg bg-muted/40 border border-dashed">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Drag elements onto the canvas to build your page structure. Use{' '}
              <span className="font-medium text-foreground">Section</span> and{' '}
              <span className="font-medium text-foreground">Container</span> for layout,
              then add content inside.
            </p>
          </div>
        </div>
      )}

      {/* ═══ COMPONENTS TAB (library browser) ═══ */}
      {activeTab === 'components' && (
        <>
          {/* Search and Filters Header */}
          <div className="p-4 border-b space-y-3 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${libraryCount} components...`}
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
                  {(selectedCategories.length > 0 ||
                    selectedSources.length < librarySources.length) && (
                    <Badge variant="secondary" className="text-[10px] px-1 py-0">
                      {selectedCategories.length +
                        (librarySources.length - selectedSources.length)}
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
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <List className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="space-y-3">
                {/* Source filters */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Sources</p>
                  <div className="flex flex-wrap gap-1.5">
                    {librarySources.map((source) => (
                      <Badge
                        key={source}
                        variant={
                          selectedSources.includes(source) ? (source as BadgeProps['variant']) : 'outline'
                        }
                        className="cursor-pointer text-xs"
                        onClick={() => toggleSource(source)}
                      >
                        {SOURCE_LABELS[source]?.split(' ')[0] || source} (
                        {sourceCounts[source] || 0})
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
                        variant={
                          selectedCategories.includes(category) ? 'default' : 'outline'
                        }
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
          <div className="px-4 py-2 text-xs text-muted-foreground border-b shrink-0">
            {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
            {filteredComponents.length !== libraryCount && ` of ${libraryCount}`}
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
                    ref={virtualizer.measureElement}
                    data-index={virtualItem.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    className="px-4 py-1.5"
                  >
                    <ComponentCard
                      component={component}
                      isPreviewVisible={previewId === component.id}
                      onPreviewEnter={handlePreviewEnter}
                      onPreviewLeave={handlePreviewLeave}
                    />
                  </div>
                )
              })}
            </div>

            {filteredComponents.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">No components found</p>
                <p className="text-muted-foreground/60 text-xs mt-1">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
