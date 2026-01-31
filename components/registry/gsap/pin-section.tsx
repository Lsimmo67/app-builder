'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface PinSectionProps {
  className?: string
  children?: ReactNode
  items?: { title: string; description: string; color: string }[]
}

const defaultItems = [
  {
    title: 'Step 1: Discover',
    description:
      'We analyze your goals, audience, and competitive landscape to build a clear strategy.',
    color: 'from-indigo-500/20 to-indigo-500/0',
  },
  {
    title: 'Step 2: Design',
    description:
      'Our team crafts pixel-perfect interfaces with attention to every detail.',
    color: 'from-purple-500/20 to-purple-500/0',
  },
  {
    title: 'Step 3: Develop',
    description:
      'Clean, performant code brings the designs to life with smooth interactions.',
    color: 'from-pink-500/20 to-pink-500/0',
  },
  {
    title: 'Step 4: Deploy',
    description:
      'We launch your project and provide ongoing support to ensure success.',
    color: 'from-amber-500/20 to-amber-500/0',
  },
]

export default function PinSection({
  className,
  children,
  items = defaultItems,
}: PinSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight))
      )
      const index = Math.min(
        items.length - 1,
        Math.floor(progress * items.length)
      )
      setActiveIndex(index)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items.length])

  useGSAP(
    () => {
      const panels = containerRef.current?.querySelectorAll('.pin-panel')
      if (!panels?.length) return

      panels.forEach((panel, i) => {
        if (i === activeIndex) {
          gsap.to(panel, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          })
        } else {
          gsap.to(panel, {
            opacity: 0,
            y: i < activeIndex ? -30 : 30,
            scale: 0.97,
            duration: 0.4,
            ease: 'power2.in',
          })
        }
      })
    },
    { scope: containerRef, dependencies: [activeIndex] }
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="w-full px-6">
          <div className="mx-auto max-w-4xl">
            {/* Progress indicator */}
            <div className="mb-10 flex justify-center gap-2">
              {items.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500',
                    i === activeIndex
                      ? 'w-10 bg-indigo-500'
                      : 'w-4 bg-neutral-700'
                  )}
                />
              ))}
            </div>

            {/* Panels */}
            <div className="relative min-h-[300px]">
              {children ??
                items.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      'pin-panel absolute inset-0 flex flex-col items-center justify-center text-center',
                      i !== activeIndex && 'pointer-events-none'
                    )}
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <div
                      className={cn(
                        'absolute inset-0 rounded-3xl bg-gradient-to-b',
                        item.color
                      )}
                    />
                    <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/70 p-12 backdrop-blur-sm">
                      <span className="mb-4 inline-block rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-indigo-400">
                        {`${i + 1} of ${items.length}`}
                      </span>
                      <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        {item.title}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-neutral-400 max-w-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
