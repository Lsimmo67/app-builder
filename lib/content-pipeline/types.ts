export interface ContentSection {
  [key: string]: string | ContentItem[] | undefined
}

export interface ContentItem {
  title?: string
  description?: string
  icon?: string
  image?: string
  [key: string]: unknown
}

export interface ContentJson {
  meta?: {
    projectName?: string
    generatedAt?: string
    source?: string
  }
  hero?: {
    headline: string
    subheadline: string
    cta_primary: string
    cta_secondary?: string
    image?: string
  }
  features?: {
    title: string
    subtitle?: string
    items: ContentItem[]
  }
  testimonials?: {
    title: string
    items: Array<{
      quote: string
      author: string
      role: string
      company?: string
      avatar?: string
    }>
  }
  pricing?: {
    title: string
    subtitle?: string
    plans: Array<{
      name: string
      price: string
      period?: string
      description: string
      features: string[]
      cta: string
      highlighted?: boolean
    }>
  }
  faq?: {
    title: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  cta?: {
    title: string
    subtitle?: string
    buttonText: string
    buttonUrl?: string
  }
  footer?: {
    companyName: string
    tagline?: string
    links?: Array<{
      label: string
      url: string
    }>
  }
  [key: string]: ContentSection | undefined
}
