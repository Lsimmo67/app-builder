import type { ComponentSource } from '@/types/component'

export interface TemplateSection {
  registryId: string
  source: ComponentSource
  props: Record<string, unknown>
  order: number
}

export interface ProjectTemplate {
  id: string
  name: string
  description: string
  category: 'saas' | 'agency' | 'b2b' | 'ecommerce' | 'portfolio'
  thumbnail: string
  sections: TemplateSection[]
  designSystemPreset?: string
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'template-startup-saas',
    name: 'Startup SaaS',
    description: 'Modern SaaS landing page with hero animation, features grid, pricing, testimonials, and FAQ.',
    category: 'saas',
    thumbnail: '/templates/saas.png',
    sections: [
      {
        registryId: 'aceternity-hero-parallax',
        source: 'aceternity',
        props: {
          headline: '{headline}',
          subheadline: '{subheadline}',
          cta_primary: '{cta_text}',
          cta_secondary: '{cta_secondary}',
        },
        order: 0,
      },
      {
        registryId: 'shadcn-logo-cloud',
        source: 'shadcn',
        props: {
          title: '{social_proof_title}',
        },
        order: 1,
      },
      {
        registryId: 'aceternity-bento-grid',
        source: 'aceternity',
        props: {
          title: '{features_title}',
          subtitle: '{features_subtitle}',
        },
        order: 2,
      },
      {
        registryId: 'shadcn-how-it-works',
        source: 'shadcn',
        props: {
          title: '{how_it_works_title}',
          steps: [],
        },
        order: 3,
      },
      {
        registryId: 'shadcn-testimonials',
        source: 'shadcn',
        props: {
          title: '{testimonials_title}',
        },
        order: 4,
      },
      {
        registryId: 'shadcn-pricing-table',
        source: 'shadcn',
        props: {
          title: '{pricing_title}',
          subtitle: '{pricing_subtitle}',
        },
        order: 5,
      },
      {
        registryId: 'shadcn-faq-accordion',
        source: 'shadcn',
        props: {
          title: '{faq_title}',
        },
        order: 6,
      },
      {
        registryId: 'gsap-scroll-cta',
        source: 'gsap',
        props: {
          title: '{cta_final_title}',
          subtitle: '{cta_final_subtitle}',
          buttonText: '{cta_final_button}',
        },
        order: 7,
      },
      {
        registryId: 'shadcn-footer',
        source: 'shadcn',
        props: {},
        order: 8,
      },
    ],
  },
  {
    id: 'template-agency-studio',
    name: 'Agency / Studio',
    description: 'Creative agency site with parallax hero, services showcase, project gallery, team, and contact.',
    category: 'agency',
    thumbnail: '/templates/agency.png',
    sections: [
      {
        registryId: 'gsap-hero-text-reveal',
        source: 'gsap',
        props: {
          headline: '{headline}',
          subheadline: '{subheadline}',
        },
        order: 0,
      },
      {
        registryId: 'aceternity-card-stack',
        source: 'aceternity',
        props: {
          title: '{services_title}',
        },
        order: 1,
      },
      {
        registryId: 'osmo-parallax-gallery',
        source: 'osmo',
        props: {
          title: '{projects_title}',
        },
        order: 2,
      },
      {
        registryId: 'gsap-scroll-timeline',
        source: 'gsap',
        props: {
          title: '{process_title}',
        },
        order: 3,
      },
      {
        registryId: 'shadcn-team-grid',
        source: 'shadcn',
        props: {
          title: '{team_title}',
        },
        order: 4,
      },
      {
        registryId: 'shadcn-testimonials',
        source: 'shadcn',
        props: {
          title: '{testimonials_title}',
        },
        order: 5,
      },
      {
        registryId: 'shadcn-contact-form',
        source: 'shadcn',
        props: {
          title: '{contact_title}',
        },
        order: 6,
      },
      {
        registryId: 'shadcn-footer',
        source: 'shadcn',
        props: {},
        order: 7,
      },
    ],
  },
  {
    id: 'template-service-b2b',
    name: 'Service Premium / B2B',
    description: 'Professional B2B service site with value proposition, results, case studies, guarantees, and booking.',
    category: 'b2b',
    thumbnail: '/templates/b2b.png',
    sections: [
      {
        registryId: 'shadcn-hero-centered',
        source: 'shadcn',
        props: {
          headline: '{headline}',
          subheadline: '{subheadline}',
          cta_primary: '{cta_text}',
        },
        order: 0,
      },
      {
        registryId: 'shadcn-problem-solution',
        source: 'shadcn',
        props: {
          problem_title: '{problem_title}',
          solution_title: '{solution_title}',
        },
        order: 1,
      },
      {
        registryId: 'gsap-counter-stats',
        source: 'gsap',
        props: {
          title: '{stats_title}',
        },
        order: 2,
      },
      {
        registryId: 'shadcn-case-studies',
        source: 'shadcn',
        props: {
          title: '{case_studies_title}',
        },
        order: 3,
      },
      {
        registryId: 'shadcn-guarantees',
        source: 'shadcn',
        props: {
          title: '{guarantees_title}',
        },
        order: 4,
      },
      {
        registryId: 'shadcn-faq-accordion',
        source: 'shadcn',
        props: {
          title: '{faq_title}',
        },
        order: 5,
      },
      {
        registryId: 'shadcn-booking-cta',
        source: 'shadcn',
        props: {
          title: '{booking_title}',
          subtitle: '{booking_subtitle}',
        },
        order: 6,
      },
      {
        registryId: 'shadcn-footer',
        source: 'shadcn',
        props: {},
        order: 7,
      },
    ],
  },
]

export function getTemplateById(id: string): ProjectTemplate | undefined {
  return PROJECT_TEMPLATES.find(t => t.id === id)
}

export function getTemplatesByCategory(category: ProjectTemplate['category']): ProjectTemplate[] {
  return PROJECT_TEMPLATES.filter(t => t.category === category)
}
