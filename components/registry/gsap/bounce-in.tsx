'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface BounceInProps {
  className?: string
  children?: ReactNode
  duration?: number
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export default function BounceIn({
  className,
  children,
  duration = 1,
  delay = 0,
  direction = 'up',
  distance = 60,
}: BounceInProps) {
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
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      if (!isVisible || !containerRef.current) return

      const offsets: Record<string, { x: number; y: number }> = {
        up: { x: 0, y: distance },
        down: { x: 0, y: -distance },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
      }

      const { x, y } = offsets[direction]

      gsap.from(containerRef.current, {
        opacity: 0,
        x,
        y,
        duration,
        delay,
        ease: 'bounce.out',
      })
    },
    { scope: containerRef, dependencies: [isVisible] }
  )

  return (
    <div
      ref={containerRef}
      className={cn(!isVisible && 'opacity-0', className)}
    >
      {children ?? (
        <div className="w-full py-20 px-6">
          <div className="mx-auto max-w-lg">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-800 bg-neutral-900/50 p-10 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Bounce In</h3>
              <p className="mt-3 text-neutral-400">
                This element bounces in from the{' '}
                <span className="font-medium text-amber-400">{direction}</span>{' '}
                with a playful bounce easing when it enters the viewport.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
