'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface ProgressScrollProps {
  className?: string
  children?: ReactNode
  barColor?: string
  barHeight?: number
  position?: 'top' | 'bottom'
}

export default function ProgressScroll({
  className,
  children,
  barColor = '#6366f1',
  barHeight = 4,
  position = 'top',
}: ProgressScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !barRef.current) return

      const section = containerRef.current

      const handleScroll = () => {
        const rect = section.getBoundingClientRect()
        const sectionHeight = section.offsetHeight
        const viewportHeight = window.innerHeight

        let progress = 0

        if (rect.top <= 0 && rect.bottom >= 0) {
          progress = Math.min(
            1,
            Math.abs(rect.top) / (sectionHeight - viewportHeight)
          )
        } else if (rect.top > 0) {
          progress = 0
        } else {
          progress = 1
        }

        gsap.set(barRef.current, {
          scaleX: progress,
        })
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()

      return () => window.removeEventListener('scroll', handleScroll)
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
    >
      {/* Progress bar */}
      <div
        className={cn(
          'sticky left-0 right-0 z-10',
          position === 'top' ? 'top-0' : 'bottom-0'
        )}
      >
        <div
          ref={barRef}
          className="origin-left"
          style={{
            height: barHeight,
            backgroundColor: barColor,
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {children ?? (
        <div className="w-full px-6 py-20">
          <div className="mx-auto max-w-2xl space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Scroll Progress Indicator
              </h2>
              <p className="mt-4 text-lg text-neutral-400">
                The bar at the {position} of this section tracks your scroll
                progress through the content below.
              </p>
            </div>

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8"
              >
                <h3 className="text-xl font-semibold text-white">
                  Section {i}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-400">
                  As you scroll through this content, the progress bar fills up
                  to indicate how far you have read. This pattern is commonly
                  used for long-form articles and documentation pages to give
                  readers a sense of their position within the content.
                </p>
                <p className="mt-3 leading-relaxed text-neutral-400">
                  The animation is driven by scroll position calculations
                  combined with GSAP for smooth, performant updates to the
                  progress bar width via scaleX transforms.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
