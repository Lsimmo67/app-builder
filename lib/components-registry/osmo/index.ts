import type { ComponentRegistryItem } from '../types'

export const osmoComponents: ComponentRegistryItem[] = [
  {
    id: 'osmo-hero-centered',
    name: 'HeroCentered',
    displayName: 'Hero Centered',
    source: 'osmo',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'centered', 'headline'],
    description: 'A centered hero section with headline, subheadline, and CTA buttons',
    previewImage: '/components/osmo/hero-centered.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'primaryCTA', type: 'string', required: false, description: 'Primary button text' },
      { name: 'secondaryCTA', type: 'string', required: false, description: 'Secondary button text' },
    ],
    dependencies: [],
    code: `<section className="py-24 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
      Your Headline Here
    </h1>
    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
      Your subheadline that explains your value proposition
    </p>
    <div className="flex gap-4 justify-center">
      <Button size="lg">Get Started</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-features-grid', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-hero-split',
    name: 'HeroSplit',
    displayName: 'Hero Split',
    source: 'osmo',
    categories: ['hero', 'section'],
    tags: ['hero', 'split', 'image', 'two-column'],
    description: 'A split hero section with content on one side and image on the other',
    previewImage: '/components/osmo/hero-split.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'description', type: 'string', required: true, description: 'Description text' },
      { name: 'image', type: 'image', required: true, description: 'Hero image' },
      { name: 'imagePosition', type: 'select', required: false, default: 'right', options: ['left', 'right'] },
    ],
    dependencies: [],
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    <div>
      <h1 className="text-5xl font-bold tracking-tight mb-6">
        Your Headline Here
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Detailed description of your product or service
      </p>
      <Button size="lg">Get Started</Button>
    </div>
    <div className="relative aspect-video">
      <img src="/hero-image.jpg" alt="Hero" className="rounded-lg object-cover" />
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-features-grid', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-features-grid',
    name: 'FeaturesGrid',
    displayName: 'Features Grid',
    source: 'osmo',
    categories: ['feature', 'section', 'grid'],
    tags: ['features', 'grid', 'icons', 'benefits'],
    description: 'A grid of feature cards with icons and descriptions',
    previewImage: '/components/osmo/features-grid.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Section subheadline' },
      { name: 'features', type: 'array', required: true, description: 'Array of feature items' },
      { name: 'columns', type: 'select', required: false, default: '3', options: ['2', '3', '4'] },
    ],
    dependencies: ['lucide-react'],
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">Features</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Everything you need to build amazing products
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div key={feature.title} className="text-center">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered', 'shadcn-card'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-features-alternating',
    name: 'FeaturesAlternating',
    displayName: 'Features Alternating',
    source: 'osmo',
    categories: ['feature', 'section'],
    tags: ['features', 'alternating', 'zigzag', 'showcase'],
    description: 'Alternating feature sections with image and text',
    previewImage: '/components/osmo/features-alternating.png',
    props: [
      { name: 'features', type: 'array', required: true, description: 'Array of feature items with title, description, and image' },
    ],
    dependencies: [],
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto space-y-24">
    {features.map((feature, index) => (
      <div key={feature.title} className={\`grid lg:grid-cols-2 gap-12 items-center \${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}\`}>
        <div>
          <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
        <div className="aspect-video bg-muted rounded-lg" />
      </div>
    ))}
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-testimonials',
    name: 'TestimonialsSection',
    displayName: 'Testimonials Section',
    source: 'osmo',
    categories: ['testimonial', 'section'],
    tags: ['testimonials', 'reviews', 'social-proof', 'quotes'],
    description: 'A testimonials section with customer quotes',
    previewImage: '/components/osmo/testimonials.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'testimonials', type: 'array', required: true, description: 'Array of testimonial items' },
    ],
    dependencies: [],
    code: `<section className="py-24 px-6 bg-muted/30">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">What our customers say</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.name}>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={testimonial.avatar} />
                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['shadcn-avatar', 'shadcn-card'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-pricing',
    name: 'PricingSection',
    displayName: 'Pricing Section',
    source: 'osmo',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'plans', 'tiers', 'subscription'],
    description: 'A pricing section with multiple plan tiers',
    previewImage: '/components/osmo/pricing.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'plans', type: 'array', required: true, description: 'Array of pricing plans' },
    ],
    dependencies: [],
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">Pricing</h2>
      <p className="text-muted-foreground">Choose the plan that works for you</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <Card key={plan.name} className={plan.featured ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg text-muted-foreground">/mo</span></p>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.featured ? 'default' : 'outline'}>
              Get Started
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['shadcn-card', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-cta-centered',
    name: 'CTACentered',
    displayName: 'CTA Centered',
    source: 'osmo',
    categories: ['cta', 'section'],
    tags: ['cta', 'call-to-action', 'conversion'],
    description: 'A centered call-to-action section',
    previewImage: '/components/osmo/cta-centered.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'CTA headline' },
      { name: 'description', type: 'string', required: false, description: 'CTA description' },
      { name: 'buttonText', type: 'string', required: true, description: 'Button text' },
    ],
    dependencies: [],
    code: `<section className="py-24 px-6 bg-primary text-primary-foreground">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
    <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
      Join thousands of users who are already building amazing things
    </p>
    <Button size="lg" variant="secondary">Start Free Trial</Button>
  </div>
</section>`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-faq',
    name: 'FAQSection',
    displayName: 'FAQ Section',
    source: 'osmo',
    categories: ['faq', 'section'],
    tags: ['faq', 'questions', 'accordion', 'help'],
    description: 'A frequently asked questions section with accordion',
    previewImage: '/components/osmo/faq.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'faqs', type: 'array', required: true, description: 'Array of FAQ items' },
    ],
    dependencies: ['@radix-ui/react-accordion'],
    code: `<section className="py-24 px-6">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={\`item-\${index}\`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</section>`,
    suggestedWith: ['shadcn-accordion'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-footer',
    name: 'FooterSection',
    displayName: 'Footer',
    source: 'osmo',
    categories: ['footer', 'section'],
    tags: ['footer', 'links', 'navigation', 'bottom'],
    description: 'A comprehensive footer with links and newsletter signup',
    previewImage: '/components/osmo/footer.png',
    props: [
      { name: 'logo', type: 'string', required: true, description: 'Logo text or component' },
      { name: 'links', type: 'array', required: true, description: 'Array of link groups' },
      { name: 'showNewsletter', type: 'boolean', required: false, default: true },
    ],
    dependencies: [],
    code: `<footer className="py-16 px-6 border-t">
  <div className="max-w-7xl mx-auto">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-bold text-lg mb-4">Company</h3>
        <p className="text-sm text-muted-foreground">Building the future of web development.</p>
      </div>
      {linkGroups.map((group) => (
        <div key={group.title}>
          <h4 className="font-semibold mb-4">{group.title}</h4>
          <ul className="space-y-2">
            {group.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-12 pt-8 border-t flex justify-between items-center">
      <p className="text-sm text-muted-foreground">© 2024 Company. All rights reserved.</p>
    </div>
  </div>
</footer>`,
    suggestedWith: [],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-navbar',
    name: 'NavbarSection',
    displayName: 'Navbar',
    source: 'osmo',
    categories: ['header', 'navigation'],
    tags: ['navbar', 'header', 'menu', 'navigation'],
    description: 'A responsive navigation bar with mobile menu',
    previewImage: '/components/osmo/navbar.png',
    props: [
      { name: 'logo', type: 'string', required: true, description: 'Logo text or component' },
      { name: 'links', type: 'array', required: true, description: 'Array of navigation links' },
      { name: 'ctaText', type: 'string', required: false, description: 'CTA button text' },
    ],
    dependencies: [],
    code: `<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="/" className="font-bold text-xl">Logo</a>
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link) => (
        <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
          {link.label}
        </a>
      ))}
    </nav>
    <Button>Get Started</Button>
  </div>
</header>`,
    suggestedWith: ['osmo-hero-centered', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
]
