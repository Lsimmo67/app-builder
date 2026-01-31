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
    code: `import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

<TextGenerateEffect words="Building the future of web development" />`,
    suggestedWith: ['aceternity-spotlight', 'shadcn-button'],
    docsUrl: 'https://ui.aceternity.com/components/text-generate-effect',
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
    code: `import { TracingBeam } from "@/components/ui/tracing-beam"

<TracingBeam>
  <div>Your long content here...</div>
</TracingBeam>`,
    suggestedWith: [],
    docsUrl: 'https://ui.aceternity.com/components/tracing-beam',
    version: '1.0.0',
  },
]
