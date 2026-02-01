'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface StaggerRevealItem {
  label: string
  desc: string
}

interface StaggerRevealProps {
  className?: string
  children?: ReactNode
  items?: StaggerRevealItem[]
  columns?: number
  staggerAmount?: number
}

const defaultItems: StaggerRevealItem[] = [
  { label: 'Strategy', desc: 'Define the vision and roadmap' },
  { label: 'Design', desc: 'Craft beautiful interfaces' },
  { label: 'Develop', desc: 'Build with modern tools' },
  { label: 'Test', desc: 'Ensure quality at every step' },
  { label: 'Deploy', desc: 'Ship to production seamlessly' },
  { label: 'Iterate', desc: 'Improve based on feedback' },
]

export default function StaggerReveal({
  className,
  children,
  items = defaultItems,
  columns = 1,
  staggerAmount = 0.12,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll('.stagger-reveal-item')
      if (!cards?.length) return

      gsap.set(cards, { opacity: 0, y: 40 })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from(cards, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger: staggerAmount,
            ease: 'power3.out',
            clearProps: 'all',
          })
        },
      })
    },
    { scope: containerRef, dependencies: [staggerAmount, items] }
  )

  const gridClass =
    columns === 1
      ? 'space-y-4'
      : columns === 2
        ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
        : columns === 3
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
          : `grid gap-4`

  const gridStyle =
    columns > 3
      ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
      : undefined

  return (
    <div ref={containerRef} className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">
          Staggered Reveal
        </h2>
        <p className="mb-12 text-center text-neutral-400">
          Elements appear in sequence with cascading timing
        </p>

        {children ?? (
          <div className={gridClass} style={gridStyle}>
            {items.map((item, i) => (
              <div
                key={i}
                className="stagger-reveal-item flex items-center gap-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 opacity-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-sm font-bold text-indigo-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
