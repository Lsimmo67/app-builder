import type { ComponentRegistryItem } from '../types'

export const skiperComponents: ComponentRegistryItem[] = [
  {
    id: 'skiper-glass-card',
    name: 'GlassCard',
    displayName: 'Glass Card',
    source: 'skiper',
    categories: ['card'],
    tags: ['glass', 'blur', 'modern', 'glassmorphism'],
    description: 'A modern glass-morphism card with blur effect',
    previewImage: '/components/skiper/glass-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    code: `<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
  <div className="relative">
    <h3 className="text-xl font-semibold mb-2">Glass Card</h3>
    <p className="text-muted-foreground">Beautiful glassmorphism effect</p>
  </div>
</div>`,
    suggestedWith: ['skiper-gradient-button', 'aceternity-sparkles'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-gradient-button',
    name: 'GradientButton',
    displayName: 'Gradient Button',
    source: 'skiper',
    categories: ['button'],
    tags: ['gradient', 'button', 'cta', 'animated'],
    description: 'A button with animated gradient background',
    previewImage: '/components/skiper/gradient-button.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Button text' },
      { name: 'variant', type: 'select', required: false, default: 'primary', options: ['primary', 'secondary', 'outline'] },
    ],
    dependencies: [],
    code: `<button className="relative px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium overflow-hidden group">
  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  <span className="relative">Get Started</span>
</button>`,
    suggestedWith: ['skiper-glass-card'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-glow-card',
    name: 'GlowCard',
    displayName: 'Glow Card',
    source: 'skiper',
    categories: ['card', 'effect'],
    tags: ['glow', 'card', 'hover', 'neon'],
    description: 'A card with animated glow effect on hover',
    previewImage: '/components/skiper/glow-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
      { name: 'glowColor', type: 'color', required: false, default: '#8B5CF6', description: 'Glow color' },
    ],
    dependencies: [],
    code: `<div className="group relative p-6 rounded-2xl bg-card border transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/0 via-violet-600/10 to-violet-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="relative">
    <h3 className="text-xl font-semibold mb-2">Glow Card</h3>
    <p className="text-muted-foreground">Hover to see the glow effect</p>
  </div>
</div>`,
    suggestedWith: ['skiper-gradient-button'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-animated-border',
    name: 'AnimatedBorder',
    displayName: 'Animated Border',
    source: 'skiper',
    categories: ['card', 'effect'],
    tags: ['border', 'animated', 'gradient', 'rotating'],
    description: 'A card with animated rotating gradient border',
    previewImage: '/components/skiper/animated-border.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
      { name: 'borderWidth', type: 'number', required: false, default: 2, description: 'Border width in pixels' },
    ],
    dependencies: [],
    code: `<div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-violet-600 via-pink-600 to-violet-600 bg-[length:200%_auto] animate-gradient">
  <div className="rounded-2xl bg-background p-6">
    <h3 className="text-xl font-semibold mb-2">Animated Border</h3>
    <p className="text-muted-foreground">Watch the gradient rotate</p>
  </div>
</div>`,
    suggestedWith: ['skiper-gradient-button'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-hero-gradient',
    name: 'HeroGradient',
    displayName: 'Hero with Gradient',
    source: 'skiper',
    categories: ['hero', 'section'],
    tags: ['hero', 'gradient', 'mesh', 'landing'],
    description: 'A hero section with beautiful mesh gradient background',
    previewImage: '/components/skiper/hero-gradient.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline' },
    ],
    dependencies: [],
    code: `<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Gradient background */}
  <div className="absolute inset-0">
    <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
    <div className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
  </div>
  
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
      Build faster with modern tools
    </h1>
    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
      Create stunning websites with beautiful components
    </p>
    <div className="flex gap-4 justify-center">
      <Button size="lg">Get Started</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </div>
  </div>
</section>`,
    suggestedWith: ['skiper-gradient-button', 'aceternity-text-generate'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-floating-card',
    name: 'FloatingCard',
    displayName: 'Floating Card',
    source: 'skiper',
    categories: ['card', 'animation'],
    tags: ['floating', 'hover', 'elevation', 'shadow'],
    description: 'A card that floats up on hover with smooth shadow animation',
    previewImage: '/components/skiper/floating-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
    ],
    dependencies: [],
    code: `<div className="group p-6 rounded-2xl bg-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
  <h3 className="text-xl font-semibold mb-2">Floating Card</h3>
  <p className="text-muted-foreground">Hover to see the floating effect</p>
</div>`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-text-gradient',
    name: 'TextGradient',
    displayName: 'Gradient Text',
    source: 'skiper',
    categories: ['text'],
    tags: ['text', 'gradient', 'heading', 'colorful'],
    description: 'Text with animated gradient color',
    previewImage: '/components/skiper/text-gradient.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Text content' },
      { name: 'from', type: 'color', required: false, default: '#8B5CF6', description: 'Start color' },
      { name: 'to', type: 'color', required: false, default: '#EC4899', description: 'End color' },
    ],
    dependencies: [],
    code: `<h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-pink-600 to-violet-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
  Beautiful Gradient Text
</h1>`,
    suggestedWith: ['skiper-hero-gradient'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-shimmer-button',
    name: 'ShimmerButton',
    displayName: 'Shimmer Button',
    source: 'skiper',
    categories: ['button'],
    tags: ['shimmer', 'button', 'shine', 'animated'],
    description: 'A button with shimmer shine effect',
    previewImage: '/components/skiper/shimmer-button.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Button text' },
    ],
    dependencies: [],
    code: `<button className="relative px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden">
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
  <span className="relative">Shimmer Button</span>
</button>`,
    suggestedWith: ['skiper-glass-card'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-noise-card',
    name: 'NoiseCard',
    displayName: 'Noise Texture Card',
    source: 'skiper',
    categories: ['card'],
    tags: ['noise', 'texture', 'grain', 'retro'],
    description: 'A card with subtle noise texture overlay',
    previewImage: '/components/skiper/noise-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
    ],
    dependencies: [],
    code: `<div className="relative p-6 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 overflow-hidden">
  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
  <div className="relative text-white">
    <h3 className="text-xl font-semibold mb-2">Noise Card</h3>
    <p className="text-white/80">With subtle grain texture</p>
  </div>
</div>`,
    suggestedWith: [],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
]
