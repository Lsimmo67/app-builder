'use client'

import { lazy, type ComponentType } from 'react'

type LazyComponent = React.LazyExoticComponent<ComponentType<Record<string, unknown>>>

// Dynamic import map: registry ID -> lazy-loaded component
const COMPONENT_MAP: Record<string, () => Promise<{ default: ComponentType<Record<string, unknown>> }>> = {
  // === Osmo sections (37) ===
  'osmo-hero-centered': () => import('@/components/registry/osmo/hero-centered'),
  'osmo-hero-split': () => import('@/components/registry/osmo/hero-split'),
  'osmo-hero-video': () => import('@/components/registry/osmo/hero-video'),
  'osmo-hero-minimal': () => import('@/components/registry/osmo/hero-minimal'),
  'osmo-hero-gradient': () => import('@/components/registry/osmo/hero-gradient'),
  'osmo-hero-image': () => import('@/components/registry/osmo/hero-image'),
  'osmo-features-grid': () => import('@/components/registry/osmo/features-grid'),
  'osmo-features-alternating': () => import('@/components/registry/osmo/features-alternating'),
  'osmo-features-icons': () => import('@/components/registry/osmo/features-icons'),
  'osmo-features-bento': () => import('@/components/registry/osmo/features-bento'),
  'osmo-features-numbered': () => import('@/components/registry/osmo/features-numbered'),
  'osmo-testimonials': () => import('@/components/registry/osmo/testimonials-cards'),
  'osmo-testimonials-quote': () => import('@/components/registry/osmo/testimonials-quote'),
  'osmo-testimonials-carousel': () => import('@/components/registry/osmo/testimonials-carousel'),
  'osmo-pricing': () => import('@/components/registry/osmo/pricing-cards'),
  'osmo-pricing-comparison': () => import('@/components/registry/osmo/pricing-comparison'),
  'osmo-pricing-simple': () => import('@/components/registry/osmo/pricing-simple'),
  'osmo-cta-centered': () => import('@/components/registry/osmo/cta-centered'),
  'osmo-cta-split': () => import('@/components/registry/osmo/cta-split'),
  'osmo-cta-banner': () => import('@/components/registry/osmo/cta-banner'),
  'osmo-cta-newsletter': () => import('@/components/registry/osmo/cta-newsletter'),
  'osmo-faq': () => import('@/components/registry/osmo/faq-accordion'),
  'osmo-footer': () => import('@/components/registry/osmo/footer-columns'),
  'osmo-footer-simple': () => import('@/components/registry/osmo/footer-simple'),
  'osmo-navbar': () => import('@/components/registry/osmo/navbar-simple'),
  'osmo-stats': () => import('@/components/registry/osmo/stats-section'),
  'osmo-logo-cloud': () => import('@/components/registry/osmo/logo-cloud'),
  'osmo-newsletter': () => import('@/components/registry/osmo/newsletter-section'),
  'osmo-team': () => import('@/components/registry/osmo/team-section'),
  'osmo-contact': () => import('@/components/registry/osmo/contact-section'),
  'osmo-blog-cards': () => import('@/components/registry/osmo/blog-cards'),
  'osmo-divider': () => import('@/components/registry/osmo/divider-section'),
  'osmo-hero-app-download': () => import('@/components/registry/osmo/hero-app-download'),
  'osmo-comparison-table': () => import('@/components/registry/osmo/comparison-table'),
  'osmo-integrations-grid': () => import('@/components/registry/osmo/integrations-grid'),
  'osmo-timeline': () => import('@/components/registry/osmo/timeline-section'),
  'osmo-metrics': () => import('@/components/registry/osmo/metrics-section'),
  'osmo-testimonials-line-reveal': () => import('@/components/registry/osmo/testimonials-line-reveal'),

  // === Aceternity effects (30) ===
  'aceternity-hero-parallax': () => import('@/components/registry/aceternity/hero-parallax'),
  'aceternity-spotlight': () => import('@/components/registry/aceternity/hero-spotlight'),
  'aceternity-lamp': () => import('@/components/registry/aceternity/hero-lamp'),
  'aceternity-hero-meteors': () => import('@/components/registry/aceternity/hero-meteors'),
  'aceternity-bento-grid': () => import('@/components/registry/aceternity/bento-grid'),
  'aceternity-infinite-cards': () => import('@/components/registry/aceternity/infinite-cards'),
  'aceternity-text-generate': () => import('@/components/registry/aceternity/text-generate'),
  'aceternity-typewriter': () => import('@/components/registry/aceternity/typewriter-effect'),
  'aceternity-wavy-bg': () => import('@/components/registry/aceternity/wavy-background'),
  'aceternity-floating-navbar': () => import('@/components/registry/aceternity/floating-navbar'),
  'aceternity-tracing-beam': () => import('@/components/registry/aceternity/tracing-beam'),
  'aceternity-sparkles': () => import('@/components/registry/aceternity/sparkles-section'),
  'aceternity-3d-card': () => import('@/components/registry/aceternity/three-d-card'),
  'aceternity-flip-words': () => import('@/components/registry/aceternity/flip-words'),
  'aceternity-glare-card': () => import('@/components/registry/aceternity/glare-card'),
  'aceternity-hero-highlight': () => import('@/components/registry/aceternity/hero-highlight'),
  'aceternity-moving-border': () => import('@/components/registry/aceternity/moving-border'),
  'aceternity-background-beams': () => import('@/components/registry/aceternity/background-beams'),
  'aceternity-grid-bg': () => import('@/components/registry/aceternity/grid-background'),
  'aceternity-dot-bg': () => import('@/components/registry/aceternity/dot-background'),
  'aceternity-animated-modal': () => import('@/components/registry/aceternity/animated-modal'),
  'aceternity-animated-tooltip': () => import('@/components/registry/aceternity/animated-tooltip'),
  'aceternity-aurora-bg': () => import('@/components/registry/aceternity/aurora-bg'),
  'aceternity-card-hover': () => import('@/components/registry/aceternity/card-hover-effect'),
  'aceternity-focus-cards': () => import('@/components/registry/aceternity/focus-cards'),
  'aceternity-gradient-bg': () => import('@/components/registry/aceternity/gradient-bg-animated'),
  'aceternity-link-preview': () => import('@/components/registry/aceternity/link-preview'),
  'aceternity-meteors-bg': () => import('@/components/registry/aceternity/meteors-bg'),
  'aceternity-shooting-stars': () => import('@/components/registry/aceternity/shooting-stars'),
  'aceternity-text-reveal': () => import('@/components/registry/aceternity/text-reveal-card'),
  'aceternity-scrollbar-animation': () => import('@/components/registry/aceternity/scrollbar-animation'),

  // === Skiper effects (30) ===
  'skiper-glass-card': () => import('@/components/registry/skiper/glass-card'),
  'skiper-gradient-button': () => import('@/components/registry/skiper/gradient-button'),
  'skiper-glow-card': () => import('@/components/registry/skiper/glow-card'),
  'skiper-animated-border': () => import('@/components/registry/skiper/animated-border'),
  'skiper-hero-gradient': () => import('@/components/registry/skiper/hero-gradient'),
  'skiper-floating-card': () => import('@/components/registry/skiper/floating-card'),
  'skiper-text-gradient': () => import('@/components/registry/skiper/text-gradient'),
  'skiper-shimmer-button': () => import('@/components/registry/skiper/shimmer-button'),
  'skiper-noise-card': () => import('@/components/registry/skiper/noise-card'),
  'skiper-aurora-hero': () => import('@/components/registry/skiper/aurora-hero'),
  'skiper-morphing-card': () => import('@/components/registry/skiper/morphing-card'),
  'skiper-spotlight-card': () => import('@/components/registry/skiper/spotlight-card'),
  'skiper-tilt-card': () => import('@/components/registry/skiper/tilt-card'),
  'skiper-magnetic-button': () => import('@/components/registry/skiper/magnetic-button'),
  'skiper-neon-text': () => import('@/components/registry/skiper/neon-text'),
  'skiper-retro-grid': () => import('@/components/registry/skiper/retro-grid'),
  'skiper-hero-particles': () => import('@/components/registry/skiper/hero-particles'),
  'skiper-animated-gradient-bg': () => import('@/components/registry/skiper/animated-gradient-bg'),
  'skiper-animated-tabs': () => import('@/components/registry/skiper/animated-tabs'),
  'skiper-cta-glow': () => import('@/components/registry/skiper/cta-glow'),
  'skiper-feature-card-animated': () => import('@/components/registry/skiper/feature-card-animated'),
  'skiper-feature-grid-glow': () => import('@/components/registry/skiper/feature-grid-glow'),
  'skiper-gradient-divider': () => import('@/components/registry/skiper/gradient-divider'),
  'skiper-hero-dark': () => import('@/components/registry/skiper/hero-dark'),
  'skiper-hero-split-animated': () => import('@/components/registry/skiper/hero-split-animated'),
  'skiper-logo-marquee': () => import('@/components/registry/skiper/logo-marquee'),
  'skiper-pricing-card': () => import('@/components/registry/skiper/pricing-card'),
  'skiper-progress-bar': () => import('@/components/registry/skiper/progress-bar'),
  'skiper-stats-counter': () => import('@/components/registry/skiper/stats-counter'),
  'skiper-testimonial-card': () => import('@/components/registry/skiper/testimonial-card'),
  'skiper-scrollbar-animation': () => import('@/components/registry/skiper/scrollbar-animation'),

  // === GSAP animations (20) ===
  'gsap-scroll-reveal': () => import('@/components/registry/gsap/scroll-reveal'),
  'gsap-text-split': () => import('@/components/registry/gsap/text-split'),
  'gsap-parallax-section': () => import('@/components/registry/gsap/parallax-section'),
  'gsap-counter-section': () => import('@/components/registry/gsap/counter-section'),
  'gsap-stagger-cards': () => import('@/components/registry/gsap/stagger-cards'),
  'gsap-pin-section': () => import('@/components/registry/gsap/pin-section'),
  'gsap-horizontal-scroll': () => import('@/components/registry/gsap/horizontal-scroll'),
  'gsap-fade-in': () => import('@/components/registry/gsap/fade-in'),
  'gsap-scale-in': () => import('@/components/registry/gsap/scale-in'),
  'gsap-slide-in': () => import('@/components/registry/gsap/slide-in'),
  'gsap-marquee': () => import('@/components/registry/gsap/marquee'),
  'gsap-magnetic': () => import('@/components/registry/gsap/magnetic-element'),
  'gsap-bounce-in': () => import('@/components/registry/gsap/bounce-in'),
  'gsap-flip-card': () => import('@/components/registry/gsap/flip-card'),
  'gsap-morphing-shapes': () => import('@/components/registry/gsap/morphing-shapes'),
  'gsap-reveal-text': () => import('@/components/registry/gsap/reveal-text'),
  'gsap-progress-scroll': () => import('@/components/registry/gsap/progress-scroll'),
  'gsap-rotating-text': () => import('@/components/registry/gsap/rotating-text'),
  'gsap-typewriter': () => import('@/components/registry/gsap/typewriter-gsap'),
  'gsap-wave-text': () => import('@/components/registry/gsap/wave-text'),
  'gsap-inertia-grid': () => import('@/components/registry/gsap/inertia-grid'),

  // === Shadcn wrappers (10) ===
  'shadcn-button': () => import('@/components/registry/shadcn/button-section'),
  'shadcn-card': () => import('@/components/registry/shadcn/card-section'),
  'shadcn-accordion': () => import('@/components/registry/shadcn/accordion-section'),
  'shadcn-tabs': () => import('@/components/registry/shadcn/tabs-section'),
  'shadcn-badge': () => import('@/components/registry/shadcn/badge-showcase'),
  'shadcn-dialog': () => import('@/components/registry/shadcn/dialog-section'),
  'shadcn-form': () => import('@/components/registry/shadcn/form-section'),
  'shadcn-separator': () => import('@/components/registry/shadcn/separator-section'),
  'shadcn-switch': () => import('@/components/registry/shadcn/switch-settings'),
  'shadcn-tooltip': () => import('@/components/registry/shadcn/tooltip-demo'),
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
