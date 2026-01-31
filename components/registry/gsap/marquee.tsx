'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface MarqueeProps {
  className?: string
  children?: ReactNode
  items?: string[]
  speed?: number
  direction?: 'left' | 'right'
  separator?: string
}

const defaultItems = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'GSAP',
  'Framer Motion',
  'Vercel',
  'Figma',
]

export default function Marquee({
  className,
  children,
  items = defaultItems,
  speed = 30,
  direction = 'left',
  separator = '\u2022',
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track) return

      const inner = track.querySelector('.marquee-inner') as HTMLElement
      if (!inner) return

      const width = inner.offsetWidth

      gsap.to(track, {
        x: direction === 'left' ? -width : width,
        duration: width / (speed * 10),
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x: string) => {
            const val = parseFloat(x) % width
            return `${direction === 'left' ? val : -Math.abs(val)}px`
          },
        },
      })
    },
    { scope: containerRef }
  )

  const content =
    children ??
    items.map((item, i) => (
      <span key={i} className="flex items-center gap-8">
        <span className="whitespace-nowrap text-3xl font-bold text-white sm:text-5xl">
          {item}
        </span>
        <span className="text-2xl text-neutral-600">{separator}</span>
      </span>
    ))

  return (
    <div
      ref={containerRef}
      className={cn('w-full overflow-hidden py-16', className)}
    >
      <div ref={trackRef} className="flex">
        <div className="marquee-inner flex shrink-0 items-center gap-8">
          {content}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  )
}
