'use client'

import { lazy, type ComponentType } from 'react'

type LazyComponent = React.LazyExoticComponent<ComponentType<Record<string, unknown>>>

// Dynamic import map: registry ID -> lazy-loaded component
const COMPONENT_MAP: Record<string, () => Promise<{ default: ComponentType<Record<string, unknown>> }>> = {
  // === Builtin elements (20) ===
  'builtin-section': () => import('@/components/registry/builtin/section'),
  'builtin-container': () => import('@/components/registry/builtin/container'),
  'builtin-div-block': () => import('@/components/registry/builtin/div-block'),
  'builtin-flex-box': () => import('@/components/registry/builtin/flex-box'),
  'builtin-grid-layout': () => import('@/components/registry/builtin/grid-layout'),
  'builtin-columns': () => import('@/components/registry/builtin/columns'),
  'builtin-heading': () => import('@/components/registry/builtin/heading'),
  'builtin-paragraph': () => import('@/components/registry/builtin/paragraph'),
  'builtin-text-block': () => import('@/components/registry/builtin/text-block'),
  'builtin-link-element': () => import('@/components/registry/builtin/link-element'),
  'builtin-rich-text': () => import('@/components/registry/builtin/rich-text'),
  'builtin-list-element': () => import('@/components/registry/builtin/list-element'),
  'builtin-image': () => import('@/components/registry/builtin/image-element'),
  'builtin-video': () => import('@/components/registry/builtin/video-element'),
  'builtin-form-block': () => import('@/components/registry/builtin/form-block'),
  'builtin-input-field': () => import('@/components/registry/builtin/input-field'),
  'builtin-text-area': () => import('@/components/registry/builtin/text-area-field'),
  'builtin-select-field': () => import('@/components/registry/builtin/select-field'),
  'builtin-button-element': () => import('@/components/registry/builtin/button-element'),
  'builtin-link-block': () => import('@/components/registry/builtin/link-block'),

  // === Shadcn UI wrappers ===
  'shadcn-button': () => import('@/components/registry/shadcn/button'),
  'shadcn-input': () => import('@/components/registry/shadcn/input'),
  'shadcn-alert': () => import('@/components/registry/shadcn/alert'),
  'shadcn-card': () => import('@/components/registry/shadcn/card'),
  'shadcn-tabs': () => import('@/components/registry/shadcn/tabs'),

  // === Aceternity UI ===
  // Components will be added here as they are implemented

  // === Skiper UI ===
  // Components will be added here as they are implemented

  // === GSAP ===
  // Components will be added here as they are implemented

  // === Osmo Supply ===
  // Components will be added here as they are implemented

  // === Custom imported components ===
  'custom-html-block': () => import('@/components/registry/custom/html-block'),
}

// Cache of loaded lazy components
const componentCache = new Map<string, LazyComponent>()

/**
 * Get a lazy-loaded React component by registry ID
 */
export function getComponent(registryId: string): LazyComponent | null {
  if (componentCache.has(registryId)) {
    return componentCache.get(registryId)!
  }

  const importFn = COMPONENT_MAP[registryId]
  if (!importFn) return null

  const LazyComp = lazy(importFn)
  componentCache.set(registryId, LazyComp)
  return LazyComp
}

/**
 * Check if a component implementation exists
 */
export function isComponentAvailable(registryId: string): boolean {
  return registryId in COMPONENT_MAP
}

/**
 * Preload a component (useful for hover preload in the browser)
 */
export async function preloadComponent(registryId: string): Promise<void> {
  const importFn = COMPONENT_MAP[registryId]
  if (importFn) {
    await importFn()
  }
}

/**
 * Get all available component IDs
 */
export function getAvailableComponentIds(): string[] {
  return Object.keys(COMPONENT_MAP)
}
