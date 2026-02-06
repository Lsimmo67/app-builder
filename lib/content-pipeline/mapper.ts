import type { ContentJson } from './types'
import type { ComponentInstance } from '@/types'

/**
 * Maps content.json data to component instance props.
 * Takes existing components and fills in their props from the content.
 */
export function mapContentToComponents(
  content: ContentJson,
  components: ComponentInstance[]
): ComponentInstance[] {
  return components.map(comp => {
    const updatedProps = { ...comp.props }

    // Match content sections to components by checking registry ID patterns
    const id = comp.componentRegistryId.toLowerCase()

    if (id.includes('hero') && content.hero) {
      Object.assign(updatedProps, {
        headline: content.hero.headline,
        subheadline: content.hero.subheadline,
        cta_primary: content.hero.cta_primary,
        cta_secondary: content.hero.cta_secondary,
        title: content.hero.headline,
        subtitle: content.hero.subheadline,
        buttonText: content.hero.cta_primary,
      })
    }

    if (id.includes('feature') && content.features) {
      Object.assign(updatedProps, {
        title: content.features.title,
        subtitle: content.features.subtitle,
        items: content.features.items,
      })
    }

    if (id.includes('testimonial') && content.testimonials) {
      Object.assign(updatedProps, {
        title: content.testimonials.title,
        testimonials: content.testimonials.items,
        items: content.testimonials.items,
      })
    }

    if (id.includes('pricing') && content.pricing) {
      Object.assign(updatedProps, {
        title: content.pricing.title,
        subtitle: content.pricing.subtitle,
        plans: content.pricing.plans,
        items: content.pricing.plans,
      })
    }

    if (id.includes('faq') && content.faq) {
      Object.assign(updatedProps, {
        title: content.faq.title,
        items: content.faq.items,
        questions: content.faq.items,
      })
    }

    if ((id.includes('cta') || id.includes('call-to-action')) && content.cta) {
      Object.assign(updatedProps, {
        title: content.cta.title,
        subtitle: content.cta.subtitle,
        buttonText: content.cta.buttonText,
      })
    }

    if (id.includes('footer') && content.footer) {
      Object.assign(updatedProps, {
        companyName: content.footer.companyName,
        tagline: content.footer.tagline,
        links: content.footer.links,
      })
    }

    // Replace placeholder patterns like {headline}
    for (const [key, value] of Object.entries(updatedProps)) {
      if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        const placeholder = value.slice(1, -1)
        const resolved = findContentValue(content, placeholder)
        if (resolved !== undefined) {
          updatedProps[key] = resolved
        }
      }
    }

    return { ...comp, props: updatedProps }
  })
}

function findContentValue(content: ContentJson, key: string): unknown {
  // Search through all content sections for the key
  for (const section of Object.values(content)) {
    if (section && typeof section === 'object' && key in section) {
      return (section as Record<string, unknown>)[key]
    }
  }
  return undefined
}

export function parseContentJson(jsonString: string): { data: ContentJson | null; errors: string[] } {
  try {
    const data = JSON.parse(jsonString)
    const errors: string[] = []

    if (typeof data !== 'object' || data === null) {
      return { data: null, errors: ['Content must be a JSON object'] }
    }

    return { data: data as ContentJson, errors }
  } catch (e) {
    return {
      data: null,
      errors: [`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`],
    }
  }
}

/**
 * Generate a content.json prompt template for Claude
 */
export function generateContentPrompt(templateName: string): string {
  return `You are a CRO copywriter. Generate website content in JSON format for a "${templateName}" website.

The client brief is: [PASTE CLIENT BRIEF HERE]

Output a JSON object with this exact structure:

{
  "hero": {
    "headline": "Main headline (max 8 words)",
    "subheadline": "Supporting text (1-2 sentences)",
    "cta_primary": "Primary button text",
    "cta_secondary": "Secondary button text"
  },
  "features": {
    "title": "Section title",
    "subtitle": "Section subtitle",
    "items": [
      { "title": "Feature 1", "description": "Description", "icon": "icon-name" },
      { "title": "Feature 2", "description": "Description", "icon": "icon-name" },
      { "title": "Feature 3", "description": "Description", "icon": "icon-name" }
    ]
  },
  "testimonials": {
    "title": "What our clients say",
    "items": [
      { "quote": "Testimonial text", "author": "Name", "role": "Title", "company": "Company" }
    ]
  },
  "pricing": {
    "title": "Simple pricing",
    "subtitle": "Choose your plan",
    "plans": [
      { "name": "Starter", "price": "$29", "period": "/month", "description": "For small teams", "features": ["Feature 1", "Feature 2"], "cta": "Get started" },
      { "name": "Pro", "price": "$79", "period": "/month", "description": "For growing businesses", "features": ["Everything in Starter", "Feature 3"], "cta": "Get started", "highlighted": true }
    ]
  },
  "faq": {
    "title": "Frequently asked questions",
    "items": [
      { "question": "Question 1?", "answer": "Answer 1" }
    ]
  },
  "cta": {
    "title": "Ready to get started?",
    "subtitle": "Join thousands of happy customers",
    "buttonText": "Start free trial"
  }
}

Rules:
- Write in the client's language
- Use benefit-driven headlines
- Keep CTA text action-oriented (3 words max)
- Write testimonials that feel authentic
- Price plans should follow good/better/best pattern
`
}
