export type ComponentSource = 'shadcn' | 'aceternity' | 'osmo' | 'skiper' | 'gsap'

export type ComponentCategory =
  | 'hero'
  | 'cta'
  | 'feature'
  | 'testimonial'
  | 'pricing'
  | 'faq'
  | 'footer'
  | 'header'
  | 'navigation'
  | 'card'
  | 'form'
  | 'layout'
  | 'grid'
  | 'animation'
  | 'effect'
  | 'text'
  | 'media'
  | 'button'
  | 'input'
  | 'modal'
  | 'section'
  | 'background'
  | 'overlay'
  | 'other'

export interface ComponentProp {
  name: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'image' | 'richtext' | 'children' | 'array' | 'object'
  default?: unknown
  required: boolean
  options?: string[]
  description?: string
}

export interface DependencyEntry {
  package: string
  version: string
}

export type ComponentLevel = 'section' | 'primitive' | 'effect' | 'layout'

export interface ComponentRegistryItem {
  id: string
  name: string
  displayName: string
  source: ComponentSource
  categories: ComponentCategory[]
  tags: string[]
  description: string
  previewImage: string
  previewDark?: string
  props: ComponentProp[]
  dependencies: string[]
  dependencyManifest?: DependencyEntry[]
  modulePath?: string
  level?: ComponentLevel
  code: string
  suggestedWith: string[]
  docsUrl?: string
  version: string
}

export interface ComponentInstance {
  id: string
  pageId: string
  parentId?: string
  componentRegistryId: string
  source: ComponentSource
  order: number
  props: Record<string, unknown>
  customCode?: string
  customStyles?: string
  isLocked: boolean
  isHidden: boolean
}

export const SOURCE_COLORS: Record<ComponentSource, string> = {
  shadcn: '#ffffff',
  aceternity: '#8b5cf6',
  osmo: '#f97316',
  skiper: '#06b6d4',
  gsap: '#22c55e',
}

export const SOURCE_LABELS: Record<ComponentSource, string> = {
  shadcn: 'ShadCN UI',
  aceternity: 'Aceternity UI',
  osmo: 'Osmo Supply',
  skiper: 'Skiper UI',
  gsap: 'GSAP Effects',
}

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  hero: 'Hero Sections',
  cta: 'Call to Action',
  feature: 'Features',
  testimonial: 'Testimonials',
  pricing: 'Pricing',
  faq: 'FAQ',
  footer: 'Footers',
  header: 'Headers',
  navigation: 'Navigation',
  card: 'Cards',
  form: 'Forms',
  layout: 'Layout',
  grid: 'Grids',
  animation: 'Animations',
  effect: 'Effects',
  text: 'Typography',
  media: 'Media',
  button: 'Buttons',
  input: 'Inputs',
  modal: 'Modals',
  section: 'Sections',
  background: 'Backgrounds',
  overlay: 'Overlays',
  other: 'Other',
}
