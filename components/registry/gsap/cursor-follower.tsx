'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils/cn'

interface CursorFollowerProps {
  /** Diameter of the outer cursor ring in pixels */
  size?: number
  /** Color of the cursor elements (CSS color value) */
  color?: string
  /** Additional CSS class names */
  className?: string
  style?: React.CSSProperties
}

export default function CursorFollower({
  size = 40,
  color = '#818cf8',
  className,
  style,
}: CursorFollowerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const xToRing = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yToRing = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const xToDot = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yToDot = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const xToGlow = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yToGlow = useRef<ReturnType<typeof gsap.quickTo> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    const glow = glowRef.current
    if (!container || !ring || !dot || !glow) return

    // Set initial positions off-screen center
    gsap.set([ring, dot, glow], { xPercent: -50, yPercent: -50, x: 0, y: 0 })

    // Create quickTo instances for buttery smooth interpolation
    // Ring follows with a softer ease (slower)
    xToRing.current = gsap.quickTo(ring, 'x', { duration: 0.6, ease: 'power3.out' })
    yToRing.current = gsap.quickTo(ring, 'y', { duration: 0.6, ease: 'power3.out' })

    // Dot follows tightly (faster)
    xToDot.current = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' })
    yToDot.current = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' })

    // Glow follows with maximum lag for trailing effect
    xToGlow.current = gsap.quickTo(glow, 'x', { duration: 1.0, ease: 'power3.out' })
    yToGlow.current = gsap.quickTo(glow, 'y', { duration: 1.0, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      xToRing.current?.(x)
      yToRing.current?.(y)
      xToDot.current?.(x)
      yToDot.current?.(y)
      xToGlow.current?.(x)
      yToGlow.current?.(y)
    }

    const handleMouseEnter = () => {
      gsap.to(ring, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
      gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 })
      gsap.to(glow, { opacity: 1, duration: 0.4 })
    }

    const handleMouseLeave = () => {
      gsap.to(ring, { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.in' })
      gsap.to(dot, { opacity: 0, scale: 0.5, duration: 0.2 })
      gsap.to(glow, { opacity: 0, duration: 0.3 })
    }

    // Start hidden
    gsap.set([ring, dot, glow], { opacity: 0, scale: 0.5 })

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf([ring, dot, glow])
    }
  }, [])

  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">
          Cursor Follower
        </h2>
        <p className="mb-10 text-center text-neutral-400">
          Move your mouse over the area below
        </p>
        <div
          ref={containerRef}
          className="relative h-80 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 cursor-none"
        >
          {/* Glow trail */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute top-0 left-0 rounded-full blur-2xl"
            style={{
              width: size * 3.5,
              height: size * 3.5,
              backgroundColor: color,
              opacity: 0.15,
            }}
          />
          {/* Outer ring */}
          <div
            ref={ringRef}
            className="pointer-events-none absolute top-0 left-0 rounded-full border-2"
            style={{
              width: size,
              height: size,
              borderColor: color,
            }}
          />
          {/* Inner dot */}
          <div
            ref={dotRef}
            className="pointer-events-none absolute top-0 left-0 rounded-full bg-white"
            style={{
              width: size * 0.2,
              height: size * 0.2,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-neutral-600 text-sm select-none">
              Hover to interact
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
