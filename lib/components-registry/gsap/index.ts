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
]
