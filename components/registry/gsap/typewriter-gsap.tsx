'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface TypewriterGsapProps {
  className?: string
  text?: string
  speed?: number
  delay?: number
  cursor?: boolean
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function TypewriterGsap({
  className,
  text = 'Building the future, one keystroke at a time.',
  speed = 0.05,
  delay = 0.5,
  cursor = true,
  tag: Tag = 'h2',
}: TypewriterGsapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
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
      if (!isVisible || !textRef.current) return

      const obj = { length: 0 }

      gsap.to(obj, {
        length: text.length,
        duration: text.length * speed,
        delay,
        ease: 'none',
        onUpdate: () => {
          if (textRef.current) {
            textRef.current.textContent = text.slice(0, Math.round(obj.length))
          }
        },
      })

      if (cursor && cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
        })
      }
    },
    { scope: containerRef, dependencies: [isVisible] }
  )

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6 text-center', className)}
    >
      <div className="mx-auto max-w-3xl">
        <div className="inline-flex items-baseline">
          <Tag
            ref={textRef as React.Ref<HTMLHeadingElement>}
            className="text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {'\u00A0'}
          </Tag>
          {cursor && (
            <span
              ref={cursorRef}
              className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.1em] bg-indigo-400"
            />
          )}
        </div>
        <p className="mt-6 text-lg text-neutral-400 max-w-xl mx-auto">
          A GSAP-powered typewriter effect that progressively reveals text
          character by character with an animated blinking cursor.
        </p>
      </div>
    </div>
  )
}
