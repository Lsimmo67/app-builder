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
    dependencyManifest: [],
    modulePath: 'skiper-glass-card',
    level: 'primitive',
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
    dependencyManifest: [],
    modulePath: 'skiper-gradient-button',
    level: 'primitive',
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
    dependencyManifest: [],
    modulePath: 'skiper-glow-card',
    level: 'primitive',
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
    dependencyManifest: [],
    modulePath: 'skiper-animated-border',
    level: 'effect',
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
    id: 'skiper-animated-gradient-bg',
    name: 'AnimatedGradientBg',
    displayName: 'Animated Gradient Background',
    source: 'skiper',
    categories: ['background', 'effect'],
    tags: ['gradient', 'background', 'animated', 'mesh'],
    description: 'An animated mesh gradient background with smooth color transitions',
    previewImage: '/components/skiper/animated-gradient-bg.png',
    props: [
      { name: 'children', type: 'children', required: false, description: 'Content overlaid on background' },
      { name: 'colors', type: 'array', required: false, description: 'Array of gradient colors' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'skiper-animated-gradient-bg',
    level: 'effect',
    code: `<div className="relative min-h-screen overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 animate-gradient bg-[length:400%_400%]" />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>`,
    suggestedWith: ['skiper-text-gradient', 'skiper-glass-card'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-aurora-hero',
    name: 'AuroraHero',
    displayName: 'Aurora Hero',
    source: 'skiper',
    categories: ['hero', 'section', 'effect'],
    tags: ['aurora', 'hero', 'northern-lights', 'gradient', 'landing'],
    description: 'A hero section with aurora borealis-inspired animated gradient effect',
    previewImage: '/components/skiper/aurora-hero.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'skiper-aurora-hero',
    level: 'section',
    code: `<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-cyan-500/10 to-transparent animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent animate-pulse delay-1000" />
  </div>
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Aurora Hero</h1>
    <p className="text-lg text-white/70 max-w-2xl mx-auto">
      A stunning aurora borealis effect for your hero section
    </p>
  </div>
</section>`,
    suggestedWith: ['skiper-text-gradient', 'skiper-gradient-button'],
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
    dependencyManifest: [],
    modulePath: 'skiper-hero-gradient',
    level: 'section',
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
    id: 'skiper-hero-particles',
    name: 'HeroParticles',
    displayName: 'Hero Particles',
    source: 'skiper',
    categories: ['hero', 'section', 'effect'],
    tags: ['hero', 'particles', 'animated', 'landing', 'interactive'],
    description: 'A hero section with interactive particle background animation',
    previewImage: '/components/skiper/hero-particles.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'particleCount', type: 'number', required: false, default: 50, description: 'Number of particles' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['tsparticles'],
    dependencyManifest: [
      { package: 'tsparticles', version: '^3.0.0' },
    ],
    modulePath: 'skiper-hero-particles',
    level: 'section',
    code: `<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
  <div className="absolute inset-0">
    {/* Particle canvas renders here */}
  </div>
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
      Interactive Particles
    </h1>
    <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
      A captivating particle background for your hero
    </p>
    <Button size="lg" variant="secondary">Get Started</Button>
  </div>
</section>`,
    suggestedWith: ['skiper-gradient-button', 'skiper-text-gradient'],
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
    dependencyManifest: [],
    modulePath: 'skiper-floating-card',
    level: 'primitive',
    code: `<div className="group p-6 rounded-2xl bg-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
  <h3 className="text-xl font-semibold mb-2">Floating Card</h3>
  <p className="text-muted-foreground">Hover to see the floating effect</p>
</div>`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-magnetic-button',
    name: 'MagneticButton',
    displayName: 'Magnetic Button',
    source: 'skiper',
    categories: ['button', 'effect'],
    tags: ['magnetic', 'button', 'hover', 'cursor', 'interactive'],
    description: 'A button that magnetically attracts toward the cursor on hover',
    previewImage: '/components/skiper/magnetic-button.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Button text' },
      { name: 'strength', type: 'number', required: false, default: 0.3, description: 'Magnetic pull strength' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'skiper-magnetic-button',
    level: 'primitive',
    code: `<button
  className="relative px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-transform"
  onMouseMove={handleMagneticPull}
  onMouseLeave={handleReset}
>
  Magnetic Button
</button>`,
    suggestedWith: ['skiper-glass-card', 'skiper-gradient-button'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-morphing-card',
    name: 'MorphingCard',
    displayName: 'Morphing Card',
    source: 'skiper',
    categories: ['card', 'effect', 'animation'],
    tags: ['morph', 'card', 'shape', 'animated', 'hover'],
    description: 'A card that morphs its border radius and shape on hover',
    previewImage: '/components/skiper/morphing-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'skiper-morphing-card',
    level: 'primitive',
    code: `<div className="group p-6 rounded-2xl bg-card border transition-all duration-500 hover:rounded-[40px] hover:bg-primary/5">
  <h3 className="text-xl font-semibold mb-2">Morphing Card</h3>
  <p className="text-muted-foreground">Hover to see the shape morph</p>
</div>`,
    suggestedWith: ['skiper-floating-card', 'skiper-glow-card'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-spotlight-card',
    name: 'SpotlightCard',
    displayName: 'Spotlight Card',
    source: 'skiper',
    categories: ['card', 'effect'],
    tags: ['spotlight', 'card', 'cursor', 'hover', 'light'],
    description: 'A card with a spotlight gradient that follows the cursor',
    previewImage: '/components/skiper/spotlight-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
      { name: 'spotlightColor', type: 'color', required: false, default: 'rgba(139,92,246,0.15)', description: 'Spotlight color' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'skiper-spotlight-card',
    level: 'primitive',
    code: `<div
  className="relative p-6 rounded-2xl bg-card border overflow-hidden"
  onMouseMove={handleSpotlight}
>
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
    style={{ background: "radial-gradient(circle at var(--x) var(--y), rgba(139,92,246,0.15), transparent 80%)" }}
  />
  <div className="relative">
    <h3 className="text-xl font-semibold mb-2">Spotlight Card</h3>
    <p className="text-muted-foreground">Move your cursor over the card</p>
  </div>
</div>`,
    suggestedWith: ['skiper-glow-card', 'skiper-glass-card'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-tilt-card',
    name: 'TiltCard',
    displayName: 'Tilt Card',
    source: 'skiper',
    categories: ['card', 'effect'],
    tags: ['tilt', 'card', '3d', 'hover', 'perspective'],
    description: 'A card with 3D tilt effect that responds to cursor position',
    previewImage: '/components/skiper/tilt-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
      { name: 'tiltAmount', type: 'number', required: false, default: 15, description: 'Maximum tilt angle in degrees' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'skiper-tilt-card',
    level: 'primitive',
    code: `<div
  className="p-6 rounded-2xl bg-card border transition-transform duration-200"
  style={{ transform: "perspective(1000px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))" }}
  onMouseMove={handleTilt}
  onMouseLeave={handleReset}
>
  <h3 className="text-xl font-semibold mb-2">Tilt Card</h3>
  <p className="text-muted-foreground">Move your cursor to tilt</p>
</div>`,
    suggestedWith: ['skiper-glass-card', 'skiper-floating-card'],
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
    dependencyManifest: [],
    modulePath: 'skiper-text-gradient',
    level: 'primitive',
    code: `<h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-pink-600 to-violet-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
  Beautiful Gradient Text
</h1>`,
    suggestedWith: ['skiper-hero-gradient'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-neon-text',
    name: 'NeonText',
    displayName: 'Neon Text',
    source: 'skiper',
    categories: ['text', 'effect'],
    tags: ['neon', 'text', 'glow', 'retro', 'cyberpunk'],
    description: 'Text with a glowing neon effect and optional flicker animation',
    previewImage: '/components/skiper/neon-text.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Text content' },
      { name: 'color', type: 'color', required: false, default: '#8B5CF6', description: 'Neon glow color' },
      { name: 'flicker', type: 'boolean', required: false, default: false, description: 'Enable flicker animation' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'skiper-neon-text',
    level: 'primitive',
    code: `<h1
  className="text-5xl font-bold text-white"
  style={{
    textShadow: "0 0 7px #8B5CF6, 0 0 10px #8B5CF6, 0 0 21px #8B5CF6, 0 0 42px #8B5CF6"
  }}
>
  Neon Glow
</h1>`,
    suggestedWith: ['skiper-text-gradient', 'skiper-aurora-hero'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-retro-grid',
    name: 'RetroGrid',
    displayName: 'Retro Grid',
    source: 'skiper',
    categories: ['background', 'effect'],
    tags: ['retro', 'grid', 'perspective', 'background', 'cyberpunk'],
    description: 'A retro-style perspective grid background effect',
    previewImage: '/components/skiper/retro-grid.png',
    props: [
      { name: 'children', type: 'children', required: false, description: 'Content overlaid on grid' },
      { name: 'gridColor', type: 'color', required: false, default: 'rgba(139,92,246,0.3)', description: 'Grid line color' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'skiper-retro-grid',
    level: 'effect',
    code: `<div className="relative min-h-screen overflow-hidden bg-black">
  <div className="absolute inset-0" style={{
    backgroundImage: "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    transform: "perspective(500px) rotateX(60deg)",
    transformOrigin: "center top"
  }} />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>`,
    suggestedWith: ['skiper-neon-text', 'skiper-text-gradient'],
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
    dependencyManifest: [],
    modulePath: 'skiper-shimmer-button',
    level: 'primitive',
    code: `<button className="relative px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden">
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
  <span className="relative">Shimmer Button</span>
</button>`,
    suggestedWith: ['skiper-glass-card'],
    docsUrl: 'https://skiper-ui.com/components',
    version: '1.0.0',
  },
  {
    id: 'skiper-scrollbar-animation',
    name: 'ScrollbarAnimation',
    displayName: 'Scrollbar Animation',
    source: 'skiper',
    categories: ['animation', 'effect'],
    tags: ['scrollbar', 'scroll', 'progress', 'drag', 'navigation', 'animated'],
    description: 'A custom animated scrollbar with draggable progress indicator and contextual code cards that appear as you scroll through sections',
    previewImage: '/components/skiper/scrollbar-animation.png',
    props: [
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion', 'react-use-measure'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
      { package: 'react-use-measure', version: '^2.1.0' },
    ],
    modulePath: 'skiper-scrollbar-animation',
    level: 'section',
    code: `import ScrollbarAnimation from '@/components/registry/skiper/scrollbar-animation'

<ScrollbarAnimation />`,
    suggestedWith: ['skiper-animated-tabs', 'skiper-progress-bar'],
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
    dependencyManifest: [],
    modulePath: 'skiper-noise-card',
    level: 'primitive',
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
