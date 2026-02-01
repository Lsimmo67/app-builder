'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface SplitScreenProps {
  className?: string
  leftContent?: ReactNode
  rightContent?: ReactNode
  revealContent?: ReactNode
}

export default function SplitScreen({
  className,
  leftContent,
  rightContent,
  revealContent,
}: SplitScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !leftRef.current || !rightRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      // Slide left panel to the left
      tl.to(
        leftRef.current,
        {
          xPercent: -100,
          ease: 'none',
        },
        0
      )

      // Slide right panel to the right
      tl.to(
        rightRef.current,
        {
          xPercent: 100,
          ease: 'none',
        },
        0
      )

      // Fade in and scale up the reveal content behind
      if (revealRef.current) {
        tl.fromTo(
          revealRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
          },
          0
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-white">
          Split Screen Reveal
        </h2>

        <div className="relative h-96 overflow-hidden rounded-2xl border border-neutral-800">
          {/* Reveal content behind the panels */}
          <div
            ref={revealRef}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-0"
          >
            {revealContent ?? (
              <div className="text-center px-10">
                <h3 className="text-4xl font-black text-white">Hidden Content</h3>
                <p className="mt-3 text-lg text-white/80 max-w-md">
                  This content is revealed as the two panels slide apart on scroll.
                </p>
              </div>
            )}
          </div>

          {/* Left panel */}
          <div
            ref={leftRef}
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-indigo-950 to-neutral-950 flex items-center justify-center will-change-transform"
          >
            {leftContent ?? (
              <div className="p-10 text-left">
                <h3 className="text-3xl font-bold text-white">Left Panel</h3>
                <p className="mt-3 text-neutral-400">
                  Content slides out to the left with a smooth scroll-linked animation.
                </p>
                <div className="mt-6 h-1 w-16 rounded-full bg-indigo-500" />
              </div>
            )}
          </div>

          {/* Right panel */}
          <div
            ref={rightRef}
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-purple-950 to-neutral-950 flex items-center justify-center will-change-transform"
          >
            {rightContent ?? (
              <div className="p-10 text-left">
                <h3 className="text-3xl font-bold text-white">Right Panel</h3>
                <p className="mt-3 text-neutral-400">
                  The opposite panel mirrors the motion, revealing the content behind.
                </p>
                <div className="mt-6 h-1 w-16 rounded-full bg-purple-500" />
              </div>
            )}
          </div>

          {/* Center divider */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-neutral-700/50" />
        </div>
      </div>
    </div>
  )
}
