'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface ParallaxSectionProps {
  className?: string
  children?: ReactNode
  speed?: number
  backgroundImage?: string
}

export default function ParallaxSection({
  className,
  children,
  speed = 0.3,
  backgroundImage,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!bgRef.current || !containerRef.current) return

      const handleScroll = () => {
        const rect = containerRef.current!.getBoundingClientRect()
        const scrolled = -rect.top * speed
        gsap.to(bgRef.current, {
          y: scrolled,
          duration: 0.3,
          ease: 'none',
          overwrite: 'auto',
        })
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden', className)}
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] -bottom-[20%] will-change-transform"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : undefined
        }
      >
        {!backgroundImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-neutral-950">
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: `${4 + (i % 6) * 3}px`,
                    height: `${4 + (i % 6) * 3}px`,
                    top: `${(i * 17) % 100}%`,
                    left: `${(i * 23) % 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 py-32 px-6">
        {children ?? (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Parallax Depth Effect
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              The background moves at a different speed than the foreground
              content as you scroll, creating an immersive sense of depth and
              dimension on your page.
            </p>
            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm">
              Scroll to experience the effect
              <svg
                className="h-4 w-4 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
