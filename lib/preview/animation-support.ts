/**
 * Animation support for the live preview.
 * Handles loading and initializing animation libraries in the preview iframe.
 */

export interface AnimationLibrary {
  name: string
  cdnUrl: string
  initScript?: string
}

/**
 * Animation libraries that can be injected into the preview iframe
 */
export const ANIMATION_LIBRARIES: AnimationLibrary[] = [
  {
    name: 'gsap',
    cdnUrl: 'https://cdn.jsdelivr.net/npm/gsap@3.12.0/dist/gsap.min.js',
    initScript: `
      // Auto-initialize GSAP ScrollTrigger
      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }
    `,
  },
  {
    name: 'gsap-scroll-trigger',
    cdnUrl: 'https://cdn.jsdelivr.net/npm/gsap@3.12.0/dist/ScrollTrigger.min.js',
  },
]

/**
 * Generate script tags for animation libraries
 */
export function getAnimationScriptTags(usedLibraries: string[]): string {
  const tags: string[] = []

  for (const lib of ANIMATION_LIBRARIES) {
    if (usedLibraries.includes(lib.name) || usedLibraries.includes('gsap')) {
      tags.push(`<script src="${lib.cdnUrl}"><\/script>`)
      if (lib.initScript) {
        tags.push(`<script>${lib.initScript}<\/script>`)
      }
    }
  }

  return tags.join('\n')
}

/**
 * Detect which animation libraries are used by the current components
 */
export function detectAnimationLibraries(componentSources: string[]): string[] {
  const libs = new Set<string>()

  for (const source of componentSources) {
    if (source === 'gsap') {
      libs.add('gsap')
      libs.add('gsap-scroll-trigger')
    }
    if (source === 'aceternity' || source === 'skiper') {
      libs.add('framer-motion')
    }
  }

  return Array.from(libs)
}

/**
 * Enhanced preview protocol messages for animation support
 */
export type AnimationPreviewMessage =
  | { type: 'ANIMATION_REPLAY'; payload: string } // component ID to replay animation
  | { type: 'ANIMATION_PAUSE_ALL' }
  | { type: 'ANIMATION_RESUME_ALL' }
  | { type: 'SCROLL_TO_COMPONENT'; payload: string } // component ID to scroll into view
