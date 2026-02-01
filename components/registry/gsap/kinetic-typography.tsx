'use client'

import { useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils/cn'

gsap.registerPlugin(ScrollTrigger)

interface KineticTypographyProps {
  /** The text to animate character by character */
  text?: string
  /** Additional CSS class names */
  className?: string
  style?: React.CSSProperties
}

export default function KineticTypography({
  text = 'Create Design Animate Inspire',
  className,
  style,
}: KineticTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  // Split text into characters, preserving spaces as visible gaps
  const characters = useMemo(() => {
    return text.split('').map((char, i) => ({
      char,
      isSpace: char === ' ',
      key: `${char}-${i}`,
    }))
  }, [text])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const charEls = charsRef.current.filter(Boolean)
      if (charEls.length === 0) return

      // Set initial state: characters start offset and invisible
      gsap.set(charEls, {
        opacity: 0,
        y: 80,
        rotateX: -90,
        scale: 0.5,
        transformOrigin: '50% 50%',
      })

      // Create a ScrollTrigger-driven staggered reveal
      gsap.to(charEls, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: {
          each: 0.04,
          from: 'start',
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        },
      })

      // After reveal, add a subtle wave animation that repeats
      const waveTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          toggleActions: 'play pause resume pause',
        },
        delay: characters.length * 0.04 + 0.8,
        repeat: -1,
        repeatDelay: 2,
      })

      waveTl.to(charEls, {
        y: -15,
        color: '#a78bfa',
        duration: 0.4,
        ease: 'sine.out',
        stagger: {
          each: 0.03,
          from: 'start',
        },
      })
      waveTl.to(charEls, {
        y: 0,
        color: '#ffffff',
        duration: 0.6,
        ease: 'sine.inOut',
        stagger: {
          each: 0.03,
          from: 'start',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [text, characters.length])

  const tags = ['Bold', 'Fluid', 'Expressive']

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-24 px-6 overflow-hidden', className)}
      style={style}
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="relative flex flex-wrap items-center justify-center gap-x-0 gap-y-2 min-h-[10rem]">
          {characters.map((item, i) => (
            <span
              key={item.key}
              ref={(el) => {
                if (el) charsRef.current[i] = el
              }}
              className={cn(
                'inline-block text-6xl sm:text-8xl font-black tracking-tighter text-white',
                item.isSpace && 'w-[0.3em]'
              )}
              style={{ perspective: '600px' }}
            >
              {item.isSpace ? '\u00A0' : item.char}
            </span>
          ))}
        </div>
        <p className="mt-8 text-lg text-neutral-400 max-w-xl mx-auto">
          Kinetic typography brings words to life through motion, scale, and rhythm.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-700 bg-neutral-900/60 px-4 py-1.5 text-xs text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
