export type ComponentSource = 'shadcn' | 'aceternity' | 'osmo' | 'skiper' | 'gsap' | 'builtin'

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
  group?: 'content' | 'style' | 'behavior' | 'advanced'
  itemSchema?: ComponentProp[]
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
  acceptsChildren?: boolean
}

export interface ElementStyles {
  // Layout
  display?: 'block' | 'flex' | 'grid' | 'inline' | 'inline-block' | 'inline-flex' | 'none'
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?: string
  alignItems?: string
  alignSelf?: string
  flexGrow?: string
  flexShrink?: string
  gap?: string
  gridTemplateColumns?: string
  gridTemplateRows?: string
  // Spacing
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  // Size
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  // Position
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: string
  // Typography
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
  textAlign?: string
  textDecoration?: string
  textTransform?: string
  color?: string
  // Background
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  // Border
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderTopWidth?: string
  borderRightWidth?: string
  borderBottomWidth?: string
  borderLeftWidth?: string
  borderRadius?: string
  borderTopLeftRadius?: string
  borderTopRightRadius?: string
  borderBottomRightRadius?: string
  borderBottomLeftRadius?: string
  // Effects
  opacity?: string
  boxShadow?: string
  transform?: string
  transition?: string
  filter?: string
  backdropFilter?: string
  mixBlendMode?: string
  cursor?: string
}

export interface ResponsiveStyles {
  tablet?: Partial<ElementStyles>
  mobile?: Partial<ElementStyles>
}

export interface CMSBinding {
  fieldSlug: string
  collectionId: string
  targetType: 'prop' | 'style' | 'text' | 'src' | 'href'
  targetKey: string
}

export interface ComponentInstance {
  id: string
  pageId: string
  parentId?: string
  componentRegistryId: string
  source: ComponentSource
  order: number
  props: Record<string, unknown>
  styles?: ElementStyles
  responsiveStyles?: ResponsiveStyles
  customCode?: string
  customStyles?: string
  isLocked: boolean
  isHidden: boolean
  displayName?: string
  cmsBindings?: CMSBinding[]
  cmsCollectionId?: string
}

export const SOURCE_COLORS: Record<ComponentSource, string> = {
  shadcn: '#ffffff',
  aceternity: '#8b5cf6',
  osmo: '#f97316',
  skiper: '#06b6d4',
  gsap: '#22c55e',
  builtin: '#3b82f6',
}

export const SOURCE_LABELS: Record<ComponentSource, string> = {
  shadcn: 'ShadCN UI',
  aceternity: 'Aceternity UI',
  osmo: 'Osmo Supply',
  skiper: 'Skiper UI',
  gsap: 'GSAP Effects',
  builtin: 'Elements',
}

export interface MediaAsset {
  id: string
  projectId: string
  name: string
  fileName: string
  mimeType: string
  size: number
  dataUrl: string
  thumbnail?: string
  width?: number
  height?: number
  createdAt: Date
  tags?: string[]
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
