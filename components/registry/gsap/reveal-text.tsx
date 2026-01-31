'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface RevealTextProps {
  className?: string
  text?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p'
  direction?: 'left' | 'right' | 'top' | 'bottom'
  duration?: number
  delay?: number
}

export default function RevealText({
  className,
  text = 'Reveal the Hidden Message',
  tag: Tag = 'h2',
  direction = 'left',
  duration = 1,
  delay = 0,
}: RevealTextProps) {
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

      const textEl = containerRef.current.querySelector('.reveal-text')
      if (!textEl) return

      const clipPaths: Record<string, { from: string; to: string }> = {
        left: {
          from: 'inset(0 100% 0 0)',
          to: 'inset(0 0% 0 0)',
        },
        right: {
          from: 'inset(0 0 0 100%)',
          to: 'inset(0 0 0 0%)',
        },
        top: {
          from: 'inset(0 0 100% 0)',
          to: 'inset(0 0 0% 0)',
        },
        bottom: {
          from: 'inset(100% 0 0 0)',
          to: 'inset(0% 0 0 0)',
        },
      }

      const { from, to } = clipPaths[direction]

      gsap.from(textEl, {
        clipPath: from,
        duration,
        delay,
        ease: 'power4.inOut',
        onStart: () => {
          gsap.set(textEl, { clipPath: from })
        },
      })

      gsap.to(textEl, {
        clipPath: to,
        duration,
        delay,
        ease: 'power4.inOut',
      })
    },
    { scope: containerRef, dependencies: [isVisible] }
  )

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6 text-center', className)}
    >
      <div className="mx-auto max-w-3xl">
        <Tag
          className="reveal-text text-4xl font-bold tracking-tight text-white sm:text-6xl"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          {text}
        </Tag>
        <p className="mt-6 text-lg text-neutral-400 max-w-xl mx-auto">
          Text revealed with a smooth clip-path animation sliding from the{' '}
          <span className="font-medium text-indigo-400">{direction}</span>,
          creating a cinematic unveil effect.
        </p>
      </div>
    </div>
  )
}
