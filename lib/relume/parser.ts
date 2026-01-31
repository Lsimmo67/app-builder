import { nanoid } from 'nanoid'
import {
  RelumeSection,
  RelumeImportJson,
  RelumeSectionType,
  ImportResult,
  ParsedSection,
} from './types'
import { parseSection } from './mapper'

/**
 * Detect input format (JSON or text)
 */
export function detectFormat(input: string): 'json' | 'text' | 'unknown' {
  const trimmed = input.trim()

  // Try JSON first
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      JSON.parse(trimmed)
      return 'json'
    } catch {
      // Not valid JSON
    }
  }

  // Check for text format markers
  if (trimmed.includes('[') && trimmed.includes(']')) {
    // Could be text format like [Hero - Centered]
    if (/\[\s*\w+\s*(-\s*\w+)?\s*\]/.test(trimmed)) {
      return 'text'
    }
  }

  return 'unknown'
}

/**
 * Parse JSON format from Relume
 */
export function parseJsonFormat(input: string): ImportResult {
  const errors: string[] = []
  const warnings: string[] = []
  const sections: ParsedSection[] = []

  try {
    const data = JSON.parse(input) as RelumeImportJson | RelumeSection[]

    // Handle array format (just sections)
    const sectionsList = Array.isArray(data) ? data : data.sections

    if (!Array.isArray(sectionsList)) {
      return {
        success: false,
        sections: [],
        errors: ['Invalid format: expected sections array'],
        warnings: [],
      }
    }

    for (let i = 0; i < sectionsList.length; i++) {
      const section = sectionsList[i]

      if (!section.type) {
        warnings.push(`Section ${i + 1}: Missing type, skipping`)
        continue
      }

      const normalizedType = normalizeType(section.type)
      if (!normalizedType) {
        warnings.push(`Section ${i + 1}: Unknown type "${section.type}", using generic`)
      }

      const parsed = parseSection(
        normalizedType || 'content',
        section.variant,
        section.content || {},
        section.order ?? i
      )

      sections.push(parsed)
    }

    return {
      success: true,
      sections,
      errors,
      warnings,
    }
  } catch (e) {
    return {
      success: false,
      sections: [],
      errors: [`JSON parse error: ${(e as Error).message}`],
      warnings: [],
    }
  }
}

/**
 * Parse text format from Relume
 * Format: [Section Type - Variant]
 * Property: Value
 * Property: Value
 */
export function parseTextFormat(input: string): ImportResult {
  const errors: string[] = []
  const warnings: string[] = []
  const sections: ParsedSection[] = []

  const lines = input.split('\n')
  let currentSection: {
    type: string
    variant?: string
    content: Record<string, unknown>
  } | null = null
  let order = 0

  // Regex to match section headers like [Hero - Centered] or [Hero]
  const sectionHeaderRegex = /^\s*\[\s*([^\]\-]+)(?:\s*-\s*([^\]]+))?\s*\]\s*$/

  // Regex to match property lines like "Headline: Welcome to our site"
  const propertyRegex = /^\s*([^:]+):\s*(.*)$/

  for (const line of lines) {
    const trimmedLine = line.trim()

    // Skip empty lines
    if (!trimmedLine) continue

    // Check for section header
    const headerMatch = trimmedLine.match(sectionHeaderRegex)
    if (headerMatch) {
      // Save previous section if exists
      if (currentSection) {
        const normalizedType = normalizeType(currentSection.type)
        if (normalizedType) {
          const parsed = parseSection(
            normalizedType,
            currentSection.variant,
            currentSection.content,
            order++
          )
          sections.push(parsed)
        } else {
          warnings.push(`Unknown section type: ${currentSection.type}`)
        }
      }

      // Start new section
      currentSection = {
        type: headerMatch[1].trim(),
        variant: headerMatch[2]?.trim(),
        content: {},
      }
      continue
    }

    // Check for property line
    const propertyMatch = trimmedLine.match(propertyRegex)
    if (propertyMatch && currentSection) {
      const key = normalizePropertyKey(propertyMatch[1].trim())
      let value: string | boolean | number | Record<string, unknown> | unknown[] = propertyMatch[2].trim()

      // Try to parse value as JSON for arrays/objects
      const strValue = value as string
      if (strValue.startsWith('[') || strValue.startsWith('{')) {
        try {
          value = JSON.parse(strValue)
        } catch {
          // Keep as string
        }
      }

      // Handle boolean values
      if (value === 'true') value = true
      if (value === 'false') value = false

      // Handle numeric values
      if (typeof value === 'string' && /^\d+(\.\d+)?$/.test(value)) {
        value = parseFloat(value)
      }

      currentSection.content[key] = value
    }
  }

  // Don't forget the last section
  if (currentSection) {
    const normalizedType = normalizeType(currentSection.type)
    if (normalizedType) {
      const parsed = parseSection(
        normalizedType,
        currentSection.variant,
        currentSection.content,
        order
      )
      sections.push(parsed)
    } else {
      warnings.push(`Unknown section type: ${currentSection.type}`)
    }
  }

  return {
    success: sections.length > 0,
    sections,
    errors,
    warnings,
  }
}

/**
 * Main parse function - auto-detects format
 */
export function parseRelumeInput(input: string): ImportResult {
  if (!input || !input.trim()) {
    return {
      success: false,
      sections: [],
      errors: ['Input is empty'],
      warnings: [],
    }
  }

  const format = detectFormat(input)

  switch (format) {
    case 'json':
      return parseJsonFormat(input)
    case 'text':
      return parseTextFormat(input)
    default:
      return {
        success: false,
        sections: [],
        errors: ['Unable to detect input format. Please use JSON or text format.'],
        warnings: [],
      }
  }
}

/**
 * Normalize section type to our RelumeSectionType enum
 */
function normalizeType(type: string): RelumeSectionType | null {
  const normalized = type.toLowerCase().trim()

  const typeMap: Record<string, RelumeSectionType> = {
    hero: 'hero',
    'hero section': 'hero',
    header: 'header',
    navbar: 'navbar',
    'navigation bar': 'navbar',
    nav: 'navbar',
    features: 'features',
    feature: 'features',
    'features section': 'features',
    content: 'content',
    'content section': 'content',
    stats: 'stats',
    statistics: 'stats',
    testimonials: 'testimonials',
    testimonial: 'testimonials',
    reviews: 'testimonials',
    pricing: 'pricing',
    'pricing section': 'pricing',
    cta: 'cta',
    'call to action': 'cta',
    faq: 'faq',
    faqs: 'faq',
    team: 'team',
    'team section': 'team',
    contact: 'contact',
    'contact section': 'contact',
    footer: 'footer',
    gallery: 'gallery',
    logos: 'logos',
    'logo cloud': 'logos',
    blog: 'blog',
    'blog section': 'blog',
    newsletter: 'newsletter',
  }

  return typeMap[normalized] || null
}

/**
 * Normalize property key to camelCase
 */
function normalizePropertyKey(key: string): string {
  // Convert to camelCase
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase())
}

/**
 * Generate sample Relume text format
 */
export function generateSampleTextFormat(): string {
  return `[Hero - Centered]
Headline: Build Faster with Our Platform
Subheadline: The all-in-one solution for modern web development
Primary Button: Get Started Free
Secondary Button: Learn More

[Features - 3 Column Grid]
Headline: Why Choose Us
Subheadline: Everything you need to succeed
Features: ["Speed", "Security", "Scalability"]

[Testimonials]
Headline: What Our Customers Say
Testimonials: [{"name": "John Doe", "role": "CEO", "quote": "Amazing product!"}]

[Pricing]
Headline: Simple, Transparent Pricing
Subheadline: No hidden fees
Plans: [{"name": "Starter", "price": "$9"}, {"name": "Pro", "price": "$29"}]

[CTA]
Headline: Ready to Get Started?
Subheadline: Join thousands of satisfied customers
Primary Button: Start Free Trial

[Footer]
Copyright: © 2024 Your Company. All rights reserved.`
}

/**
 * Generate sample Relume JSON format
 */
export function generateSampleJsonFormat(): string {
  return JSON.stringify(
    {
      name: 'Landing Page',
      sections: [
        {
          type: 'hero',
          variant: 'centered',
          content: {
            headline: 'Build Faster with Our Platform',
            subheadline: 'The all-in-one solution for modern web development',
            primaryButton: 'Get Started Free',
            secondaryButton: 'Learn More',
          },
          order: 0,
        },
        {
          type: 'features',
          content: {
            headline: 'Why Choose Us',
            subheadline: 'Everything you need to succeed',
            features: ['Speed', 'Security', 'Scalability'],
          },
          order: 1,
        },
        {
          type: 'cta',
          content: {
            headline: 'Ready to Get Started?',
            subheadline: 'Join thousands of satisfied customers',
            primaryButton: 'Start Free Trial',
          },
          order: 2,
        },
        {
          type: 'footer',
          content: {
            copyright: '© 2024 Your Company. All rights reserved.',
          },
          order: 3,
        },
      ],
    },
    null,
    2
  )
}
