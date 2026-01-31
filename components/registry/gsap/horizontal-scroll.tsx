'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface HorizontalScrollProps {
  className?: string
  children?: ReactNode
  panels?: { title: string; description: string; gradient: string }[]
}

const defaultPanels = [
  {
    title: 'Creative Vision',
    description: 'We turn abstract ideas into concrete visual stories.',
    gradient: 'from-indigo-600 to-blue-700',
  },
  {
    title: 'Precise Execution',
    description: 'Every pixel placed with intention, every interaction refined.',
    gradient: 'from-purple-600 to-violet-700',
  },
  {
    title: 'Scalable Systems',
    description: 'Architecture that grows with your ambition and user base.',
    gradient: 'from-pink-600 to-rose-700',
  },
  {
    title: 'Measurable Results',
    description: 'Data-driven outcomes that prove real business impact.',
    gradient: 'from-amber-600 to-orange-700',
  },
]

export default function HorizontalScroll({
  className,
  children,
  panels = defaultPanels,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const scrollableHeight = container.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight))
      const maxX = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -maxX * progress,
        duration: 0.3,
        ease: 'none',
        overwrite: 'auto',
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [panels.length])

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      style={{ height: `${panels.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full items-center">
          <div ref={trackRef} className="flex gap-8 pl-8 pr-[100vw] will-change-transform">
            {children ??
              panels.map((panel, i) => (
                <div
                  key={i}
                  className="flex h-[70vh] w-[80vw] shrink-0 flex-col justify-end rounded-3xl p-12 sm:w-[60vw] lg:w-[40vw]"
                  style={{ maxHeight: '500px' }}
                >
                  <div
                    className={cn(
                      'absolute inset-0 rounded-3xl bg-gradient-to-br opacity-20',
                      panel.gradient
                    )}
                    style={{ position: 'absolute' }}
                  />
                  <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/80 p-10 backdrop-blur-sm h-full flex flex-col justify-center">
                    <span className="mb-3 text-sm font-medium text-neutral-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-3xl font-bold text-white sm:text-4xl">
                      {panel.title}
                    </h3>
                    <p className="mt-4 text-lg text-neutral-400 max-w-md">
                      {panel.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-neutral-500">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          Scroll to explore
        </div>
      </div>
    </div>
  )
}
