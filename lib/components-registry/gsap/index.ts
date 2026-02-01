import type { ComponentRegistryItem } from '../types'

export const gsapEffects: ComponentRegistryItem[] = [
  {
    id: 'gsap-scroll-reveal',
    name: 'ScrollReveal',
    displayName: 'Scroll Reveal',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['scroll', 'reveal', 'fade', 'entrance'],
    description: 'Reveal elements with animation when they enter the viewport',
    previewImage: '/components/gsap/scroll-reveal.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to reveal' },
      { name: 'animation', type: 'select', required: false, default: 'fadeUp', options: ['fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight', 'scale', 'rotate'] },
      { name: 'duration', type: 'number', required: false, default: 1, description: 'Animation duration in seconds' },
      { name: 'delay', type: 'number', required: false, default: 0, description: 'Delay before animation starts' },
      { name: 'stagger', type: 'number', required: false, default: 0.1, description: 'Stagger delay between children' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-scroll-reveal',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ScrollReveal({ children }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from(containerRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    })
  }, [])

  return <div ref={containerRef}>{children}</div>
}`,
    suggestedWith: ['osmo-features-grid'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    version: '1.0.0',
  },
  {
    id: 'gsap-fade-in',
    name: 'FadeIn',
    displayName: 'Fade In',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['fade', 'entrance', 'opacity', 'smooth'],
    description: 'A simple fade-in animation wrapper for any content',
    previewImage: '/components/gsap/fade-in.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to fade in' },
      { name: 'duration', type: 'number', required: false, default: 0.8, description: 'Animation duration in seconds' },
      { name: 'delay', type: 'number', required: false, default: 0, description: 'Delay before animation' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-fade-in',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function FadeIn({ children, duration = 0.8, delay = 0 }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      duration,
      delay,
      ease: 'power2.out'
    })
  }, [])

  return <div ref={ref}>{children}</div>
}`,
    suggestedWith: ['gsap-slide-in', 'gsap-scale-in'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-slide-in',
    name: 'SlideIn',
    displayName: 'Slide In',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['slide', 'entrance', 'direction', 'motion'],
    description: 'Slide content in from a specified direction with smooth easing',
    previewImage: '/components/gsap/slide-in.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to slide in' },
      { name: 'direction', type: 'select', required: false, default: 'left', options: ['left', 'right', 'up', 'down'] },
      { name: 'duration', type: 'number', required: false, default: 0.8, description: 'Animation duration in seconds' },
      { name: 'delay', type: 'number', required: false, default: 0, description: 'Delay before animation' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-slide-in',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function SlideIn({ children, direction = 'left', duration = 0.8 }) {
  const ref = useRef(null)
  const axes = { left: { x: -100 }, right: { x: 100 }, up: { y: -100 }, down: { y: 100 } }

  useGSAP(() => {
    gsap.from(ref.current, {
      ...axes[direction],
      opacity: 0,
      duration,
      ease: 'power3.out'
    })
  }, [])

  return <div ref={ref}>{children}</div>
}`,
    suggestedWith: ['gsap-fade-in', 'gsap-scale-in'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-scale-in',
    name: 'ScaleIn',
    displayName: 'Scale In',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['scale', 'zoom', 'entrance', 'grow'],
    description: 'Scale content in from a smaller or larger size with smooth easing',
    previewImage: '/components/gsap/scale-in.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to scale in' },
      { name: 'from', type: 'number', required: false, default: 0.8, description: 'Initial scale value' },
      { name: 'duration', type: 'number', required: false, default: 0.6, description: 'Animation duration in seconds' },
      { name: 'delay', type: 'number', required: false, default: 0, description: 'Delay before animation' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-scale-in',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function ScaleIn({ children, from = 0.8, duration = 0.6 }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      scale: from,
      opacity: 0,
      duration,
      ease: 'back.out(1.7)'
    })
  }, [])

  return <div ref={ref}>{children}</div>
}`,
    suggestedWith: ['gsap-fade-in', 'gsap-slide-in'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-text-split',
    name: 'TextSplit',
    displayName: 'Text Split Animation',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['text', 'split', 'characters', 'words'],
    description: 'Animate text by splitting it into characters or words',
    previewImage: '/components/gsap/text-split.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Text to animate' },
      { name: 'splitBy', type: 'select', required: false, default: 'chars', options: ['chars', 'words', 'lines'] },
      { name: 'animation', type: 'select', required: false, default: 'fadeUp', options: ['fadeUp', 'fadeDown', 'scale', 'rotate'] },
    ],
    dependencies: ['gsap', 'split-type'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: 'split-type', version: '^0.3.0' },
    ],
    modulePath: 'gsap-text-split',
    level: 'effect',
    code: `import gsap from 'gsap'
import SplitType from 'split-type'

function TextSplitAnimation({ text }) {
  const textRef = useRef(null)

  useEffect(() => {
    const split = new SplitType(textRef.current, { types: 'chars' })

    gsap.from(split.chars, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power3.out'
    })

    return () => split.revert()
  }, [])

  return <h1 ref={textRef}>{text}</h1>
}`,
    suggestedWith: ['aceternity-text-generate'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-parallax',
    name: 'ParallaxEffect',
    displayName: 'Parallax Scroll',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['parallax', 'scroll', 'depth', 'layers'],
    description: 'Create depth with parallax scrolling effect',
    previewImage: '/components/gsap/parallax.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content with parallax' },
      { name: 'speed', type: 'number', required: false, default: 0.5, description: 'Parallax speed multiplier' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-parallax',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ParallaxEffect({ children, speed = 0.5 }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }, [])

  return <div ref={ref}>{children}</div>
}`,
    suggestedWith: ['osmo-hero-split'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    version: '1.0.0',
  },
  {
    id: 'gsap-horizontal-scroll',
    name: 'HorizontalScroll',
    displayName: 'Horizontal Scroll',
    source: 'gsap',
    categories: ['animation', 'layout'],
    tags: ['horizontal', 'scroll', 'gallery', 'showcase'],
    description: 'Transform vertical scroll into horizontal movement',
    previewImage: '/components/gsap/horizontal-scroll.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Horizontal panels' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-horizontal-scroll',
    level: 'layout',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function HorizontalScroll({ children }) {
  const containerRef = useRef(null)
  const panelsRef = useRef(null)

  useGSAP(() => {
    const panels = gsap.utils.toArray(panelsRef.current.children)

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => '+=' + panelsRef.current.offsetWidth
      }
    })
  }, [])

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={panelsRef} className="flex">
        {children}
      </div>
    </div>
  )
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    version: '1.0.0',
  },
  {
    id: 'gsap-marquee',
    name: 'Marquee',
    displayName: 'Marquee',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['marquee', 'scroll', 'ticker', 'infinite', 'logos'],
    description: 'An infinite horizontal scrolling marquee for logos, text, or any content',
    previewImage: '/components/gsap/marquee.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to scroll' },
      { name: 'speed', type: 'number', required: false, default: 50, description: 'Scroll speed in pixels per second' },
      { name: 'direction', type: 'select', required: false, default: 'left', options: ['left', 'right'] },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-marquee',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Marquee({ children, speed = 50, direction = 'left' }) {
  const trackRef = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    const width = track.scrollWidth / 2

    gsap.to(track, {
      x: direction === 'left' ? -width : width,
      duration: width / speed,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex gap-8 w-max">
        {children}
        {children}
      </div>
    </div>
  )
}`,
    suggestedWith: ['osmo-testimonials'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-stagger-cards',
    name: 'StaggerCards',
    displayName: 'Stagger Cards',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['stagger', 'cards', 'entrance', 'cascade'],
    description: 'Animate a group of cards with staggered entrance timing',
    previewImage: '/components/gsap/stagger-cards.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Card elements to stagger' },
      { name: 'stagger', type: 'number', required: false, default: 0.1, description: 'Delay between each card in seconds' },
      { name: 'animation', type: 'select', required: false, default: 'fadeUp', options: ['fadeUp', 'fadeDown', 'scale', 'slideLeft', 'slideRight'] },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-stagger-cards',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function StaggerCards({ children, stagger = 0.1 }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from(containerRef.current.children, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    })
  }, [])

  return <div ref={containerRef} className="grid md:grid-cols-3 gap-6">{children}</div>
}`,
    suggestedWith: ['osmo-features-grid', 'gsap-scroll-reveal'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-counter-section',
    name: 'CounterSection',
    displayName: 'Counter Section',
    source: 'gsap',
    categories: ['animation', 'section'],
    tags: ['counter', 'numbers', 'stats', 'increment'],
    description: 'An animated counter section that counts up numbers when scrolled into view',
    previewImage: '/components/gsap/counter-section.png',
    props: [
      { name: 'stats', type: 'array', required: true, description: 'Array of stat items with value and label' },
      { name: 'duration', type: 'number', required: false, default: 2, description: 'Count animation duration in seconds' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-counter-section',
    level: 'section',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function CounterSection({ stats }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const counters = sectionRef.current.querySelectorAll('[data-count]')
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.count)
      gsap.to(counter, {
        textContent: target,
        duration: 2,
        snap: { textContent: 1 },
        scrollTrigger: { trigger: counter, start: 'top 80%' }
      })
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl font-bold" data-count={stat.value}>0</p>
            <p className="text-muted-foreground mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}`,
    suggestedWith: ['osmo-features-grid'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    version: '1.0.0',
  },
  {
    id: 'gsap-magnetic-element',
    name: 'MagneticElement',
    displayName: 'Magnetic Element',
    source: 'gsap',
    categories: ['effect', 'animation'],
    tags: ['magnetic', 'cursor', 'hover', 'interactive', 'attraction'],
    description: 'Wraps any element to add a magnetic cursor-attraction effect on hover',
    previewImage: '/components/gsap/magnetic-element.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Element to make magnetic' },
      { name: 'strength', type: 'number', required: false, default: 0.3, description: 'Magnetic pull strength (0-1)' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-magnetic-element',
    level: 'effect',
    code: `import gsap from 'gsap'

function MagneticElement({ children, strength = 0.3 }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-magnetic-button',
    name: 'MagneticButton',
    displayName: 'Magnetic Button',
    source: 'gsap',
    categories: ['button', 'effect'],
    tags: ['magnetic', 'hover', 'cursor', 'interactive'],
    description: 'A button that magnetically follows the cursor on hover',
    previewImage: '/components/gsap/magnetic-button.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Button text' },
      { name: 'strength', type: 'number', required: false, default: 50, description: 'Magnetic strength' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-magnetic-button',
    level: 'effect',
    code: `import gsap from 'gsap'

function MagneticButton({ children, strength = 50 }) {
  const buttonRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-morph-svg',
    name: 'MorphSVG',
    displayName: 'SVG Morph',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['svg', 'morph', 'shape', 'transform'],
    description: 'Morph between different SVG shapes',
    previewImage: '/components/gsap/morph-svg.png',
    props: [
      { name: 'fromPath', type: 'string', required: true, description: 'Initial SVG path' },
      { name: 'toPath', type: 'string', required: true, description: 'Target SVG path' },
      { name: 'duration', type: 'number', required: false, default: 1, description: 'Animation duration' },
    ],
    dependencies: ['gsap', 'gsap/MorphSVGPlugin'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-morph-svg',
    level: 'effect',
    code: `import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

function MorphSVG({ fromPath, toPath }) {
  const pathRef = useRef(null)

  useEffect(() => {
    gsap.to(pathRef.current, {
      morphSVG: toPath,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })
  }, [])

  return (
    <svg viewBox="0 0 100 100">
      <path ref={pathRef} d={fromPath} fill="currentColor" />
    </svg>
  )
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/',
    version: '1.0.0',
  },
  {
    id: 'gsap-pin-section',
    name: 'PinSection',
    displayName: 'Pin Section',
    source: 'gsap',
    categories: ['animation', 'layout'],
    tags: ['pin', 'sticky', 'scroll', 'fixed'],
    description: 'Pin a section while scrolling through content',
    previewImage: '/components/gsap/pin-section.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to pin' },
      { name: 'pinDuration', type: 'number', required: false, default: 1000, description: 'Pin duration in pixels' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-pin-section',
    level: 'layout',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function PinSection({ children }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: 'top top',
      end: '+=1000',
      scrub: true
    })
  }, [])

  return <section ref={sectionRef}>{children}</section>
}`,
    suggestedWith: ['gsap-scroll-reveal'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    version: '1.0.0',
  },
  {
    id: 'gsap-flip-animation',
    name: 'FlipAnimation',
    displayName: 'FLIP Animation',
    source: 'gsap',
    categories: ['animation'],
    tags: ['flip', 'layout', 'transition', 'reorder'],
    description: 'Smooth layout animations using FLIP technique',
    previewImage: '/components/gsap/flip.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Items to animate' },
    ],
    dependencies: ['gsap', 'gsap/Flip'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-flip-animation',
    level: 'effect',
    code: `import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

function FlipAnimation({ items, onReorder }) {
  const containerRef = useRef(null)

  const handleReorder = () => {
    const state = Flip.getState(containerRef.current.children)
    onReorder()
    Flip.from(state, {
      duration: 0.5,
      ease: 'power2.inOut',
      stagger: 0.05
    })
  }

  return (
    <div ref={containerRef}>
      {items.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  )
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/Flip/',
    version: '1.0.0',
  },
  {
    id: 'gsap-bounce-in',
    name: 'BounceIn',
    displayName: 'Bounce In',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['bounce', 'entrance', 'elastic', 'spring'],
    description: 'Bounce entrance animation',
    previewImage: '/components/gsap/bounce-in.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to animate' },
      { name: 'duration', type: 'number', required: false, default: 0.8, description: 'Animation duration in seconds' },
      { name: 'delay', type: 'number', required: false, default: 0, description: 'Delay before animation' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-bounce-in',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function BounceIn({ children, duration = 0.8, delay = 0 }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      y: -50,
      opacity: 0,
      duration,
      delay,
      ease: 'bounce.out'
    })
  }, [])

  return <div ref={ref}>{children}</div>
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-flip-card',
    name: 'FlipCard',
    displayName: 'Flip Card',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['flip', 'card', '3d', 'rotate', 'hover'],
    description: '3D flip card animation',
    previewImage: '/components/gsap/flip-card.png',
    props: [
      { name: 'front', type: 'children', required: true, description: 'Front face content' },
      { name: 'back', type: 'children', required: true, description: 'Back face content' },
      { name: 'duration', type: 'number', required: false, default: 0.6, description: 'Flip duration in seconds' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-flip-card',
    level: 'effect',
    code: `import gsap from 'gsap'

function FlipCard({ front, back, duration = 0.6 }) {
  const cardRef = useRef(null)

  const handleFlip = () => {
    gsap.to(cardRef.current, {
      rotateY: 180,
      duration,
      ease: 'power2.inOut'
    })
  }

  return (
    <div ref={cardRef} onClick={handleFlip} style={{ perspective: 1000 }}>
      <div>{front}</div>
      <div>{back}</div>
    </div>
  )
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-morphing-shapes',
    name: 'MorphingShapes',
    displayName: 'Morphing Shapes',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['svg', 'morph', 'shape', 'transform', 'organic'],
    description: 'SVG shape morphing',
    previewImage: '/components/gsap/morphing-shapes.png',
    props: [
      { name: 'shapes', type: 'array', required: true, description: 'Array of SVG path data to morph between' },
      { name: 'duration', type: 'number', required: false, default: 1, description: 'Morph duration in seconds' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-morphing-shapes',
    level: 'effect',
    code: `import gsap from 'gsap'

function MorphingShapes({ shapes, duration = 1 }) {
  const pathRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    shapes.forEach((shape) => {
      tl.to(pathRef.current, { attr: { d: shape }, duration, ease: 'power2.inOut' })
    })
  }, [])

  return (
    <svg viewBox="0 0 200 200">
      <path ref={pathRef} d={shapes[0]} fill="currentColor" />
    </svg>
  )
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-reveal-text',
    name: 'RevealText',
    displayName: 'Reveal Text',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['text', 'reveal', 'scroll', 'clip', 'mask'],
    description: 'Text reveal on scroll',
    previewImage: '/components/gsap/reveal-text.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Text to reveal' },
      { name: 'duration', type: 'number', required: false, default: 1, description: 'Reveal duration in seconds' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-reveal-text',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function RevealText({ text, duration = 1 }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      clipPath: 'inset(0 100% 0 0)',
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      }
    })
  }, [])

  return <p ref={ref}>{text}</p>
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-progress-scroll',
    name: 'ProgressScroll',
    displayName: 'Scroll Progress',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['scroll', 'progress', 'indicator', 'bar'],
    description: 'Scroll progress indicator',
    previewImage: '/components/gsap/progress-scroll.png',
    props: [
      { name: 'color', type: 'string', required: false, default: '#3b82f6', description: 'Progress bar color' },
      { name: 'height', type: 'number', required: false, default: 4, description: 'Bar height in pixels' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-progress-scroll',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ProgressScroll({ color = '#3b82f6', height = 4 }) {
  const barRef = useRef(null)

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    })
  }, [])

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        height, backgroundColor: color, transformOrigin: 'left',
        transform: 'scaleX(0)', zIndex: 9999
      }}
    />
  )
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-rotating-text',
    name: 'RotatingText',
    displayName: 'Rotating Text',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['text', 'rotate', 'carousel', 'cycle', 'loop'],
    description: 'Rotating text carousel',
    previewImage: '/components/gsap/rotating-text.png',
    props: [
      { name: 'words', type: 'array', required: true, description: 'Array of words to rotate through' },
      { name: 'duration', type: 'number', required: false, default: 0.5, description: 'Transition duration in seconds' },
      { name: 'interval', type: 'number', required: false, default: 2, description: 'Time between rotations in seconds' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-rotating-text',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function RotatingText({ words, duration = 0.5, interval = 2 }) {
  const textRef = useRef(null)
  const indexRef = useRef(0)

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: interval })
    words.forEach((word, i) => {
      tl.to(textRef.current, { y: -20, opacity: 0, duration })
        .call(() => { textRef.current.textContent = words[(i + 1) % words.length] })
        .fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration })
    })
  }, [])

  return <span ref={textRef}>{words[0]}</span>
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-typewriter',
    name: 'GsapTypewriter',
    displayName: 'GSAP Typewriter',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['typewriter', 'text', 'typing', 'cursor', 'sequential'],
    description: 'Typewriter text effect',
    previewImage: '/components/gsap/typewriter.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Text to type out' },
      { name: 'speed', type: 'number', required: false, default: 0.05, description: 'Typing speed per character in seconds' },
      { name: 'delay', type: 'number', required: false, default: 0, description: 'Delay before typing starts' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-typewriter',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function GsapTypewriter({ text, speed = 0.05, delay = 0 }) {
  const ref = useRef(null)

  useGSAP(() => {
    const chars = text.split('')
    ref.current.textContent = ''
    const tl = gsap.timeline({ delay })
    chars.forEach((char) => {
      tl.call(() => { ref.current.textContent += char }, null, '+=' + speed)
    })
  }, [])

  return <span ref={ref} />
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-wave-text',
    name: 'WaveText',
    displayName: 'Wave Text',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['wave', 'text', 'oscillation', 'ripple', 'characters'],
    description: 'Wave text animation',
    previewImage: '/components/gsap/wave-text.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Text to animate' },
      { name: 'amplitude', type: 'number', required: false, default: 20, description: 'Wave height in pixels' },
      { name: 'duration', type: 'number', required: false, default: 1, description: 'Wave cycle duration in seconds' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-wave-text',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function WaveText({ text, amplitude = 20, duration = 1 }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    const chars = containerRef.current.querySelectorAll('span')
    gsap.to(chars, {
      y: -amplitude,
      duration,
      stagger: 0.05,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <div ref={containerRef} style={{ display: 'inline-flex' }}>
      {text.split('').map((char, i) => (
        <span key={i}>{char === ' ' ? '\\u00A0' : char}</span>
      ))}
    </div>
  )
}`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-inertia-grid',
    name: 'InertiaGrid',
    displayName: 'Inertia Media Grid',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['inertia', 'grid', 'mouse', 'hover', 'media', 'interactive', 'velocity'],
    description: 'An interactive media grid where images react to mouse velocity with inertia-based displacement and rotation',
    previewImage: '/components/gsap/inertia-grid.png',
    props: [
      { name: 'images', type: 'array', required: false, description: 'Array of image objects with src and alt' },
      { name: 'headerTitle', type: 'string', required: false, default: '3d & stuff', description: 'Header category title' },
      { name: 'headerCount', type: 'number', required: false, default: 12, description: 'Number displayed in header' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-inertia-grid',
    level: 'section',
    code: `import InertiaGrid from '@/components/registry/gsap/inertia-grid'

<InertiaGrid
  headerTitle="3d & stuff"
  headerCount={12}
/>`,
    suggestedWith: ['gsap-stagger-cards', 'gsap-magnetic-element'],
    docsUrl: 'https://gsap.com/made-with-gsap/',
    version: '1.0.0',
  },
  {
    id: 'gsap-parallax-section',
    name: 'ParallaxSection',
    displayName: 'Parallax Section',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['parallax', 'scroll', 'depth', 'layers', 'section'],
    description: 'Create depth with parallax scrolling effect on a full section',
    previewImage: '/components/gsap/parallax-section.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content with parallax' },
      { name: 'speed', type: 'number', required: false, default: 0.5, description: 'Parallax speed multiplier' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-parallax-section',
    level: 'effect',
    code: `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ParallaxSection({ children, speed = 0.5 }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }, [])

  return <section ref={ref}>{children}</section>
}`,
    suggestedWith: ['osmo-hero-split'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-magnetic',
    name: 'Magnetic',
    displayName: 'Magnetic',
    source: 'gsap',
    categories: ['effect', 'animation'],
    tags: ['magnetic', 'cursor', 'hover', 'interactive', 'attraction'],
    description: 'Adds a magnetic cursor-attraction effect on hover',
    previewImage: '/components/gsap/magnetic.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Element to make magnetic' },
      { name: 'strength', type: 'number', required: false, default: 0.3, description: 'Magnetic pull strength (0-1)' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-magnetic',
    level: 'effect',
    code: `import gsap from 'gsap'

function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-circular-text',
    name: 'CircularText',
    displayName: 'Circular Text',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['circular', 'text', 'rotate', 'arc', 'spin'],
    description: 'Animated text arranged in a circle that rotates continuously',
    previewImage: '/components/gsap/circular-text.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Text to display in a circle' },
      { name: 'radius', type: 'number', required: false, default: 100, description: 'Circle radius in pixels' },
      { name: 'speed', type: 'number', required: false, default: 10, description: 'Rotation speed in seconds per revolution' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-circular-text',
    level: 'effect',
    code: `import CircularText from '@/components/registry/gsap/circular-text'

<CircularText text="YOUR TEXT HERE • " radius={100} speed={10} />`,
    suggestedWith: ['gsap-magnetic-element'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-cursor-follower',
    name: 'CursorFollower',
    displayName: 'Cursor Follower',
    source: 'gsap',
    categories: ['effect', 'animation'],
    tags: ['cursor', 'follower', 'mouse', 'interactive', 'pointer'],
    description: 'A custom cursor that follows mouse movement with smooth GSAP animation',
    previewImage: '/components/gsap/cursor-follower.png',
    props: [
      { name: 'size', type: 'number', required: false, default: 20, description: 'Cursor size in pixels' },
      { name: 'color', type: 'string', required: false, default: '#3b82f6', description: 'Cursor color' },
      { name: 'delay', type: 'number', required: false, default: 0.1, description: 'Follow delay for smooth trailing' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-cursor-follower',
    level: 'effect',
    code: `import CursorFollower from '@/components/registry/gsap/cursor-follower'

<CursorFollower size={20} color="#3b82f6" />`,
    suggestedWith: ['gsap-magnetic-element'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-draw-svg',
    name: 'DrawSVG',
    displayName: 'SVG Draw',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['svg', 'draw', 'stroke', 'path', 'line-art'],
    description: 'Animate SVG path drawing with stroke animation on scroll or load',
    previewImage: '/components/gsap/draw-svg.png',
    props: [
      { name: 'svgPath', type: 'string', required: true, description: 'SVG path data (d attribute)' },
      { name: 'duration', type: 'number', required: false, default: 2, description: 'Draw duration in seconds' },
      { name: 'strokeColor', type: 'string', required: false, default: 'currentColor', description: 'Stroke color' },
      { name: 'strokeWidth', type: 'number', required: false, default: 2, description: 'Stroke width' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-draw-svg',
    level: 'effect',
    code: `import DrawSVG from '@/components/registry/gsap/draw-svg'

<DrawSVG svgPath="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" duration={2} />`,
    suggestedWith: ['gsap-scroll-reveal'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/',
    version: '1.0.0',
  },
  {
    id: 'gsap-elastic-slider',
    name: 'ElasticSlider',
    displayName: 'Elastic Slider',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['slider', 'elastic', 'draggable', 'range', 'interactive'],
    description: 'A slider with elastic snap-back animation powered by GSAP',
    previewImage: '/components/gsap/elastic-slider.png',
    props: [
      { name: 'min', type: 'number', required: false, default: 0, description: 'Minimum value' },
      { name: 'max', type: 'number', required: false, default: 100, description: 'Maximum value' },
      { name: 'defaultValue', type: 'number', required: false, default: 50, description: 'Default value' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-elastic-slider',
    level: 'effect',
    code: `import ElasticSlider from '@/components/registry/gsap/elastic-slider'

<ElasticSlider min={0} max={100} defaultValue={50} />`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-infinite-scroll',
    name: 'InfiniteScroll',
    displayName: 'Infinite Scroll',
    source: 'gsap',
    categories: ['animation', 'layout'],
    tags: ['infinite', 'scroll', 'loop', 'seamless', 'continuous'],
    description: 'Seamless infinite scroll animation for content lists',
    previewImage: '/components/gsap/infinite-scroll.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to infinitely scroll' },
      { name: 'speed', type: 'number', required: false, default: 1, description: 'Scroll speed multiplier' },
      { name: 'direction', type: 'select', required: false, default: 'up', options: ['up', 'down'] },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-infinite-scroll',
    level: 'effect',
    code: `import InfiniteScroll from '@/components/registry/gsap/infinite-scroll'

<InfiniteScroll speed={1} direction="up">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</InfiniteScroll>`,
    suggestedWith: ['gsap-marquee'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-kinetic-typography',
    name: 'KineticTypography',
    displayName: 'Kinetic Typography',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['kinetic', 'typography', 'motion', 'text', 'dynamic'],
    description: 'Dynamic kinetic typography with GSAP-powered motion animations',
    previewImage: '/components/gsap/kinetic-typography.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Text to animate' },
      { name: 'animation', type: 'select', required: false, default: 'wave', options: ['wave', 'bounce', 'scatter', 'spiral'] },
      { name: 'duration', type: 'number', required: false, default: 1, description: 'Animation duration' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-kinetic-typography',
    level: 'effect',
    code: `import KineticTypography from '@/components/registry/gsap/kinetic-typography'

<KineticTypography text="Hello World" animation="wave" />`,
    suggestedWith: ['gsap-text-split', 'gsap-wave-text'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-morph-text',
    name: 'MorphText',
    displayName: 'Morph Text',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['morph', 'text', 'transition', 'transform', 'swap'],
    description: 'Text morphing animation that transitions between different words',
    previewImage: '/components/gsap/morph-text.png',
    props: [
      { name: 'words', type: 'array', required: true, description: 'Array of words to morph between' },
      { name: 'duration', type: 'number', required: false, default: 1, description: 'Morph duration' },
      { name: 'interval', type: 'number', required: false, default: 3, description: 'Interval between morphs' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-morph-text',
    level: 'effect',
    code: `import MorphText from '@/components/registry/gsap/morph-text'

<MorphText words={["Innovation", "Design", "Excellence"]} />`,
    suggestedWith: ['gsap-rotating-text', 'gsap-text-split'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-page-transition',
    name: 'PageTransition',
    displayName: 'Page Transition',
    source: 'gsap',
    categories: ['animation', 'layout'],
    tags: ['page', 'transition', 'route', 'navigation', 'entrance'],
    description: 'Smooth page transition animation wrapper for route changes',
    previewImage: '/components/gsap/page-transition.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Page content to transition' },
      { name: 'type', type: 'select', required: false, default: 'fade', options: ['fade', 'slide', 'scale', 'wipe'] },
      { name: 'duration', type: 'number', required: false, default: 0.6, description: 'Transition duration' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-page-transition',
    level: 'layout',
    code: `import PageTransition from '@/components/registry/gsap/page-transition'

<PageTransition type="fade" duration={0.6}>
  {children}
</PageTransition>`,
    suggestedWith: [],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-parallax-layers',
    name: 'ParallaxLayers',
    displayName: 'Parallax Layers',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['parallax', 'layers', 'depth', '3d', 'scroll'],
    description: 'Multi-layer parallax effect with different scroll speeds per layer',
    previewImage: '/components/gsap/parallax-layers.png',
    props: [
      { name: 'layers', type: 'array', required: true, description: 'Array of layer objects with content and speed' },
      { name: 'height', type: 'string', required: false, default: '100vh', description: 'Section height' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-parallax-layers',
    level: 'effect',
    code: `import ParallaxLayers from '@/components/registry/gsap/parallax-layers'

<ParallaxLayers layers={[
  { content: "Background", speed: 0.2 },
  { content: "Midground", speed: 0.5 },
  { content: "Foreground", speed: 1.0 }
]} />`,
    suggestedWith: ['gsap-parallax', 'gsap-scroll-reveal'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    version: '1.0.0',
  },
  {
    id: 'gsap-scramble-text',
    name: 'ScrambleText',
    displayName: 'Scramble Text',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['scramble', 'text', 'decode', 'cipher', 'glitch'],
    description: 'Text scramble/decode animation that reveals text character by character',
    previewImage: '/components/gsap/scramble-text.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Text to scramble-reveal' },
      { name: 'duration', type: 'number', required: false, default: 1.5, description: 'Scramble duration' },
      { name: 'chars', type: 'string', required: false, default: '!<>-_\\/[]{}—=+*^?#', description: 'Scramble characters' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
    ],
    modulePath: 'gsap-scramble-text',
    level: 'effect',
    code: `import ScrambleText from '@/components/registry/gsap/scramble-text'

<ScrambleText text="Hello World" duration={1.5} />`,
    suggestedWith: ['gsap-typewriter', 'gsap-text-split'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/',
    version: '1.0.0',
  },
  {
    id: 'gsap-scroll-snap',
    name: 'ScrollSnap',
    displayName: 'Scroll Snap',
    source: 'gsap',
    categories: ['animation', 'layout'],
    tags: ['scroll', 'snap', 'sections', 'fullpage', 'pagination'],
    description: 'Full-page scroll snapping with smooth GSAP transitions between sections',
    previewImage: '/components/gsap/scroll-snap.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Section content' },
      { name: 'duration', type: 'number', required: false, default: 0.8, description: 'Snap transition duration' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-scroll-snap',
    level: 'layout',
    code: `import ScrollSnap from '@/components/registry/gsap/scroll-snap'

<ScrollSnap>
  <section>Section 1</section>
  <section>Section 2</section>
  <section>Section 3</section>
</ScrollSnap>`,
    suggestedWith: ['gsap-pin-section'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    version: '1.0.0',
  },
  {
    id: 'gsap-smooth-scroll',
    name: 'SmoothScroll',
    displayName: 'Smooth Scroll',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['smooth', 'scroll', 'lerp', 'inertia', 'butter'],
    description: 'Smooth scrolling wrapper that adds butter-smooth scroll behavior to content',
    previewImage: '/components/gsap/smooth-scroll.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Content to smooth scroll' },
      { name: 'speed', type: 'number', required: false, default: 1, description: 'Scroll speed multiplier' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-smooth-scroll',
    level: 'effect',
    code: `import SmoothScroll from '@/components/registry/gsap/smooth-scroll'

<SmoothScroll speed={1}>
  {children}
</SmoothScroll>`,
    suggestedWith: ['gsap-scroll-reveal', 'gsap-parallax'],
    docsUrl: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/',
    version: '1.0.0',
  },
  {
    id: 'gsap-split-screen',
    name: 'SplitScreen',
    displayName: 'Split Screen',
    source: 'gsap',
    categories: ['animation', 'layout'],
    tags: ['split', 'screen', 'two-panel', 'reveal', 'scroll'],
    description: 'Split screen layout with animated reveal on scroll',
    previewImage: '/components/gsap/split-screen.png',
    props: [
      { name: 'leftContent', type: 'children', required: true, description: 'Left panel content' },
      { name: 'rightContent', type: 'children', required: true, description: 'Right panel content' },
      { name: 'direction', type: 'select', required: false, default: 'horizontal', options: ['horizontal', 'vertical'] },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-split-screen',
    level: 'layout',
    code: `import SplitScreen from '@/components/registry/gsap/split-screen'

<SplitScreen
  leftContent={<div>Left Panel</div>}
  rightContent={<div>Right Panel</div>}
/>`,
    suggestedWith: ['gsap-scroll-reveal'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-stagger-reveal',
    name: 'StaggerReveal',
    displayName: 'Stagger Reveal',
    source: 'gsap',
    categories: ['animation', 'effect'],
    tags: ['stagger', 'reveal', 'cascade', 'entrance', 'sequential'],
    description: 'Staggered reveal animation for a group of elements on scroll',
    previewImage: '/components/gsap/stagger-reveal.png',
    props: [
      { name: 'children', type: 'children', required: true, description: 'Elements to stagger-reveal' },
      { name: 'stagger', type: 'number', required: false, default: 0.1, description: 'Delay between each element' },
      { name: 'animation', type: 'select', required: false, default: 'fadeUp', options: ['fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight', 'scale'] },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-stagger-reveal',
    level: 'effect',
    code: `import StaggerReveal from '@/components/registry/gsap/stagger-reveal'

<StaggerReveal stagger={0.1} animation="fadeUp">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerReveal>`,
    suggestedWith: ['gsap-scroll-reveal', 'gsap-stagger-cards'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
  {
    id: 'gsap-text-mask',
    name: 'TextMask',
    displayName: 'Text Mask',
    source: 'gsap',
    categories: ['animation', 'text'],
    tags: ['text', 'mask', 'clip', 'reveal', 'overlay'],
    description: 'Text reveal animation using a sliding mask/clip effect',
    previewImage: '/components/gsap/text-mask.png',
    props: [
      { name: 'text', type: 'string', required: true, description: 'Text to reveal with mask' },
      { name: 'direction', type: 'select', required: false, default: 'left', options: ['left', 'right', 'up', 'down'] },
      { name: 'duration', type: 'number', required: false, default: 1, description: 'Mask animation duration' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['gsap', '@gsap/react'],
    dependencyManifest: [
      { package: 'gsap', version: '^3.12.0' },
      { package: '@gsap/react', version: '^2.1.0' },
    ],
    modulePath: 'gsap-text-mask',
    level: 'effect',
    code: `import TextMask from '@/components/registry/gsap/text-mask'

<TextMask text="Revealed Text" direction="left" duration={1} />`,
    suggestedWith: ['gsap-reveal-text', 'gsap-text-split'],
    docsUrl: 'https://gsap.com/docs/v3/',
    version: '1.0.0',
  },
]
