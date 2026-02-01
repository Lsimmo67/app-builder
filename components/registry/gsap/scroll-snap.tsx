'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollSnapSection {
  title: string
  subtitle: string
  gradient: string
}

interface ScrollSnapProps {
  className?: string
  children?: ReactNode
  sections?: ScrollSnapSection[]
}

const defaultSections: ScrollSnapSection[] = [
  { title: 'Discover', subtitle: 'Explore new possibilities', gradient: 'from-indigo-600 to-indigo-900' },
  { title: 'Create', subtitle: 'Build something remarkable', gradient: 'from-purple-600 to-purple-900' },
  { title: 'Launch', subtitle: 'Ship with confidence', gradient: 'from-pink-600 to-pink-900' },
  { title: 'Scale', subtitle: 'Grow without limits', gradient: 'from-cyan-600 to-cyan-900' },
]

export default function ScrollSnap({
  className,
  children,
  sections = defaultSections,
}: ScrollSnapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !panelsRef.current) return

      const panels = panelsRef.current.querySelectorAll<HTMLElement>('.snap-panel')
      if (!panels.length) return

      const totalPanels = panels.length

      // Pin the container while we scroll through all panels
      // Each panel is "one page" worth of scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${(totalPanels - 1) * 100}%`,
          pin: true,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (totalPanels - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: 'power2.inOut',
          },
        },
      })

      // Animate each panel: fade/slide the current out, bring the next in
      panels.forEach((panel, i) => {
        if (i === 0) return // First panel is already visible

        // Fade out previous panel
        tl.to(
          panels[i - 1],
          {
            opacity: 0,
            scale: 0.92,
            duration: 0.5,
          },
          (i - 1) / (totalPanels - 1)
        )

        // Fade in current panel
        tl.fromTo(
          panel,
          {
            opacity: 0,
            scale: 1.08,
            yPercent: 10,
          },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            duration: 0.5,
          },
          (i - 1) / (totalPanels - 1)
        )
      })
    },
    { scope: containerRef, dependencies: [sections] }
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden', className)}
    >
      <div ref={panelsRef} className="relative h-full w-full">
        {children ??
          sections.map((section, i) => (
            <div
              key={i}
              className={cn(
                'snap-panel absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b',
                section.gradient,
                i > 0 && 'opacity-0'
              )}
            >
              <span className="mb-2 text-sm font-medium uppercase tracking-widest text-white/50">
                0{i + 1} / 0{sections.length}
              </span>
              <h2 className="text-5xl font-bold text-white">{section.title}</h2>
              <p className="mt-3 text-lg text-white/70">{section.subtitle}</p>
              <div className="mt-8 flex gap-2">
                {sections.map((_, j) => (
                  <div
                    key={j}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      j === i ? 'w-8 bg-white' : 'w-2 bg-white/30'
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
