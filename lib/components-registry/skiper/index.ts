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
  // --- Loader-only entries (in component-loader but were missing from registry) ---
  {
    id: 'skiper-animated-tabs', name: 'AnimatedTabs', displayName: 'Animated Tabs', source: 'skiper',
    categories: ['navigation', 'animation'], tags: ['tabs', 'animated', 'navigation', 'framer-motion'],
    description: 'Animated tab navigation with smooth transitions',
    previewImage: '/components/skiper/animated-tabs.png',
    props: [{ name: 'tabs', type: 'array', required: true, description: 'Tab items' }, { name: 'className', type: 'string', required: false }],
    dependencies: ['framer-motion'], dependencyManifest: [{ package: 'framer-motion', version: '^12.0.0' }],
    modulePath: 'skiper-animated-tabs', level: 'primitive',
    code: '<AnimatedTabs tabs={[{label:"Tab 1"},{label:"Tab 2"}]} />',
    suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-cta-glow', name: 'CTAGlow', displayName: 'CTA Glow', source: 'skiper',
    categories: ['cta', 'section'], tags: ['cta', 'glow', 'call-to-action'],
    description: 'A call-to-action section with glowing effect',
    previewImage: '/components/skiper/cta-glow.png',
    props: [{ name: 'headline', type: 'string', required: true }, { name: 'buttonText', type: 'string', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-cta-glow', level: 'section',
    code: '<CTAGlow headline="Ready?" buttonText="Get Started" />',
    suggestedWith: ['skiper-gradient-button'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-feature-card-animated', name: 'FeatureCardAnimated', displayName: 'Animated Feature Card', source: 'skiper',
    categories: ['card', 'animation'], tags: ['feature', 'card', 'animated', 'hover'],
    description: 'Feature card with animated hover effects',
    previewImage: '/components/skiper/feature-card-animated.png',
    props: [{ name: 'title', type: 'string', required: true }, { name: 'description', type: 'string', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: ['framer-motion'], dependencyManifest: [{ package: 'framer-motion', version: '^12.0.0' }],
    modulePath: 'skiper-feature-card-animated', level: 'primitive',
    code: '<FeatureCardAnimated title="Feature" description="Description" />',
    suggestedWith: ['skiper-glow-card'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-feature-grid-glow', name: 'FeatureGridGlow', displayName: 'Feature Grid Glow', source: 'skiper',
    categories: ['feature', 'section'], tags: ['features', 'grid', 'glow', 'hover'],
    description: 'Feature grid with glowing hover effects on cards',
    previewImage: '/components/skiper/feature-grid-glow.png',
    props: [{ name: 'features', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-feature-grid-glow', level: 'section',
    code: '<FeatureGridGlow features={[{title:"Feature 1",description:"Desc"}]} />',
    suggestedWith: ['skiper-glow-card'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-gradient-divider', name: 'GradientDivider', displayName: 'Gradient Divider', source: 'skiper',
    categories: ['layout'], tags: ['divider', 'gradient', 'separator'],
    description: 'A section divider with animated gradient effect',
    previewImage: '/components/skiper/gradient-divider.png',
    props: [{ name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-gradient-divider', level: 'layout',
    code: '<GradientDivider />',
    suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-hero-dark', name: 'HeroDark', displayName: 'Hero Dark', source: 'skiper',
    categories: ['hero', 'section'], tags: ['hero', 'dark', 'landing'],
    description: 'A dark-themed hero section with dramatic styling',
    previewImage: '/components/skiper/hero-dark.png',
    props: [{ name: 'headline', type: 'string', required: true }, { name: 'subheadline', type: 'string', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-hero-dark', level: 'section',
    code: '<HeroDark headline="Build the Future" />',
    suggestedWith: ['skiper-text-gradient'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-hero-split-animated', name: 'HeroSplitAnimated', displayName: 'Hero Split Animated', source: 'skiper',
    categories: ['hero', 'section'], tags: ['hero', 'split', 'animated'],
    description: 'Split hero with animated entrance transitions',
    previewImage: '/components/skiper/hero-split-animated.png',
    props: [{ name: 'headline', type: 'string', required: true }, { name: 'description', type: 'string', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: ['framer-motion'], dependencyManifest: [{ package: 'framer-motion', version: '^12.0.0' }],
    modulePath: 'skiper-hero-split-animated', level: 'section',
    code: '<HeroSplitAnimated headline="Welcome" />',
    suggestedWith: ['skiper-hero-gradient'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-logo-marquee', name: 'LogoMarquee', displayName: 'Logo Marquee', source: 'skiper',
    categories: ['media', 'animation'], tags: ['logos', 'marquee', 'infinite', 'scroll'],
    description: 'Infinite scrolling logo marquee animation',
    previewImage: '/components/skiper/logo-marquee.png',
    props: [{ name: 'logos', type: 'array', required: true }, { name: 'speed', type: 'number', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-logo-marquee', level: 'section',
    code: '<LogoMarquee logos={[{src:"/logo.svg",alt:"Logo"}]} />',
    suggestedWith: ['osmo-logo-cloud'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-pricing-card', name: 'PricingCard', displayName: 'Pricing Card', source: 'skiper',
    categories: ['pricing', 'card'], tags: ['pricing', 'card', 'plan'],
    description: 'An individual pricing card with animated styling',
    previewImage: '/components/skiper/pricing-card.png',
    props: [{ name: 'name', type: 'string', required: true }, { name: 'price', type: 'string', required: true }, { name: 'features', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-pricing-card', level: 'primitive',
    code: '<PricingCard name="Pro" price="$29" features={["Feature 1"]} />',
    suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-progress-bar', name: 'ProgressBar', displayName: 'Progress Bar', source: 'skiper',
    categories: ['effect'], tags: ['progress', 'bar', 'animated'],
    description: 'An animated progress bar with gradient fill',
    previewImage: '/components/skiper/progress-bar.png',
    props: [{ name: 'value', type: 'number', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-progress-bar', level: 'primitive',
    code: '<ProgressBar value={75} />',
    suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-stats-counter', name: 'StatsCounter', displayName: 'Stats Counter', source: 'skiper',
    categories: ['section', 'animation'], tags: ['stats', 'counter', 'numbers', 'animated'],
    description: 'Animated counting stats section',
    previewImage: '/components/skiper/stats-counter.png',
    props: [{ name: 'stats', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-stats-counter', level: 'section',
    code: '<StatsCounter stats={[{value:1000,label:"Users"}]} />',
    suggestedWith: ['osmo-stats'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-testimonial-card', name: 'TestimonialCard', displayName: 'Testimonial Card', source: 'skiper',
    categories: ['card', 'testimonial'], tags: ['testimonial', 'card', 'review'],
    description: 'An individual testimonial card with hover effects',
    previewImage: '/components/skiper/testimonial-card.png',
    props: [{ name: 'quote', type: 'string', required: true }, { name: 'name', type: 'string', required: true }, { name: 'title', type: 'string', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-testimonial-card', level: 'primitive',
    code: '<TestimonialCard quote="Great product!" name="Jane" />',
    suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  // --- New component entries (batch 2) ---
  {
    id: 'skiper-bento-section', name: 'BentoSection', displayName: 'Bento Section', source: 'skiper',
    categories: ['section', 'layout'], tags: ['bento', 'grid', 'layout', 'cards'],
    description: 'A bento-style grid layout section',
    previewImage: '/components/skiper/bento-section.png',
    props: [{ name: 'items', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-bento-section', level: 'section',
    code: '<BentoSection items={[]} />', suggestedWith: ['osmo-features-bento'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-blur-card', name: 'BlurCard', displayName: 'Blur Card', source: 'skiper',
    categories: ['card', 'effect'], tags: ['blur', 'card', 'frosted', 'glassmorphism'],
    description: 'A frosted blur card effect',
    previewImage: '/components/skiper/blur-card.png',
    props: [{ name: 'children', type: 'children', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-blur-card', level: 'primitive',
    code: '<BlurCard>Content</BlurCard>', suggestedWith: ['skiper-glass-card'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-browser-mockup', name: 'BrowserMockup', displayName: 'Browser Mockup', source: 'skiper',
    categories: ['media', 'layout'], tags: ['browser', 'mockup', 'frame', 'preview'],
    description: 'Browser window mockup frame for showcasing content',
    previewImage: '/components/skiper/browser-mockup.png',
    props: [{ name: 'url', type: 'string', required: false }, { name: 'children', type: 'children', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-browser-mockup', level: 'primitive',
    code: '<BrowserMockup url="example.com">Content</BrowserMockup>', suggestedWith: ['skiper-phone-mockup'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-code-block', name: 'CodeBlock', displayName: 'Code Block', source: 'skiper',
    categories: ['media'], tags: ['code', 'syntax', 'highlight', 'snippet'],
    description: 'Styled code block with syntax highlighting',
    previewImage: '/components/skiper/code-block.png',
    props: [{ name: 'code', type: 'string', required: true }, { name: 'language', type: 'string', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-code-block', level: 'primitive',
    code: '<CodeBlock code="const x = 1" language="typescript" />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-comparison-section', name: 'ComparisonSection', displayName: 'Comparison Section', source: 'skiper',
    categories: ['section'], tags: ['comparison', 'before-after', 'slider'],
    description: 'Before/after comparison section with slider',
    previewImage: '/components/skiper/comparison-section.png',
    props: [{ name: 'beforeImage', type: 'string', required: true }, { name: 'afterImage', type: 'string', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-comparison-section', level: 'section',
    code: '<ComparisonSection beforeImage="/before.jpg" afterImage="/after.jpg" />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-dock-menu', name: 'DockMenu', displayName: 'Dock Menu', source: 'skiper',
    categories: ['navigation'], tags: ['dock', 'menu', 'macOS', 'navigation'],
    description: 'macOS-style dock menu with magnification effect',
    previewImage: '/components/skiper/dock-menu.png',
    props: [{ name: 'items', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: ['framer-motion'], dependencyManifest: [{ package: 'framer-motion', version: '^12.0.0' }],
    modulePath: 'skiper-dock-menu', level: 'primitive',
    code: '<DockMenu items={[{icon:"Home",label:"Home"}]} />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-feature-list', name: 'FeatureList', displayName: 'Feature List', source: 'skiper',
    categories: ['section', 'feature'], tags: ['features', 'list', 'checklist'],
    description: 'Feature list with animated check marks',
    previewImage: '/components/skiper/feature-list.png',
    props: [{ name: 'features', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-feature-list', level: 'section',
    code: '<FeatureList features={["Feature 1","Feature 2"]} />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-gradient-card', name: 'GradientCard', displayName: 'Gradient Card', source: 'skiper',
    categories: ['card'], tags: ['gradient', 'card', 'colorful'],
    description: 'Card with animated gradient border and background',
    previewImage: '/components/skiper/gradient-card.png',
    props: [{ name: 'children', type: 'children', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-gradient-card', level: 'primitive',
    code: '<GradientCard>Content</GradientCard>', suggestedWith: ['skiper-glow-card'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-hover-card-effect', name: 'HoverCardEffect', displayName: 'Hover Card Effect', source: 'skiper',
    categories: ['card', 'effect'], tags: ['hover', 'card', '3d', 'tilt'],
    description: 'Card with advanced hover tilt and lighting effects',
    previewImage: '/components/skiper/hover-card-effect.png',
    props: [{ name: 'children', type: 'children', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-hover-card-effect', level: 'primitive',
    code: '<HoverCardEffect>Content</HoverCardEffect>', suggestedWith: ['skiper-tilt-card'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-icon-cloud', name: 'IconCloud', displayName: 'Icon Cloud', source: 'skiper',
    categories: ['media', 'animation'], tags: ['icons', 'cloud', '3d', 'sphere'],
    description: '3D rotating icon cloud animation',
    previewImage: '/components/skiper/icon-cloud.png',
    props: [{ name: 'icons', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-icon-cloud', level: 'primitive',
    code: '<IconCloud icons={["react","typescript"]} />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-interactive-grid', name: 'InteractiveGrid', displayName: 'Interactive Grid', source: 'skiper',
    categories: ['effect', 'background'], tags: ['grid', 'interactive', 'cursor', 'hover'],
    description: 'Grid background that responds to cursor movement',
    previewImage: '/components/skiper/interactive-grid.png',
    props: [{ name: 'children', type: 'children', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-interactive-grid', level: 'effect',
    code: '<InteractiveGrid />', suggestedWith: ['skiper-retro-grid'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-mesh-gradient', name: 'MeshGradient', displayName: 'Mesh Gradient', source: 'skiper',
    categories: ['background', 'effect'], tags: ['mesh', 'gradient', 'animated', 'background'],
    description: 'Animated mesh gradient background',
    previewImage: '/components/skiper/mesh-gradient.png',
    props: [{ name: 'children', type: 'children', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-mesh-gradient', level: 'effect',
    code: '<MeshGradient />', suggestedWith: ['skiper-animated-gradient-bg'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-morphing-text', name: 'MorphingText', displayName: 'Morphing Text', source: 'skiper',
    categories: ['text', 'animation'], tags: ['text', 'morph', 'animated', 'transition'],
    description: 'Text that morphs between different words',
    previewImage: '/components/skiper/morphing-text.png',
    props: [{ name: 'words', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: ['framer-motion'], dependencyManifest: [{ package: 'framer-motion', version: '^12.0.0' }],
    modulePath: 'skiper-morphing-text', level: 'primitive',
    code: '<MorphingText words={["Hello","World"]} />', suggestedWith: ['skiper-text-gradient'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-number-ticker', name: 'NumberTicker', displayName: 'Number Ticker', source: 'skiper',
    categories: ['animation', 'text'], tags: ['number', 'ticker', 'counter', 'animated'],
    description: 'Animated number ticker that counts up',
    previewImage: '/components/skiper/number-ticker.png',
    props: [{ name: 'value', type: 'number', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: ['framer-motion'], dependencyManifest: [{ package: 'framer-motion', version: '^12.0.0' }],
    modulePath: 'skiper-number-ticker', level: 'primitive',
    code: '<NumberTicker value={1000} />', suggestedWith: ['skiper-stats-counter'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-orbit-animation', name: 'OrbitAnimation', displayName: 'Orbit Animation', source: 'skiper',
    categories: ['animation', 'effect'], tags: ['orbit', 'circular', 'rotation', 'animated'],
    description: 'Orbiting elements around a central point',
    previewImage: '/components/skiper/orbit-animation.png',
    props: [{ name: 'items', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-orbit-animation', level: 'effect',
    code: '<OrbitAnimation items={["A","B","C"]} />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-particle-field', name: 'ParticleField', displayName: 'Particle Field', source: 'skiper',
    categories: ['background', 'effect'], tags: ['particles', 'field', 'animated', 'background'],
    description: 'Interactive particle field background',
    previewImage: '/components/skiper/particle-field.png',
    props: [{ name: 'count', type: 'number', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-particle-field', level: 'effect',
    code: '<ParticleField />', suggestedWith: ['skiper-hero-particles'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-pattern-bg', name: 'PatternBg', displayName: 'Pattern Background', source: 'skiper',
    categories: ['background'], tags: ['pattern', 'background', 'dots', 'lines'],
    description: 'Decorative pattern background',
    previewImage: '/components/skiper/pattern-bg.png',
    props: [{ name: 'pattern', type: 'select', required: false, default: 'dots', options: ['dots', 'lines', 'grid'] }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-pattern-bg', level: 'effect',
    code: '<PatternBg pattern="dots" />', suggestedWith: ['skiper-retro-grid'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-phone-mockup', name: 'PhoneMockup', displayName: 'Phone Mockup', source: 'skiper',
    categories: ['media', 'layout'], tags: ['phone', 'mockup', 'mobile', 'frame'],
    description: 'Mobile phone mockup frame for showcasing content',
    previewImage: '/components/skiper/phone-mockup.png',
    props: [{ name: 'children', type: 'children', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-phone-mockup', level: 'primitive',
    code: '<PhoneMockup>Content</PhoneMockup>', suggestedWith: ['skiper-browser-mockup'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-ripple-button', name: 'RippleButton', displayName: 'Ripple Button', source: 'skiper',
    categories: ['button', 'effect'], tags: ['ripple', 'button', 'material', 'click'],
    description: 'Button with ripple click effect',
    previewImage: '/components/skiper/ripple-button.png',
    props: [{ name: 'children', type: 'string', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-ripple-button', level: 'primitive',
    code: '<RippleButton>Click Me</RippleButton>', suggestedWith: ['skiper-gradient-button'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-scroll-progress', name: 'ScrollProgress', displayName: 'Scroll Progress', source: 'skiper',
    categories: ['effect'], tags: ['scroll', 'progress', 'indicator'],
    description: 'Scroll progress indicator bar',
    previewImage: '/components/skiper/scroll-progress.png',
    props: [{ name: 'color', type: 'string', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-scroll-progress', level: 'effect',
    code: '<ScrollProgress />', suggestedWith: ['gsap-progress-scroll'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-shine-border', name: 'ShineBorder', displayName: 'Shine Border', source: 'skiper',
    categories: ['effect', 'card'], tags: ['shine', 'border', 'animated', 'glow'],
    description: 'Animated shine effect on card borders',
    previewImage: '/components/skiper/shine-border.png',
    props: [{ name: 'children', type: 'children', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-shine-border', level: 'primitive',
    code: '<ShineBorder>Content</ShineBorder>', suggestedWith: ['skiper-animated-border'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-sparkle-text', name: 'SparkleText', displayName: 'Sparkle Text', source: 'skiper',
    categories: ['text', 'effect'], tags: ['sparkle', 'text', 'glitter', 'animated'],
    description: 'Text with sparkle particle effects',
    previewImage: '/components/skiper/sparkle-text.png',
    props: [{ name: 'children', type: 'string', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-sparkle-text', level: 'primitive',
    code: '<SparkleText>Sparkle</SparkleText>', suggestedWith: ['aceternity-sparkles'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-split-section', name: 'SplitSection', displayName: 'Split Section', source: 'skiper',
    categories: ['section', 'layout'], tags: ['split', 'two-column', 'layout'],
    description: 'Split layout section with animated reveal',
    previewImage: '/components/skiper/split-section.png',
    props: [{ name: 'leftContent', type: 'children', required: true }, { name: 'rightContent', type: 'children', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-split-section', level: 'section',
    code: '<SplitSection leftContent={<div>Left</div>} rightContent={<div>Right</div>} />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-stacked-cards', name: 'StackedCards', displayName: 'Stacked Cards', source: 'skiper',
    categories: ['card', 'animation'], tags: ['stacked', 'cards', 'shuffle', 'animated'],
    description: 'Stacked card layout with drag-to-reveal interaction',
    previewImage: '/components/skiper/stacked-cards.png',
    props: [{ name: 'cards', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: ['framer-motion'], dependencyManifest: [{ package: 'framer-motion', version: '^12.0.0' }],
    modulePath: 'skiper-stacked-cards', level: 'primitive',
    code: '<StackedCards cards={[{title:"Card 1"}]} />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-text-scramble', name: 'TextScramble', displayName: 'Text Scramble', source: 'skiper',
    categories: ['text', 'animation'], tags: ['text', 'scramble', 'decode', 'hacker'],
    description: 'Text scramble/decode animation effect',
    previewImage: '/components/skiper/text-scramble.png',
    props: [{ name: 'text', type: 'string', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-text-scramble', level: 'primitive',
    code: '<TextScramble text="Hello World" />', suggestedWith: ['skiper-morphing-text'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-ticker-section', name: 'TickerSection', displayName: 'Ticker Section', source: 'skiper',
    categories: ['section', 'animation'], tags: ['ticker', 'scroll', 'news', 'marquee'],
    description: 'Horizontal ticker/news scroll section',
    previewImage: '/components/skiper/ticker-section.png',
    props: [{ name: 'items', type: 'array', required: true }, { name: 'speed', type: 'number', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-ticker-section', level: 'section',
    code: '<TickerSection items={["Item 1","Item 2"]} />', suggestedWith: ['skiper-logo-marquee'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-timeline-section', name: 'TimelineSection', displayName: 'Timeline Section', source: 'skiper',
    categories: ['section'], tags: ['timeline', 'history', 'events', 'vertical'],
    description: 'Vertical timeline section with animated entries',
    previewImage: '/components/skiper/timeline-section.png',
    props: [{ name: 'events', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-timeline-section', level: 'section',
    code: '<TimelineSection events={[{title:"Event 1",date:"2024"}]} />', suggestedWith: [], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-typing-animation', name: 'TypingAnimation', displayName: 'Typing Animation', source: 'skiper',
    categories: ['text', 'animation'], tags: ['typing', 'typewriter', 'cursor', 'animated'],
    description: 'Typewriter-style typing animation',
    previewImage: '/components/skiper/typing-animation.png',
    props: [{ name: 'text', type: 'string', required: true }, { name: 'speed', type: 'number', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-typing-animation', level: 'primitive',
    code: '<TypingAnimation text="Hello World" />', suggestedWith: ['gsap-typewriter'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-wavy-divider', name: 'WavyDivider', displayName: 'Wavy Divider', source: 'skiper',
    categories: ['layout'], tags: ['wavy', 'divider', 'svg', 'separator'],
    description: 'SVG wavy section divider',
    previewImage: '/components/skiper/wavy-divider.png',
    props: [{ name: 'color', type: 'string', required: false }, { name: 'className', type: 'string', required: false }],
    dependencies: [], dependencyManifest: [], modulePath: 'skiper-wavy-divider', level: 'layout',
    code: '<WavyDivider />', suggestedWith: ['skiper-gradient-divider'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
  {
    id: 'skiper-word-rotate', name: 'WordRotate', displayName: 'Word Rotate', source: 'skiper',
    categories: ['text', 'animation'], tags: ['word', 'rotate', 'cycle', 'animated'],
    description: 'Rotating word animation that cycles through a list',
    previewImage: '/components/skiper/word-rotate.png',
    props: [{ name: 'words', type: 'array', required: true }, { name: 'className', type: 'string', required: false }],
    dependencies: ['framer-motion'], dependencyManifest: [{ package: 'framer-motion', version: '^12.0.0' }],
    modulePath: 'skiper-word-rotate', level: 'primitive',
    code: '<WordRotate words={["Hello","World"]} />', suggestedWith: ['gsap-rotating-text'], docsUrl: 'https://skiper-ui.com/components', version: '1.0.0',
  },
]
