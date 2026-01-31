import { ComponentSource } from '@/types/component'

// Relume section types that can be mapped
export type RelumeSectionType =
  | 'hero'
  | 'header'
  | 'navbar'
  | 'features'
  | 'content'
  | 'stats'
  | 'testimonials'
  | 'pricing'
  | 'cta'
  | 'faq'
  | 'team'
  | 'contact'
  | 'footer'
  | 'gallery'
  | 'logos'
  | 'blog'
  | 'newsletter'

// Parsed Relume section
export interface RelumeSection {
  id: string
  type: RelumeSectionType
  variant?: string
  content: Record<string, unknown>
  order: number
}

// Relume import (JSON format)
export interface RelumeImportJson {
  name?: string
  sections: RelumeSection[]
  metadata?: {
    createdAt?: string
    exportedFrom?: string
  }
}

// Mapping from Relume to our registry
export interface ComponentMapping {
  relumeType: RelumeSectionType
  relumeVariant?: string
  registryId: string
  source: ComponentSource
  propMapping: Record<string, string> // relumeProp -> registryProp
}

// Import result
export interface ImportResult {
  success: boolean
  sections: ParsedSection[]
  errors: string[]
  warnings: string[]
}

// Parsed section ready for canvas
export interface ParsedSection {
  id: string
  relumeType: RelumeSectionType
  relumeVariant?: string
  suggestedComponent: {
    registryId: string
    source: ComponentSource
    displayName: string
  }
  alternativeComponents: Array<{
    registryId: string
    source: ComponentSource
    displayName: string
  }>
  mappedProps: Record<string, unknown>
  originalContent: Record<string, unknown>
}
