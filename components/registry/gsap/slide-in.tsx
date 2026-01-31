'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface SlideInProps {
  className?: string
  children?: ReactNode
  direction?: 'left' | 'right' | 'top' | 'bottom'
  duration?: number
  delay?: number
  distance?: number
}

export default function SlideIn({
  className,
  children,
  direction = 'left',
  duration = 0.9,
  delay = 0,
  distance = 120,
}: SlideInProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      if (!isVisible || !containerRef.current) return

      const offsets: Record<string, { x: number; y: number }> = {
        left: { x: -distance, y: 0 },
        right: { x: distance, y: 0 },
        top: { x: 0, y: -distance },
        bottom: { x: 0, y: distance },
      }

      const { x, y } = offsets[direction]

      gsap.from(containerRef.current, {
        x,
        y,
        opacity: 0,
        duration,
        delay,
        ease: 'power4.out',
      })
    },
    { scope: containerRef, dependencies: [isVisible] }
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-hidden',
        !isVisible && 'opacity-0',
        className
      )}
    >
      {children ?? (
        <div className="w-full py-16 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-10 sm:flex-row sm:items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">
                  Slide In Animation
                </h3>
                <p className="mt-2 text-neutral-400">
                  Content slides in from the{' '}
                  <span className="font-medium text-indigo-400">
                    {direction}
                  </span>{' '}
                  with a smooth, powerful easing curve that feels natural.
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <div className="h-16 w-16 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <svg
                    className="h-7 w-7 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        direction === 'left'
                          ? 'M10 19l-7-7m0 0l7-7m-7 7h18'
                          : direction === 'right'
                          ? 'M14 5l7 7m0 0l-7 7m7-7H3'
                          : direction === 'top'
                          ? 'M5 10l7-7m0 0l7 7m-7-7v18'
                          : 'M19 14l-7 7m0 0l-7-7m7 7V3'
                      }
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
