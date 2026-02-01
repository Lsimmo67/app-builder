export type CMSFieldType =
  | 'text'
  | 'richtext'
  | 'number'
  | 'boolean'
  | 'date'
  | 'image'
  | 'file'
  | 'color'
  | 'url'
  | 'email'
  | 'option'
  | 'reference'
  | 'multi-reference'

export interface CMSField {
  id: string
  name: string
  slug: string
  type: CMSFieldType
  required: boolean
  helpText?: string
  defaultValue?: unknown
  validation?: {
    min?: number
    max?: number
    pattern?: string
    options?: string[]
  }
  referenceCollectionId?: string
}

export interface CMSCollection {
  id: string
  projectId: string
  name: string
  slug: string
  fields: CMSField[]
  createdAt: Date
  updatedAt: Date
}

export interface CMSItem {
  id: string
  collectionId: string
  data: Record<string, unknown>
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

export interface CMSExport {
  collections: CMSCollection[]
  items: CMSItem[]
  exportedAt: string
}
