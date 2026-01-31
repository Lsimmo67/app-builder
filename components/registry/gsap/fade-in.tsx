'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface FadeInProps {
  className?: string
  children?: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  delay?: number
  distance?: number
}

export default function FadeIn({
  className,
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance = 40,
}: FadeInProps) {
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
        ease: 'power3.out',
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
        <div className="w-full py-16 px-6">
          <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900/50 p-10 text-center">
            <h3 className="text-2xl font-bold text-white">Fade In Content</h3>
            <p className="mt-3 text-neutral-400">
              This element fades in from the{' '}
              <span className="font-medium text-indigo-400">{direction}</span>{' '}
              direction with a smooth GSAP animation triggered on scroll.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
