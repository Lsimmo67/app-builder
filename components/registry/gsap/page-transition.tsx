'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils/cn'

interface PageTransitionProps {
  /** Whether the transition overlay is active */
  isActive?: boolean
  /** Direction of the transition wipe */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Color of the transition overlay */
  color?: string
  /** Additional CSS class names */
  className?: string
  /** Content rendered behind/within the transition */
  children?: React.ReactNode
  /** Callback when the transition completes */
  onComplete?: () => void
  style?: React.CSSProperties
}

const pages = [
  { title: 'Home', bg: 'from-indigo-950 to-neutral-950', accent: 'bg-indigo-500' },
  { title: 'About', bg: 'from-purple-950 to-neutral-950', accent: 'bg-purple-500' },
  { title: 'Work', bg: 'from-pink-950 to-neutral-950', accent: 'bg-pink-500' },
]

export default function PageTransition({
  isActive,
  direction = 'up',
  color = '#ffffff',
  className,
  children,
  onComplete,
  style,
}: PageTransitionProps) {
  const [activePage, setActivePage] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Derive clipPath values based on direction
  const getClipPaths = useCallback(
    (dir: string) => {
      switch (dir) {
        case 'up':
          return {
            start: 'inset(100% 0% 0% 0%)',
            mid: 'inset(0% 0% 0% 0%)',
            end: 'inset(0% 0% 100% 0%)',
          }
        case 'down':
          return {
            start: 'inset(0% 0% 100% 0%)',
            mid: 'inset(0% 0% 0% 0%)',
            end: 'inset(100% 0% 0% 0%)',
          }
        case 'left':
          return {
            start: 'inset(0% 0% 0% 100%)',
            mid: 'inset(0% 0% 0% 0%)',
            end: 'inset(0% 100% 0% 0%)',
          }
        case 'right':
          return {
            start: 'inset(0% 100% 0% 0%)',
            mid: 'inset(0% 0% 0% 0%)',
            end: 'inset(0% 0% 0% 100%)',
          }
        default:
          return {
            start: 'inset(100% 0% 0% 0%)',
            mid: 'inset(0% 0% 0% 0%)',
            end: 'inset(0% 0% 100% 0%)',
          }
      }
    },
    []
  )

  const navigate = useCallback(
    (idx: number) => {
      if (idx === activePage || transitioning) return
      setTransitioning(true)

      const overlay = overlayRef.current
      const content = contentRef.current
      if (!overlay || !content) return

      const clips = getClipPaths(direction)

      // Kill any existing timeline
      if (tlRef.current) tlRef.current.kill()

      const tl = gsap.timeline({
        onComplete: () => {
          setTransitioning(false)
          onComplete?.()
        },
      })
      tlRef.current = tl

      // Phase 1: Wipe overlay in
      tl.fromTo(
        overlay,
        { clipPath: clips.start, visibility: 'visible' },
        { clipPath: clips.mid, duration: 0.45, ease: 'power3.inOut' }
      )

      // Phase 2: Fade out current content while overlay covers
      tl.to(
        content,
        { opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in' },
        '-=0.15'
      )

      // Switch page at the midpoint
      tl.call(() => setActivePage(idx))

      // Phase 3: Wipe overlay out
      tl.to(overlay, {
        clipPath: clips.end,
        duration: 0.45,
        ease: 'power3.inOut',
      })

      // Phase 4: Fade in new content
      tl.to(
        content,
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.3'
      )

      // Reset overlay visibility
      tl.set(overlay, { visibility: 'hidden' })
    },
    [activePage, transitioning, direction, getClipPaths, onComplete]
  )

  // Handle external isActive prop
  useEffect(() => {
    if (isActive === undefined) return
    const overlay = overlayRef.current
    if (!overlay) return

    const clips = getClipPaths(direction)

    if (isActive) {
      gsap.fromTo(
        overlay,
        { clipPath: clips.start, visibility: 'visible' },
        {
          clipPath: clips.mid,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete,
        }
      )
    } else {
      gsap.to(overlay, {
        clipPath: clips.end,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden' })
          onComplete?.()
        },
      })
    }
  }, [isActive, direction, getClipPaths, onComplete])

  // Cleanup
  useEffect(() => {
    return () => {
      if (tlRef.current) tlRef.current.kill()
    }
  }, [])

  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">
          Page Transitions
        </h2>
        <p className="mb-10 text-center text-neutral-400">
          Click navigation to trigger GSAP-powered transitions
        </p>
        <div className="relative h-72 overflow-hidden rounded-2xl border border-neutral-800">
          {/* Page content */}
          <div
            ref={contentRef}
            className={cn(
              'absolute inset-0 bg-gradient-to-br flex items-center justify-center',
              pages[activePage].bg
            )}
          >
            <div className="text-center">
              <div
                className={cn(
                  'mx-auto mb-4 h-3 w-16 rounded-full',
                  pages[activePage].accent
                )}
              />
              <h3 className="text-4xl font-bold text-white">
                {pages[activePage].title}
              </h3>
              <p className="mt-2 text-neutral-500">Page content goes here</p>
            </div>
            {children}
          </div>

          {/* Transition overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0"
            style={{
              backgroundColor: color,
              visibility: 'hidden',
              clipPath: 'inset(100% 0% 0% 0%)',
            }}
          />
        </div>
        <div className="mt-6 flex justify-center gap-3">
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              className={cn(
                'rounded-lg px-5 py-2 text-sm font-medium transition-colors',
                i === activePage
                  ? 'bg-white text-neutral-900'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              )}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
