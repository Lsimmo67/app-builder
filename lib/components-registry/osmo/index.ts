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
    dependencyManifest: [],
    modulePath: 'osmo-hero-centered',
    level: 'section',
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
    dependencyManifest: [],
    modulePath: 'osmo-hero-split',
    level: 'section',
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
    id: 'osmo-hero-minimal',
    name: 'HeroMinimal',
    displayName: 'Hero Minimal',
    source: 'osmo',
    categories: ['hero', 'section'],
    tags: ['hero', 'minimal', 'clean', 'simple'],
    description: 'A minimal hero section with clean typography and subtle styling',
    previewImage: '/components/osmo/hero-minimal.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-hero-minimal',
    level: 'section',
    code: `<section className="py-32 px-6">
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
      Simple and Clean
    </h1>
    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
      A minimal approach that lets your content speak for itself
    </p>
  </div>
</section>`,
    suggestedWith: ['osmo-features-grid', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-hero-video',
    name: 'HeroVideo',
    displayName: 'Hero Video',
    source: 'osmo',
    categories: ['hero', 'section', 'media'],
    tags: ['hero', 'video', 'background', 'fullscreen'],
    description: 'A hero section with background video and overlay content',
    previewImage: '/components/osmo/hero-video.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'videoSrc', type: 'string', required: true, description: 'Video source URL' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-hero-video',
    level: 'section',
    code: `<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 text-center text-white px-6">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
      Your Headline Here
    </h1>
    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
      Compelling subheadline with video background
    </p>
    <Button size="lg" variant="secondary">Get Started</Button>
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
    dependencyManifest: [
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'osmo-features-grid',
    level: 'section',
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
    dependencyManifest: [],
    modulePath: 'osmo-features-alternating',
    level: 'section',
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
    id: 'osmo-features-icons',
    name: 'FeaturesIcons',
    displayName: 'Features with Icons',
    source: 'osmo',
    categories: ['feature', 'section'],
    tags: ['features', 'icons', 'cards', 'benefits'],
    description: 'A features section with prominent icon cards and descriptions',
    previewImage: '/components/osmo/features-icons.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'features', type: 'array', required: true, description: 'Array of feature items with icon, title, and description' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['lucide-react'],
    dependencyManifest: [
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'osmo-features-icons',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">Why Choose Us</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature) => (
        <div key={feature.title} className="p-6 rounded-xl border bg-card">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <feature.icon className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered', 'osmo-hero-centered'],
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
    dependencyManifest: [],
    modulePath: 'osmo-testimonials',
    level: 'section',
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
    id: 'osmo-testimonials-cards',
    name: 'TestimonialsCards',
    displayName: 'Testimonials Cards',
    source: 'osmo',
    categories: ['testimonial', 'section'],
    tags: ['testimonials', 'cards', 'reviews', 'social-proof'],
    description: 'Testimonials displayed as individual styled cards with ratings',
    previewImage: '/components/osmo/testimonials-cards.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'testimonials', type: 'array', required: true, description: 'Array of testimonial items with name, quote, avatar, and rating' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['lucide-react'],
    dependencyManifest: [
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'osmo-testimonials-cards',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">Testimonials</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <div key={t.name} className="p-6 rounded-2xl border bg-card">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-muted-foreground mb-4">"{t.quote}"</p>
          <div className="flex items-center gap-3">
            <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered', 'shadcn-avatar'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-testimonials-quote',
    name: 'TestimonialsQuote',
    displayName: 'Testimonial Quote',
    source: 'osmo',
    categories: ['testimonial', 'section'],
    tags: ['testimonial', 'quote', 'featured', 'blockquote'],
    description: 'A featured testimonial with large quote and author details',
    previewImage: '/components/osmo/testimonials-quote.png',
    props: [
      { name: 'quote', type: 'string', required: true, description: 'Testimonial quote text' },
      { name: 'author', type: 'string', required: true, description: 'Author name' },
      { name: 'title', type: 'string', required: false, description: 'Author title or company' },
      { name: 'avatar', type: 'image', required: false, description: 'Author avatar image' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-testimonials-quote',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
      "This product completely transformed our workflow. We saw a 10x improvement in productivity."
    </blockquote>
    <div className="flex items-center justify-center gap-4">
      <img src="/avatar.jpg" alt="Author" className="w-12 h-12 rounded-full" />
      <div className="text-left">
        <p className="font-semibold">Jane Smith</p>
        <p className="text-sm text-muted-foreground">CEO at Company</p>
      </div>
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered'],
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
    dependencyManifest: [],
    modulePath: 'osmo-pricing',
    level: 'section',
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
    id: 'osmo-pricing-cards',
    name: 'PricingCards',
    displayName: 'Pricing Cards',
    source: 'osmo',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'cards', 'plans', 'subscription'],
    description: 'Pricing plans displayed as individual feature-rich cards',
    previewImage: '/components/osmo/pricing-cards.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'plans', type: 'array', required: true, description: 'Array of pricing plans with name, price, features, and highlighted flag' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['lucide-react'],
    dependencyManifest: [
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'osmo-pricing-cards',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">Pricing Plans</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div key={plan.name} className={\`p-8 rounded-2xl border \${plan.highlighted ? 'border-primary bg-primary/5 scale-105' : 'bg-card'}\`}>
          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
          <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-base text-muted-foreground font-normal">/mo</span></p>
          <ul className="space-y-3 mb-8">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> {f}
              </li>
            ))}
          </ul>
          <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>Get Started</Button>
        </div>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-pricing-comparison',
    name: 'PricingComparison',
    displayName: 'Pricing Comparison',
    source: 'osmo',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'comparison', 'table', 'features'],
    description: 'A pricing comparison table showing feature availability across plans',
    previewImage: '/components/osmo/pricing-comparison.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'plans', type: 'array', required: true, description: 'Array of plan names' },
      { name: 'features', type: 'array', required: true, description: 'Array of features with availability per plan' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['lucide-react'],
    dependencyManifest: [
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'osmo-pricing-comparison',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">Compare Plans</h2>
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="text-left py-4 pr-4">Feature</th>
          <th className="py-4 px-4 text-center">Starter</th>
          <th className="py-4 px-4 text-center">Pro</th>
          <th className="py-4 px-4 text-center">Enterprise</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="py-4 pr-4">Feature name</td>
          <td className="py-4 px-4 text-center"><Check className="h-4 w-4 mx-auto text-primary" /></td>
          <td className="py-4 px-4 text-center"><Check className="h-4 w-4 mx-auto text-primary" /></td>
          <td className="py-4 px-4 text-center"><Check className="h-4 w-4 mx-auto text-primary" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>`,
    suggestedWith: ['osmo-pricing-cards', 'osmo-cta-centered'],
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
    dependencyManifest: [],
    modulePath: 'osmo-cta-centered',
    level: 'section',
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
    id: 'osmo-cta-split',
    name: 'CTASplit',
    displayName: 'CTA Split',
    source: 'osmo',
    categories: ['cta', 'section'],
    tags: ['cta', 'call-to-action', 'split', 'two-column'],
    description: 'A split call-to-action section with content and image or form side by side',
    previewImage: '/components/osmo/cta-split.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'CTA headline' },
      { name: 'description', type: 'string', required: false, description: 'CTA description' },
      { name: 'buttonText', type: 'string', required: true, description: 'Button text' },
      { name: 'image', type: 'image', required: false, description: 'CTA image' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-cta-split',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
      <p className="text-muted-foreground mb-8">
        Take the next step and see what we can do for you.
      </p>
      <Button size="lg">Start Free Trial</Button>
    </div>
    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
      <img src="/cta-image.jpg" alt="CTA" className="object-cover w-full h-full" />
    </div>
  </div>
</section>`,
    suggestedWith: ['shadcn-button', 'osmo-features-grid'],
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
    dependencyManifest: [
      { package: '@radix-ui/react-accordion', version: '^1.2.0' },
    ],
    modulePath: 'osmo-faq',
    level: 'section',
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
    dependencyManifest: [],
    modulePath: 'osmo-footer',
    level: 'section',
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
      <p className="text-sm text-muted-foreground">&copy; 2024 Company. All rights reserved.</p>
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
    dependencyManifest: [],
    modulePath: 'osmo-navbar',
    level: 'layout',
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
  {
    id: 'osmo-stats',
    name: 'StatsSection',
    displayName: 'Stats Section',
    source: 'osmo',
    categories: ['section'],
    tags: ['stats', 'numbers', 'metrics', 'counters'],
    description: 'A statistics section displaying key metrics and numbers',
    previewImage: '/components/osmo/stats.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'stats', type: 'array', required: true, description: 'Array of stat items with value and label' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-stats',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="grid md:grid-cols-4 gap-8 text-center">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-4xl font-bold mb-2">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-hero-centered', 'osmo-features-grid'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-logo-cloud',
    name: 'LogoCloud',
    displayName: 'Logo Cloud',
    source: 'osmo',
    categories: ['media', 'section'],
    tags: ['logos', 'brands', 'partners', 'trust'],
    description: 'A logo cloud section showcasing partner or client brand logos',
    previewImage: '/components/osmo/logo-cloud.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'logos', type: 'array', required: true, description: 'Array of logo items with src and alt' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-logo-cloud',
    level: 'section',
    code: `<section className="py-16 px-6">
  <div className="max-w-7xl mx-auto">
    <p className="text-center text-sm text-muted-foreground mb-8">Trusted by leading companies</p>
    <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
      {logos.map((logo) => (
        <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-8" />
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-hero-centered', 'osmo-testimonials'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-newsletter',
    name: 'NewsletterSection',
    displayName: 'Newsletter Section',
    source: 'osmo',
    categories: ['form', 'section'],
    tags: ['newsletter', 'email', 'subscribe', 'signup'],
    description: 'A newsletter signup section with email input and subscribe button',
    previewImage: '/components/osmo/newsletter.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Section headline' },
      { name: 'description', type: 'string', required: false, description: 'Section description' },
      { name: 'buttonText', type: 'string', required: false, description: 'Subscribe button text' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-newsletter',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
    <p className="text-muted-foreground mb-8">Subscribe to our newsletter for the latest updates.</p>
    <div className="flex gap-2 max-w-md mx-auto">
      <input type="email" placeholder="Enter your email" className="flex-1 rounded-md border px-4 py-2" />
      <Button>Subscribe</Button>
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-footer', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-team',
    name: 'TeamSection',
    displayName: 'Team Section',
    source: 'osmo',
    categories: ['section'],
    tags: ['team', 'people', 'members', 'about'],
    description: 'A team section displaying team member cards with photos and roles',
    previewImage: '/components/osmo/team.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'members', type: 'array', required: true, description: 'Array of team members with name, role, and avatar' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-team',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">Our Team</h2>
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
      {members.map((member) => (
        <div key={member.name} className="text-center">
          <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
          <h3 className="font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-hero-centered', 'osmo-testimonials'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-contact',
    name: 'ContactSection',
    displayName: 'Contact Section',
    source: 'osmo',
    categories: ['form', 'section'],
    tags: ['contact', 'form', 'email', 'support'],
    description: 'A contact section with a form for user inquiries',
    previewImage: '/components/osmo/contact.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Section headline' },
      { name: 'description', type: 'string', required: false, description: 'Section description' },
      { name: 'buttonText', type: 'string', required: false, description: 'Submit button text' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-contact',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-4">Get in Touch</h2>
    <p className="text-muted-foreground text-center mb-8">We would love to hear from you.</p>
    <form className="space-y-4">
      <input type="text" placeholder="Name" className="w-full rounded-md border px-4 py-2" />
      <input type="email" placeholder="Email" className="w-full rounded-md border px-4 py-2" />
      <textarea placeholder="Message" rows={4} className="w-full rounded-md border px-4 py-2" />
      <Button className="w-full">Send Message</Button>
    </form>
  </div>
</section>`,
    suggestedWith: ['osmo-footer', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-blog-cards',
    name: 'BlogCards',
    displayName: 'Blog Cards',
    source: 'osmo',
    categories: ['card', 'section'],
    tags: ['blog', 'posts', 'articles', 'cards'],
    description: 'A blog section displaying article cards with images and excerpts',
    previewImage: '/components/osmo/blog-cards.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'posts', type: 'array', required: true, description: 'Array of blog post items with title, excerpt, image, and date' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-blog-cards',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">Latest Articles</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.title} className="rounded-lg border overflow-hidden bg-card">
          <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
          <div className="p-6">
            <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-newsletter', 'osmo-cta-centered'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-footer-simple',
    name: 'FooterSimple',
    displayName: 'Footer Simple',
    source: 'osmo',
    categories: ['footer', 'section'],
    tags: ['footer', 'simple', 'minimal', 'bottom'],
    description: 'A simple footer with basic links and copyright',
    previewImage: '/components/osmo/footer-simple.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Company name or tagline' },
      { name: 'links', type: 'array', required: false, description: 'Array of footer links' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-footer-simple',
    level: 'section',
    code: `<footer className="py-8 px-6 border-t">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="text-sm text-muted-foreground">&copy; 2024 Company. All rights reserved.</p>
    <nav className="flex gap-6">
      {links.map((link) => (
        <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
          {link.label}
        </a>
      ))}
    </nav>
  </div>
</footer>`,
    suggestedWith: ['osmo-navbar'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-hero-gradient',
    name: 'HeroGradient',
    displayName: 'Hero with Gradient',
    source: 'osmo',
    categories: ['hero', 'section'],
    tags: ['hero', 'gradient', 'colorful', 'landing'],
    description: 'A hero section with a vibrant gradient background',
    previewImage: '/components/osmo/hero-gradient.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'primaryCTA', type: 'string', required: false, description: 'Primary button text' },
      { name: 'secondaryCTA', type: 'string', required: false, description: 'Secondary button text' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-hero-gradient',
    level: 'section',
    code: `<section className="relative py-32 px-6 bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/20 overflow-hidden">
  <div className="max-w-4xl mx-auto text-center relative z-10">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
      Your Headline Here
    </h1>
    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
      A compelling subheadline with gradient styling
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
    id: 'osmo-hero-image',
    name: 'HeroImage',
    displayName: 'Hero with Image',
    source: 'osmo',
    categories: ['hero', 'section'],
    tags: ['hero', 'image', 'background', 'landing'],
    description: 'A hero section with a prominent background image',
    previewImage: '/components/osmo/hero-image.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'image', type: 'image', required: true, description: 'Background image' },
      { name: 'primaryCTA', type: 'string', required: false, description: 'Primary button text' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-hero-image',
    level: 'section',
    code: `<section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
  <img src="/hero-bg.jpg" alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative z-10 text-center text-white px-6">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
      Your Headline Here
    </h1>
    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
      A compelling subheadline over a beautiful image
    </p>
    <Button size="lg" variant="secondary">Get Started</Button>
  </div>
</section>`,
    suggestedWith: ['osmo-features-grid', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-features-bento',
    name: 'FeaturesBento',
    displayName: 'Features Bento Grid',
    source: 'osmo',
    categories: ['feature', 'section'],
    tags: ['features', 'bento', 'grid', 'cards'],
    description: 'A bento grid layout for showcasing features with varying card sizes',
    previewImage: '/components/osmo/features-bento.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'features', type: 'array', required: true, description: 'Array of feature items with title, description, and span' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-features-bento',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">Features</h2>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 p-8 rounded-2xl border bg-card">
        <h3 className="font-semibold text-lg mb-2">Primary Feature</h3>
        <p className="text-sm text-muted-foreground">Description of the primary feature</p>
      </div>
      <div className="p-8 rounded-2xl border bg-card">
        <h3 className="font-semibold text-lg mb-2">Feature Two</h3>
        <p className="text-sm text-muted-foreground">Description of feature two</p>
      </div>
      <div className="p-8 rounded-2xl border bg-card">
        <h3 className="font-semibold text-lg mb-2">Feature Three</h3>
        <p className="text-sm text-muted-foreground">Description of feature three</p>
      </div>
      <div className="md:col-span-2 p-8 rounded-2xl border bg-card">
        <h3 className="font-semibold text-lg mb-2">Feature Four</h3>
        <p className="text-sm text-muted-foreground">Description of feature four</p>
      </div>
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered', 'osmo-hero-centered'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-features-numbered',
    name: 'FeaturesNumbered',
    displayName: 'Features Numbered',
    source: 'osmo',
    categories: ['feature', 'section'],
    tags: ['features', 'numbered', 'steps', 'process'],
    description: 'A features section with numbered steps showing a process or workflow',
    previewImage: '/components/osmo/features-numbered.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'features', type: 'array', required: true, description: 'Array of feature items displayed with step numbers' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-features-numbered',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
    <div className="space-y-12">
      {features.map((feature, index) => (
        <div key={feature.title} className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered', 'osmo-hero-centered'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-pricing-simple',
    name: 'PricingSimple',
    displayName: 'Simple Pricing',
    source: 'osmo',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'simple', 'plans', 'minimal'],
    description: 'A simple and clean pricing section with minimal styling',
    previewImage: '/components/osmo/pricing-simple.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'plans', type: 'array', required: true, description: 'Array of pricing plans with name, price, and features' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-pricing-simple',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
    <p className="text-muted-foreground mb-16">No hidden fees. Cancel anytime.</p>
    <div className="grid md:grid-cols-2 gap-8">
      {plans.map((plan) => (
        <div key={plan.name} className="p-8 rounded-2xl border bg-card text-left">
          <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
          <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-base text-muted-foreground font-normal">/mo</span></p>
          <ul className="space-y-2 mb-8">
            {plan.features.map((f) => (
              <li key={f} className="text-sm text-muted-foreground">{f}</li>
            ))}
          </ul>
          <Button className="w-full" variant="outline">Get Started</Button>
        </div>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-cta-banner',
    name: 'CTABanner',
    displayName: 'CTA Banner',
    source: 'osmo',
    categories: ['cta', 'section'],
    tags: ['cta', 'banner', 'call-to-action', 'inline'],
    description: 'A banner-style call-to-action section with a prominent background',
    previewImage: '/components/osmo/cta-banner.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Banner headline' },
      { name: 'buttonText', type: 'string', required: true, description: 'Button text' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-cta-banner',
    level: 'section',
    code: `<section className="py-16 px-6 bg-primary text-primary-foreground">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
    <div>
      <h2 className="text-2xl font-bold">Ready to get started?</h2>
      <p className="text-primary-foreground/80">Join thousands of happy customers today.</p>
    </div>
    <Button size="lg" variant="secondary">Start Free Trial</Button>
  </div>
</section>`,
    suggestedWith: ['shadcn-button', 'osmo-features-grid'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-cta-newsletter',
    name: 'CTANewsletter',
    displayName: 'CTA Newsletter',
    source: 'osmo',
    categories: ['cta', 'section'],
    tags: ['cta', 'newsletter', 'email', 'subscribe'],
    description: 'A call-to-action section focused on newsletter subscription',
    previewImage: '/components/osmo/cta-newsletter.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'CTA headline' },
      { name: 'description', type: 'string', required: false, description: 'CTA description' },
      { name: 'buttonText', type: 'string', required: false, description: 'Subscribe button text' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-cta-newsletter',
    level: 'section',
    code: `<section className="py-24 px-6 bg-muted/30">
  <div className="max-w-2xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
    <p className="text-muted-foreground mb-8">Get the latest news and updates delivered to your inbox.</p>
    <div className="flex gap-2 max-w-md mx-auto">
      <input type="email" placeholder="Enter your email" className="flex-1 rounded-md border px-4 py-2" />
      <Button>Subscribe</Button>
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-footer', 'shadcn-button'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-divider',
    name: 'DividerSection',
    displayName: 'Section Divider',
    source: 'osmo',
    categories: ['layout', 'section'],
    tags: ['divider', 'separator', 'spacing', 'layout'],
    description: 'A visual divider section to separate content areas',
    previewImage: '/components/osmo/divider-section.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Optional divider label text' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-divider',
    level: 'layout',
    code: `<section className="py-8 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="border-t border-border" />
  </div>
</section>`,
    suggestedWith: [],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
  {
    id: 'osmo-testimonials-carousel',
    name: 'TestimonialsCarousel',
    displayName: 'Testimonials Carousel',
    source: 'osmo',
    categories: ['testimonial', 'section'],
    tags: ['testimonials', 'carousel', 'slider', 'reviews'],
    description: 'A testimonials section with carousel/slider navigation',
    previewImage: '/components/osmo/testimonials-carousel.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'testimonials', type: 'array', required: true, description: 'Array of testimonial items with name, quote, avatar, and title' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'osmo-testimonials-carousel',
    level: 'section',
    code: `<section className="py-24 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-16">What People Say</h2>
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-300">
        <div className="w-full flex-shrink-0 px-8">
          <blockquote className="text-xl font-medium mb-6">"An amazing testimonial quote from a happy customer."</blockquote>
          <div className="flex items-center justify-center gap-3">
            <img src="/avatar.jpg" alt="Customer" className="w-10 h-10 rounded-full" />
            <div className="text-left">
              <p className="font-semibold text-sm">Customer Name</p>
              <p className="text-xs text-muted-foreground">CEO at Company</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    suggestedWith: ['osmo-cta-centered', 'osmo-logo-cloud'],
    docsUrl: 'https://www.osmo.supply/vault',
    version: '1.0.0',
  },
]
