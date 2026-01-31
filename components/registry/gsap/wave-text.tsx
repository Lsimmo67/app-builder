'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface WaveTextProps {
  className?: string
  text?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p'
  waveHeight?: number
  stagger?: number
  duration?: number
  repeat?: boolean
}

export default function WaveText({
  className,
  text = 'Wave Animation',
  tag: Tag = 'h2',
  waveHeight = 20,
  stagger = 0.05,
  duration = 0.4,
  repeat = true,
}: WaveTextProps) {
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

      const chars = containerRef.current.querySelectorAll('.wave-char')
      if (!chars.length) return

      gsap.to(chars, {
        y: -waveHeight,
        duration,
        stagger: {
          each: stagger,
          repeat: repeat ? -1 : 0,
          repeatDelay: 1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      })
    },
    { scope: containerRef, dependencies: [isVisible] }
  )

  const characters = text.split('').map((char, i) => (
    <span
      key={i}
      className="wave-char inline-block"
      style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6 text-center', className)}
    >
      <div className="mx-auto max-w-3xl">
        <Tag className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {characters}
        </Tag>
        <p className="mt-6 text-lg text-neutral-400 max-w-xl mx-auto">
          Each character performs a sequential wave motion, creating a fluid
          ripple effect across the text. The animation{' '}
          {repeat ? 'loops continuously' : 'plays once'} with smooth sine
          easing.
        </p>
      </div>
    </div>
  )
}
