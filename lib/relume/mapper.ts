import { ComponentSource } from '@/types/component'
import { componentRegistry } from '@/lib/components-registry'
import { RelumeSectionType, ComponentMapping, ParsedSection } from './types'
import { nanoid } from 'nanoid'

/**
 * Mapping configuration from Relume types to our registry components
 */
export const RELUME_MAPPINGS: ComponentMapping[] = [
  // Hero sections
  {
    relumeType: 'hero',
    registryId: 'osmo-hero-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      description: 'description',
      primaryButton: 'ctaText',
      secondaryButton: 'secondaryCtaText',
      image: 'backgroundImage',
    },
  },
  {
    relumeType: 'hero',
    relumeVariant: 'parallax',
    registryId: 'aceternity-hero-parallax',
    source: 'aceternity',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      images: 'products',
    },
  },
  {
    relumeType: 'hero',
    relumeVariant: 'centered',
    registryId: 'osmo-hero-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      cta: 'ctaText',
    },
  },

  // Features sections
  {
    relumeType: 'features',
    registryId: 'osmo-features-grid',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      features: 'features',
    },
  },
  {
    relumeType: 'features',
    relumeVariant: 'bento',
    registryId: 'aceternity-bento-grid',
    source: 'aceternity',
    propMapping: {
      headline: 'title',
      items: 'items',
    },
  },
  {
    relumeType: 'features',
    relumeVariant: 'cards',
    registryId: 'aceternity-3d-card',
    source: 'aceternity',
    propMapping: {
      title: 'title',
      description: 'description',
      image: 'image',
    },
  },

  // Testimonials
  {
    relumeType: 'testimonials',
    registryId: 'osmo-testimonials',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      testimonials: 'testimonials',
    },
  },
  {
    relumeType: 'testimonials',
    relumeVariant: 'marquee',
    registryId: 'aceternity-infinite-cards',
    source: 'aceternity',
    propMapping: {
      items: 'items',
      direction: 'direction',
      speed: 'speed',
    },
  },

  // Pricing
  {
    relumeType: 'pricing',
    registryId: 'osmo-pricing-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      plans: 'plans',
    },
  },

  // CTA sections
  {
    relumeType: 'cta',
    registryId: 'osmo-cta-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      primaryButton: 'ctaText',
      secondaryButton: 'secondaryCtaText',
    },
  },

  // FAQ
  {
    relumeType: 'faq',
    registryId: 'osmo-faq-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      items: 'items',
    },
  },

  // Footer
  {
    relumeType: 'footer',
    registryId: 'osmo-footer',
    source: 'osmo',
    propMapping: {
      logo: 'logo',
      links: 'links',
      copyright: 'copyright',
      social: 'socialLinks',
    },
  },

  // Header/Navbar
  {
    relumeType: 'header',
    registryId: 'shadcn-navigation-menu',
    source: 'shadcn',
    propMapping: {
      logo: 'logo',
      links: 'items',
      cta: 'ctaText',
    },
  },
  {
    relumeType: 'navbar',
    registryId: 'shadcn-navigation-menu',
    source: 'shadcn',
    propMapping: {
      logo: 'logo',
      links: 'items',
      cta: 'ctaText',
    },
  },

  // Content sections
  {
    relumeType: 'content',
    registryId: 'osmo-content-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      body: 'content',
      image: 'image',
    },
  },

  // Stats
  {
    relumeType: 'stats',
    registryId: 'osmo-stats-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      stats: 'stats',
    },
  },

  // Team
  {
    relumeType: 'team',
    registryId: 'osmo-team-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      members: 'members',
    },
  },

  // Contact
  {
    relumeType: 'contact',
    registryId: 'osmo-contact-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      email: 'email',
      phone: 'phone',
      address: 'address',
    },
  },

  // Logos
  {
    relumeType: 'logos',
    registryId: 'osmo-logos-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      logos: 'logos',
    },
  },

  // Gallery
  {
    relumeType: 'gallery',
    registryId: 'aceternity-parallax-scroll',
    source: 'aceternity',
    propMapping: {
      images: 'images',
    },
  },

  // Newsletter
  {
    relumeType: 'newsletter',
    registryId: 'osmo-newsletter-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      subheadline: 'subtitle',
      placeholder: 'inputPlaceholder',
      buttonText: 'buttonText',
    },
  },

  // Blog
  {
    relumeType: 'blog',
    registryId: 'osmo-blog-section',
    source: 'osmo',
    propMapping: {
      headline: 'title',
      posts: 'posts',
    },
  },
]

/**
 * Find the best matching component for a Relume section
 */
export function findBestMatch(
  type: RelumeSectionType,
  variant?: string
): ComponentMapping | null {
  // First, try to find an exact match with variant
  if (variant) {
    const exactMatch = RELUME_MAPPINGS.find(
      (m) => m.relumeType === type && m.relumeVariant === variant
    )
    if (exactMatch) return exactMatch
  }

  // Then, find a match without variant (default)
  const defaultMatch = RELUME_MAPPINGS.find(
    (m) => m.relumeType === type && !m.relumeVariant
  )
  if (defaultMatch) return defaultMatch

  // Finally, find any match for this type
  return RELUME_MAPPINGS.find((m) => m.relumeType === type) || null
}

/**
 * Find alternative components for a Relume section
 */
export function findAlternatives(
  type: RelumeSectionType,
  excludeRegistryId?: string
): ComponentMapping[] {
  return RELUME_MAPPINGS.filter(
    (m) => m.relumeType === type && m.registryId !== excludeRegistryId
  )
}

/**
 * Map Relume content to component props
 */
export function mapProps(
  content: Record<string, unknown>,
  mapping: ComponentMapping
): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [relumeKey, registryKey] of Object.entries(mapping.propMapping)) {
    if (content[relumeKey] !== undefined) {
      result[registryKey] = content[relumeKey]
    }
  }

  // Also include any props that weren't mapped but might be useful
  for (const [key, value] of Object.entries(content)) {
    if (!mapping.propMapping[key] && !result[key]) {
      // Check if the key exists in registry component props
      const registryItem = componentRegistry.getById(mapping.registryId)
      if (registryItem?.props.some((p) => p.name === key)) {
        result[key] = value
      }
    }
  }

  return result
}

/**
 * Parse a section and return parsed result
 */
export function parseSection(
  type: RelumeSectionType,
  variant: string | undefined,
  content: Record<string, unknown>,
  order: number
): ParsedSection {
  const bestMatch = findBestMatch(type, variant)
  const alternatives = findAlternatives(type, bestMatch?.registryId)

  if (!bestMatch) {
    // Fallback to a generic component
    return {
      id: nanoid(),
      relumeType: type,
      relumeVariant: variant,
      suggestedComponent: {
        registryId: 'osmo-content-section',
        source: 'osmo',
        displayName: 'Content Section',
      },
      alternativeComponents: [],
      mappedProps: content,
      originalContent: content,
    }
  }

  const registryItem = componentRegistry.getById(bestMatch.registryId)
  const mappedProps = mapProps(content, bestMatch)

  return {
    id: nanoid(),
    relumeType: type,
    relumeVariant: variant,
    suggestedComponent: {
      registryId: bestMatch.registryId,
      source: bestMatch.source,
      displayName: registryItem?.displayName || bestMatch.registryId,
    },
    alternativeComponents: alternatives.map((alt) => {
      const altRegistry = componentRegistry.getById(alt.registryId)
      return {
        registryId: alt.registryId,
        source: alt.source,
        displayName: altRegistry?.displayName || alt.registryId,
      }
    }),
    mappedProps,
    originalContent: content,
  }
}

/**
 * Get all available mappings for display
 */
export function getAllMappings(): Map<RelumeSectionType, ComponentMapping[]> {
  const result = new Map<RelumeSectionType, ComponentMapping[]>()

  for (const mapping of RELUME_MAPPINGS) {
    if (!result.has(mapping.relumeType)) {
      result.set(mapping.relumeType, [])
    }
    result.get(mapping.relumeType)!.push(mapping)
  }

  return result
}
