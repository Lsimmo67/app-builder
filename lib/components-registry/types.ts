import type { ComponentSource, ComponentCategory } from '@/types/component'

export interface ComponentProp {
  name: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'image' | 'richtext' | 'children' | 'array' | 'object'
  default?: unknown
  required: boolean
  options?: string[]
  description?: string
}

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
  code: string
  suggestedWith: string[]
  docsUrl?: string
  version: string
}

export type { ComponentSource, ComponentCategory }
