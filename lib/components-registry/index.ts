import type { ComponentRegistryItem, ComponentSource, ComponentCategory } from './types'
import { shadcnComponents } from './shadcn'
import { aceternityComponents } from './aceternity'
import { osmoComponents } from './osmo'
import { skiperComponents } from './skiper'
import { gsapEffects } from './gsap'

// Re-export types
export type { ComponentRegistryItem, ComponentSource, ComponentCategory }

// All components combined
const allComponents: ComponentRegistryItem[] = [
  ...shadcnComponents,
  ...aceternityComponents,
  ...osmoComponents,
  ...skiperComponents,
  ...gsapEffects,
]

// Component Registry Class
class ComponentRegistry {
  private components: Map<string, ComponentRegistryItem> = new Map()

  constructor() {
    this.registerAll()
  }

  private registerAll() {
    allComponents.forEach((comp) => {
      this.components.set(comp.id, comp)
    })
  }

  getAll(): ComponentRegistryItem[] {
    return Array.from(this.components.values())
  }

  getById(id: string): ComponentRegistryItem | undefined {
    return this.components.get(id)
  }

  getBySource(source: ComponentSource): ComponentRegistryItem[] {
    return this.getAll().filter((c) => c.source === source)
  }

  getByCategory(category: ComponentCategory): ComponentRegistryItem[] {
    return this.getAll().filter((c) => c.categories.includes(category))
  }

  search(query: string): ComponentRegistryItem[] {
    const q = query.toLowerCase()
    return this.getAll().filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.displayName.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  filter(options: {
    sources?: ComponentSource[]
    categories?: ComponentCategory[]
    tags?: string[]
    query?: string
  }): ComponentRegistryItem[] {
    let results = this.getAll()

    if (options.sources?.length) {
      results = results.filter((c) => options.sources!.includes(c.source))
    }

    if (options.categories?.length) {
      results = results.filter((c) =>
        c.categories.some((cat) => options.categories!.includes(cat))
      )
    }

    if (options.tags?.length) {
      results = results.filter((c) =>
        c.tags.some((t) => options.tags!.includes(t))
      )
    }

    if (options.query) {
      const q = options.query.toLowerCase()
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.displayName.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return results
  }

  getSuggestions(componentId: string): ComponentRegistryItem[] {
    const component = this.getById(componentId)
    if (!component) return []

    return component.suggestedWith
      .map((id) => this.getById(id))
      .filter(Boolean) as ComponentRegistryItem[]
  }

  getDependencies(componentIds: string[]): string[] {
    const deps = new Set<string>()

    componentIds.forEach((id) => {
      const comp = this.getById(id)
      comp?.dependencies.forEach((d) => deps.add(d))
    })

    return Array.from(deps)
  }

  getSourceCounts(): Record<ComponentSource, number> {
    const counts: Record<ComponentSource, number> = {
      shadcn: 0,
      aceternity: 0,
      osmo: 0,
      skiper: 0,
      gsap: 0,
    }

    this.getAll().forEach((c) => {
      counts[c.source]++
    })

    return counts
  }

  getCategoryCounts(): Record<string, number> {
    const counts: Record<string, number> = {}

    this.getAll().forEach((c) => {
      c.categories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1
      })
    })

    return counts
  }

  getAllCategories(): ComponentCategory[] {
    const categories = new Set<ComponentCategory>()
    this.getAll().forEach((c) => {
      c.categories.forEach((cat) => categories.add(cat))
    })
    return Array.from(categories)
  }

  getAllTags(): string[] {
    const tags = new Set<string>()
    this.getAll().forEach((c) => {
      c.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }
}

// Export singleton instance
export const componentRegistry = new ComponentRegistry()

// Export individual registries for direct access if needed
export {
  shadcnComponents,
  aceternityComponents,
  osmoComponents,
  skiperComponents,
  gsapEffects,
}
