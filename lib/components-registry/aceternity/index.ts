import type { ComponentRegistryItem } from '../types'

export const aceternityComponents: ComponentRegistryItem[] = [
  {
    id: 'aceternity-hero-parallax',
    name: 'HeroParallax',
    displayName: 'Hero Parallax',
    source: 'aceternity',
    categories: ['hero', 'animation'],
    tags: ['landing', 'parallax', 'scroll', 'showcase'],
    description: 'A stunning hero section with 3D parallax scrolling product showcase',
    previewImage: '/components/aceternity/hero-parallax.png',
    props: [
      { name: 'products', type: 'array', required: true, description: 'Array of product items with title, link, and thumbnail' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-hero-parallax',
    level: 'section',
    code: `import { HeroParallax } from "@/components/ui/hero-parallax"

const products = [
  { title: "Product 1", link: "#", thumbnail: "/image1.jpg" },
  { title: "Product 2", link: "#", thumbnail: "/image2.jpg" },
]

<HeroParallax products={products} />`,
    suggestedWith: ['shadcn-button', 'aceternity-sparkles'],
    docsUrl: 'https://ui.aceternity.com/components/hero-parallax',
    version: '1.0.0',
  },
  {
    id: 'aceternity-bento-grid',
    name: 'BentoGrid',
    displayName: 'Bento Grid',
    source: 'aceternity',
    categories: ['grid', 'layout', 'feature'],
    tags: ['grid', 'cards', 'features', 'showcase'],
    description: 'A beautiful bento-style grid layout for showcasing features',
    previewImage: '/components/aceternity/bento-grid.png',
    props: [
      { name: 'items', type: 'array', required: true, description: 'Array of grid items' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
      { package: 'clsx', version: '^2.1.0' },
      { package: 'tailwind-merge', version: '^3.0.0' },
    ],
    modulePath: 'aceternity-bento-grid',
    level: 'layout',
    code: `import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

<BentoGrid>
  <BentoGridItem
    title="Feature 1"
    description="Description here"
    header={<div className="h-full w-full bg-gradient-to-br from-violet-500 to-purple-500" />}
    icon={<IconClipboard />}
  />
</BentoGrid>`,
    suggestedWith: ['aceternity-sparkles', 'shadcn-badge'],
    docsUrl: 'https://ui.aceternity.com/components/bento-grid',
    version: '1.0.0',
  },
  {
    id: 'aceternity-spotlight',
    name: 'Spotlight',
    displayName: 'Spotlight',
    source: 'aceternity',
    categories: ['hero', 'effect', 'animation'],
    tags: ['spotlight', 'hero', 'effect', 'cursor'],
    description: 'A spotlight effect that follows the cursor',
    previewImage: '/components/aceternity/spotlight.png',
    props: [
      { name: 'fill', type: 'color', required: false, default: 'white', description: 'Spotlight color' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-spotlight',
    level: 'effect',
    code: `import { Spotlight } from "@/components/ui/spotlight"

<div className="relative">
  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
  <h1>Your content here</h1>
</div>`,
    suggestedWith: ['aceternity-text-generate'],
    docsUrl: 'https://ui.aceternity.com/components/spotlight',
    version: '1.0.0',
  },
  {
    id: 'aceternity-hero-spotlight',
    name: 'HeroSpotlight',
    displayName: 'Hero Spotlight',
    source: 'aceternity',
    categories: ['hero', 'section', 'effect'],
    tags: ['hero', 'spotlight', 'dramatic', 'landing'],
    description: 'A full hero section combining the spotlight effect with headline and CTA',
    previewImage: '/components/aceternity/hero-spotlight.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline text' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'fill', type: 'color', required: false, default: 'white', description: 'Spotlight color' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-hero-spotlight',
    level: 'section',
    code: `import { Spotlight } from "@/components/ui/spotlight"

<div className="relative min-h-screen flex items-center justify-center bg-black/[0.96] antialiased">
  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
      Dramatic Headline
    </h1>
    <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
      Your compelling subheadline goes here
    </p>
  </div>
</div>`,
    suggestedWith: ['aceternity-text-generate', 'shadcn-button'],
    docsUrl: 'https://ui.aceternity.com/components/spotlight',
    version: '1.0.0',
  },
  {
    id: 'aceternity-hero-meteors',
    name: 'HeroMeteors',
    displayName: 'Hero Meteors',
    source: 'aceternity',
    categories: ['hero', 'section', 'effect'],
    tags: ['hero', 'meteors', 'particles', 'space', 'landing'],
    description: 'A hero section with animated meteor shower background effect',
    previewImage: '/components/aceternity/hero-meteors.png',
    props: [
      { name: 'headline', type: 'string', required: true, description: 'Main headline text' },
      { name: 'subheadline', type: 'string', required: false, description: 'Subheadline text' },
      { name: 'meteorCount', type: 'number', required: false, default: 20, description: 'Number of meteors' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-hero-meteors',
    level: 'section',
    code: `import { Meteors } from "@/components/ui/meteors"

<div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
      Your Headline
    </h1>
    <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
      Subheadline text goes here
    </p>
  </div>
  <Meteors number={20} />
</div>`,
    suggestedWith: ['aceternity-text-generate', 'shadcn-button'],
    docsUrl: 'https://ui.aceternity.com/components/meteors',
    version: '1.0.0',
  },
  {
    id: 'aceternity-text-generate',
    name: 'TextGenerateEffect',
    displayName: 'Text Generate Effect',
    source: 'aceternity',
    categories: ['text', 'animation'],
    tags: ['text', 'typing', 'animation', 'generate'],
    description: 'Text that generates word by word with animation',
    previewImage: '/components/aceternity/text-generate.png',
    props: [
      { name: 'words', type: 'string', required: true, description: 'Text to animate' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-text-generate',
    level: 'effect',
    code: `import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

<TextGenerateEffect words="Building the future of web development" />`,
    suggestedWith: ['aceternity-spotlight', 'shadcn-button'],
    docsUrl: 'https://ui.aceternity.com/components/text-generate-effect',
    version: '1.0.0',
  },
  {
    id: 'aceternity-typewriter-effect',
    name: 'TypewriterEffect',
    displayName: 'Typewriter Effect',
    source: 'aceternity',
    categories: ['text', 'animation'],
    tags: ['text', 'typewriter', 'typing', 'animation', 'cursor'],
    description: 'A typewriter text effect that types out words with a blinking cursor',
    previewImage: '/components/aceternity/typewriter-effect.png',
    props: [
      { name: 'words', type: 'array', required: true, description: 'Array of word objects with text and optional className' },
      { name: 'cursorClassName', type: 'string', required: false, description: 'Class for the cursor element' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-typewriter-effect',
    level: 'effect',
    code: `import { TypewriterEffect } from "@/components/ui/typewriter-effect"

const words = [
  { text: "Build" },
  { text: "amazing" },
  { text: "websites", className: "text-blue-500" },
]

<TypewriterEffect words={words} />`,
    suggestedWith: ['aceternity-spotlight', 'aceternity-text-generate'],
    docsUrl: 'https://ui.aceternity.com/components/typewriter-effect',
    version: '1.0.0',
  },
  {
    id: 'aceternity-sparkles',
    name: 'SparklesCore',
    displayName: 'Sparkles',
    source: 'aceternity',
    categories: ['effect', 'animation'],
    tags: ['sparkles', 'particles', 'effect', 'background'],
    description: 'Animated sparkles/particles effect for backgrounds',
    previewImage: '/components/aceternity/sparkles.png',
    props: [
      { name: 'particleColor', type: 'color', required: false, default: '#FFFFFF', description: 'Particle color' },
      { name: 'particleDensity', type: 'number', required: false, default: 100, description: 'Number of particles' },
      { name: 'minSize', type: 'number', required: false, default: 0.6, description: 'Minimum particle size' },
      { name: 'maxSize', type: 'number', required: false, default: 1.4, description: 'Maximum particle size' },
    ],
    dependencies: ['tsparticles', '@tsparticles/react', '@tsparticles/slim'],
    dependencyManifest: [
      { package: 'tsparticles', version: '^3.0.0' },
      { package: '@tsparticles/react', version: '^3.0.0' },
      { package: '@tsparticles/slim', version: '^3.0.0' },
    ],
    modulePath: 'aceternity-sparkles',
    level: 'effect',
    code: `import { SparklesCore } from "@/components/ui/sparkles"

<div className="relative h-40 w-full">
  <SparklesCore
    particleColor="#FFFFFF"
    particleDensity={100}
    className="w-full h-full"
  />
</div>`,
    suggestedWith: ['aceternity-text-generate'],
    docsUrl: 'https://ui.aceternity.com/components/sparkles',
    version: '1.0.0',
  },
  {
    id: 'aceternity-3d-card',
    name: '3DCard',
    displayName: '3D Card Effect',
    source: 'aceternity',
    categories: ['card', 'animation'],
    tags: ['3d', 'card', 'hover', 'tilt'],
    description: 'A card with 3D tilt effect on hover',
    previewImage: '/components/aceternity/3d-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-3d-card',
    level: 'primitive',
    code: `import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"

<CardContainer>
  <CardBody>
    <CardItem translateZ="50">
      <h3>3D Card Title</h3>
    </CardItem>
    <CardItem translateZ="100">
      <img src="/image.jpg" alt="Image" />
    </CardItem>
  </CardBody>
</CardContainer>`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://ui.aceternity.com/components/3d-card-effect',
    version: '1.0.0',
  },
  {
    id: 'aceternity-infinite-cards',
    name: 'InfiniteMovingCards',
    displayName: 'Infinite Moving Cards',
    source: 'aceternity',
    categories: ['testimonial', 'animation'],
    tags: ['carousel', 'infinite', 'scroll', 'testimonials'],
    description: 'Infinitely scrolling cards for testimonials or logos',
    previewImage: '/components/aceternity/infinite-cards.png',
    props: [
      { name: 'items', type: 'array', required: true, description: 'Array of card items' },
      { name: 'direction', type: 'select', required: false, default: 'left', options: ['left', 'right'] },
      { name: 'speed', type: 'select', required: false, default: 'normal', options: ['fast', 'normal', 'slow'] },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-infinite-cards',
    level: 'section',
    code: `import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

const testimonials = [
  { quote: "Amazing product!", name: "John", title: "CEO" },
]

<InfiniteMovingCards items={testimonials} direction="left" speed="slow" />`,
    suggestedWith: ['shadcn-avatar'],
    docsUrl: 'https://ui.aceternity.com/components/infinite-moving-cards',
    version: '1.0.0',
  },
  {
    id: 'aceternity-lamp',
    name: 'LampEffect',
    displayName: 'Lamp Effect',
    source: 'aceternity',
    categories: ['hero', 'effect'],
    tags: ['lamp', 'glow', 'hero', 'light'],
    description: 'A dramatic lamp/light effect for hero sections',
    previewImage: '/components/aceternity/lamp.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content below the lamp' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-lamp',
    level: 'effect',
    code: `import { LampContainer } from "@/components/ui/lamp"

<LampContainer>
  <h1 className="text-4xl font-bold">Welcome</h1>
</LampContainer>`,
    suggestedWith: ['aceternity-text-generate', 'shadcn-button'],
    docsUrl: 'https://ui.aceternity.com/components/lamp-effect',
    version: '1.0.0',
  },
  {
    id: 'aceternity-wavy-bg',
    name: 'WavyBackground',
    displayName: 'Wavy Background',
    source: 'aceternity',
    categories: ['background', 'effect'],
    tags: ['waves', 'background', 'animated'],
    description: 'Animated wavy background effect',
    previewImage: '/components/aceternity/wavy-bg.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content on top of waves' },
      { name: 'colors', type: 'array', required: false, description: 'Array of colors for waves' },
      { name: 'blur', type: 'number', required: false, default: 10, description: 'Blur amount' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'aceternity-wavy-bg',
    level: 'effect',
    code: `import { WavyBackground } from "@/components/ui/wavy-background"

<WavyBackground>
  <h1>Your content here</h1>
</WavyBackground>`,
    suggestedWith: ['aceternity-text-generate'],
    docsUrl: 'https://ui.aceternity.com/components/wavy-background',
    version: '1.0.0',
  },
  {
    id: 'aceternity-floating-navbar',
    name: 'FloatingNavbar',
    displayName: 'Floating Navbar',
    source: 'aceternity',
    categories: ['navigation', 'header'],
    tags: ['navbar', 'floating', 'header', 'menu'],
    description: 'A floating navbar that hides on scroll down and shows on scroll up',
    previewImage: '/components/aceternity/floating-navbar.png',
    props: [
      { name: 'navItems', type: 'array', required: true, description: 'Array of navigation items' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-floating-navbar',
    level: 'layout',
    code: `import { FloatingNav } from "@/components/ui/floating-navbar"

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
]

<FloatingNav navItems={navItems} />`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://ui.aceternity.com/components/floating-navbar',
    version: '1.0.0',
  },
  {
    id: 'aceternity-tracing-beam',
    name: 'TracingBeam',
    displayName: 'Tracing Beam',
    source: 'aceternity',
    categories: ['effect', 'animation'],
    tags: ['beam', 'scroll', 'line', 'trace'],
    description: 'A beam that traces along the content as you scroll',
    previewImage: '/components/aceternity/tracing-beam.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to trace' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-tracing-beam',
    level: 'effect',
    code: `import { TracingBeam } from "@/components/ui/tracing-beam"

<TracingBeam>
  <div>Your long content here...</div>
</TracingBeam>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/tracing-beam',
    version: '1.0.0',
  },
  {
    id: 'aceternity-flip-words',
    name: 'FlipWords',
    displayName: 'Flip Words',
    source: 'aceternity',
    categories: ['text', 'animation'],
    tags: ['text', 'flip', 'animation', 'words'],
    description: 'A text animation effect that flips through a list of words',
    previewImage: '/components/aceternity/flip-words.png',
    props: [
      { name: 'words', type: 'array', required: true, description: 'Array of words to flip through' },
      { name: 'duration', type: 'number', required: false, default: 3000, description: 'Duration between flips in ms' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-flip-words',
    level: 'effect',
    code: `import { FlipWords } from "@/components/ui/flip-words"

const words = ["better", "modern", "beautiful", "awesome"]

<FlipWords words={words} />`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/flip-words',
    version: '1.0.0',
  },
  {
    id: 'aceternity-glare-card',
    name: 'GlareCard',
    displayName: 'Glare Card',
    source: 'aceternity',
    categories: ['card', 'animation'],
    tags: ['card', 'glare', 'hover', 'effect'],
    description: 'A card with a glare effect on hover',
    previewImage: '/components/aceternity/glare-card.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card content' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-glare-card',
    level: 'primitive',
    code: `import { GlareCard } from "@/components/ui/glare-card"

<GlareCard>
  <h3>Glare Card</h3>
  <p>Hover to see the glare effect</p>
</GlareCard>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/glare-card',
    version: '1.0.0',
  },
  {
    id: 'aceternity-hero-highlight',
    name: 'HeroHighlight',
    displayName: 'Hero Highlight',
    source: 'aceternity',
    categories: ['hero', 'section', 'animation'],
    tags: ['hero', 'highlight', 'text', 'animation', 'landing'],
    description: 'A hero section with animated text highlight effect',
    previewImage: '/components/aceternity/hero-highlight.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Hero content' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-hero-highlight',
    level: 'section',
    code: `import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight"

<HeroHighlight>
  <h1 className="text-4xl font-bold">
    Build with <Highlight>Aceternity UI</Highlight>
  </h1>
</HeroHighlight>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/hero-highlight',
    version: '1.0.0',
  },
  {
    id: 'aceternity-moving-border',
    name: 'MovingBorder',
    displayName: 'Moving Border',
    source: 'aceternity',
    categories: ['effect', 'animation'],
    tags: ['border', 'moving', 'animation', 'button'],
    description: 'An animated border effect that moves around an element',
    previewImage: '/components/aceternity/moving-border.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content inside the border' },
      { name: 'duration', type: 'number', required: false, default: 2000, description: 'Animation duration in ms' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-moving-border',
    level: 'effect',
    code: `import { Button } from "@/components/ui/moving-border"

<Button borderRadius="1.75rem">
  Moving Border Button
</Button>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/moving-border',
    version: '1.0.0',
  },
  {
    id: 'aceternity-background-beams',
    name: 'BackgroundBeams',
    displayName: 'Background Beams',
    source: 'aceternity',
    categories: ['background', 'effect', 'animation'],
    tags: ['background', 'beams', 'animated', 'light'],
    description: 'Animated beam lines background effect',
    previewImage: '/components/aceternity/background-beams.png',
    props: [
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-background-beams',
    level: 'effect',
    code: `import { BackgroundBeams } from "@/components/ui/background-beams"

<div className="relative h-screen w-full bg-neutral-950">
  <h1 className="relative z-10 text-white">Your Content</h1>
  <BackgroundBeams />
</div>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/background-beams',
    version: '1.0.0',
  },
  {
    id: 'aceternity-grid-bg',
    name: 'GridBackground',
    displayName: 'Grid Background',
    source: 'aceternity',
    categories: ['background', 'effect'],
    tags: ['grid', 'background', 'pattern', 'decorative'],
    description: 'A decorative grid pattern background',
    previewImage: '/components/aceternity/grid-bg.png',
    props: [
      { name: 'children', type: 'children', required: false, description: 'Content on top of the grid' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'aceternity-grid-bg',
    level: 'effect',
    code: `import { GridBackground } from "@/components/ui/grid-bg"

<GridBackground>
  <h1>Content over grid</h1>
</GridBackground>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/grid-and-dot-backgrounds',
    version: '1.0.0',
  },
  {
    id: 'aceternity-dot-bg',
    name: 'DotBackground',
    displayName: 'Dot Background',
    source: 'aceternity',
    categories: ['background', 'effect'],
    tags: ['dot', 'background', 'pattern', 'decorative'],
    description: 'A decorative dot pattern background',
    previewImage: '/components/aceternity/dot-bg.png',
    props: [
      { name: 'children', type: 'children', required: false, description: 'Content on top of the dots' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'aceternity-dot-bg',
    level: 'effect',
    code: `import { DotBackground } from "@/components/ui/dot-bg"

<DotBackground>
  <h1>Content over dots</h1>
</DotBackground>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/grid-and-dot-backgrounds',
    version: '1.0.0',
  },
  {
    id: 'aceternity-animated-modal',
    name: 'AnimatedModal',
    displayName: 'Animated Modal',
    source: 'aceternity',
    categories: ['modal', 'animation'],
    tags: ['modal', 'dialog', 'animated', 'overlay'],
    description: 'A modal component with smooth open/close animations',
    previewImage: '/components/aceternity/animated-modal.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Modal content' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-animated-modal',
    level: 'primitive',
    code: `import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal"

<Modal>
  <ModalTrigger className="btn">Open Modal</ModalTrigger>
  <ModalBody>
    <ModalContent>
      <h2>Modal Title</h2>
      <p>Modal content goes here</p>
    </ModalContent>
  </ModalBody>
</Modal>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/animated-modal',
    version: '1.0.0',
  },
  {
    id: 'aceternity-animated-tooltip',
    name: 'AnimatedTooltip',
    displayName: 'Animated Tooltip',
    source: 'aceternity',
    categories: ['other', 'animation'],
    tags: ['tooltip', 'hover', 'animated', 'avatar'],
    description: 'A tooltip component with smooth animation on hover',
    previewImage: '/components/aceternity/animated-tooltip.png',
    props: [
      { name: 'items', type: 'array', required: true, description: 'Array of items with id, name, designation, and image' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-animated-tooltip',
    level: 'primitive',
    code: `import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

const people = [
  { id: 1, name: "John Doe", designation: "Engineer", image: "/avatar1.jpg" },
  { id: 2, name: "Jane Smith", designation: "Designer", image: "/avatar2.jpg" },
]

<AnimatedTooltip items={people} />`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/animated-tooltip',
    version: '1.0.0',
  },
  {
    id: 'aceternity-aurora-bg',
    name: 'AuroraBackground',
    displayName: 'Aurora Background',
    source: 'aceternity',
    categories: ['background', 'effect', 'animation'],
    tags: ['aurora', 'background', 'gradient', 'animated', 'borealis'],
    description: 'An animated aurora borealis background effect',
    previewImage: '/components/aceternity/aurora-bg.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content on top of the aurora' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-aurora-bg',
    level: 'effect',
    code: `import { AuroraBackground } from "@/components/ui/aurora-background"

<AuroraBackground>
  <h1 className="text-white text-4xl font-bold">Aurora Effect</h1>
</AuroraBackground>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/aurora-background',
    version: '1.0.0',
  },
  {
    id: 'aceternity-card-hover',
    name: 'CardHoverEffect',
    displayName: 'Card Hover Effect',
    source: 'aceternity',
    categories: ['card', 'animation'],
    tags: ['card', 'hover', 'animation', 'grid'],
    description: 'Cards with animated hover effect that highlights the hovered card',
    previewImage: '/components/aceternity/card-hover.png',
    props: [
      { name: 'items', type: 'array', required: true, description: 'Array of card items with title, description, and link' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-card-hover',
    level: 'primitive',
    code: `import { HoverEffect } from "@/components/ui/card-hover-effect"

const items = [
  { title: "Feature 1", description: "Description here", link: "#" },
  { title: "Feature 2", description: "Description here", link: "#" },
]

<HoverEffect items={items} />`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/card-hover-effect',
    version: '1.0.0',
  },
  {
    id: 'aceternity-focus-cards',
    name: 'FocusCards',
    displayName: 'Focus Cards',
    source: 'aceternity',
    categories: ['card', 'section', 'animation'],
    tags: ['card', 'focus', 'expandable', 'gallery'],
    description: 'Expandable focus cards that highlight the selected card',
    previewImage: '/components/aceternity/focus-cards.png',
    props: [
      { name: 'cards', type: 'array', required: true, description: 'Array of card items with title and src' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-focus-cards',
    level: 'section',
    code: `import { FocusCards } from "@/components/ui/focus-cards"

const cards = [
  { title: "Card 1", src: "/image1.jpg" },
  { title: "Card 2", src: "/image2.jpg" },
]

<FocusCards cards={cards} />`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/focus-cards',
    version: '1.0.0',
  },
  {
    id: 'aceternity-gradient-bg',
    name: 'GradientBackgroundAnimated',
    displayName: 'Gradient Background Animated',
    source: 'aceternity',
    categories: ['background', 'effect'],
    tags: ['gradient', 'background', 'animated', 'color'],
    description: 'An animated gradient background with smooth color transitions',
    previewImage: '/components/aceternity/gradient-bg.png',
    props: [
      { name: 'children', type: 'children', required: false, description: 'Content on top of the gradient' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'aceternity-gradient-bg',
    level: 'effect',
    code: `import { BackgroundGradientAnimation } from "@/components/ui/gradient-bg"

<BackgroundGradientAnimation>
  <h1 className="text-white text-4xl font-bold">Gradient Background</h1>
</BackgroundGradientAnimation>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/background-gradient-animation',
    version: '1.0.0',
  },
  {
    id: 'aceternity-link-preview',
    name: 'LinkPreview',
    displayName: 'Link Preview',
    source: 'aceternity',
    categories: ['other', 'animation'],
    tags: ['link', 'preview', 'hover', 'tooltip'],
    description: 'A hoverable link that shows a preview of the linked page',
    previewImage: '/components/aceternity/link-preview.png',
    props: [
      { name: 'url', type: 'string', required: true, description: 'URL to preview' },
      { name: 'children', type: 'children', required: true, description: 'Link text content' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-link-preview',
    level: 'primitive',
    code: `import { LinkPreview } from "@/components/ui/link-preview"

<LinkPreview url="https://example.com">
  Hover to preview this link
</LinkPreview>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/link-preview',
    version: '1.0.0',
  },
  {
    id: 'aceternity-meteors-bg',
    name: 'MeteorsBackground',
    displayName: 'Meteors Background',
    source: 'aceternity',
    categories: ['background', 'effect', 'animation'],
    tags: ['meteors', 'background', 'particles', 'space', 'shower'],
    description: 'A meteor shower background effect with animated falling meteors',
    previewImage: '/components/aceternity/meteors-bg.png',
    props: [
      { name: 'number', type: 'number', required: false, default: 20, description: 'Number of meteors' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-meteors-bg',
    level: 'effect',
    code: `import { Meteors } from "@/components/ui/meteors-bg"

<div className="relative h-screen w-full bg-black">
  <h1 className="relative z-10 text-white">Your Content</h1>
  <Meteors number={20} />
</div>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/meteors',
    version: '1.0.0',
  },
  {
    id: 'aceternity-shooting-stars',
    name: 'ShootingStars',
    displayName: 'Shooting Stars',
    source: 'aceternity',
    categories: ['background', 'effect', 'animation'],
    tags: ['shooting', 'stars', 'background', 'space', 'animated'],
    description: 'A shooting stars background effect with animated star trails',
    previewImage: '/components/aceternity/shooting-stars.png',
    props: [
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-shooting-stars',
    level: 'effect',
    code: `import { ShootingStars } from "@/components/ui/shooting-stars"

<div className="relative h-screen w-full bg-neutral-950">
  <h1 className="relative z-10 text-white">Your Content</h1>
  <ShootingStars />
</div>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/shooting-stars',
    version: '1.0.0',
  },
  {
    id: 'aceternity-scrollbar-animation',
    name: 'AceternityScrollbar',
    displayName: 'Scrollbar Animation',
    source: 'aceternity',
    categories: ['animation', 'effect'],
    tags: ['scrollbar', 'scroll', 'progress', 'drag', 'navigation', 'animated'],
    description: 'A custom animated scrollbar with draggable progress indicator and contextual code cards that appear as you scroll through sections',
    previewImage: '/components/aceternity/scrollbar-animation.png',
    props: [
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion', 'react-use-measure'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
      { package: 'react-use-measure', version: '^2.1.0' },
    ],
    modulePath: 'aceternity-scrollbar-animation',
    level: 'section',
    code: `import AceternityScrollbar from '@/components/registry/aceternity/scrollbar-animation'

<AceternityScrollbar />`,
    suggestedWith: ['aceternity-tracing-beam', 'aceternity-floating-navbar'],
    docsUrl: 'https://ui.aceternity.com/components',
    version: '1.0.0',
  },
  {
    id: 'aceternity-text-reveal',
    name: 'TextRevealCard',
    displayName: 'Text Reveal Card',
    source: 'aceternity',
    categories: ['card', 'text', 'animation'],
    tags: ['text', 'reveal', 'hover', 'card', 'effect'],
    description: 'A card that reveals hidden text on hover with a wipe effect',
    previewImage: '/components/aceternity/text-reveal.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Visible text' },
      { name: 'revealText', type: 'string', required: true, description: 'Text revealed on hover' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['framer-motion'],
    dependencyManifest: [
      { package: 'framer-motion', version: '^12.0.0' },
    ],
    modulePath: 'aceternity-text-reveal',
    level: 'primitive',
    code: `import { TextRevealCard } from "@/components/ui/text-reveal-card"

<TextRevealCard text="Hover to reveal" revealText="Secret message!" />`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/text-reveal-card',
    version: '1.0.0',
  },
]
