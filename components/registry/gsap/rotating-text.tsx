'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface RotatingTextProps {
  className?: string
  prefix?: string
  words?: string[]
  duration?: number
  pause?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p'
}

export default function RotatingText({
  className,
  prefix = 'We build',
  words = ['websites', 'products', 'experiences', 'platforms', 'the future'],
  duration = 0.5,
  pause = 2,
  tag: Tag = 'h2',
}: RotatingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const indexRef = useRef(0)

  useGSAP(
    () => {
      if (!wordRef.current) return

      const cycleWord = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.delayedCall(pause, cycleWord)
          },
        })

        // Rotate out current word
        tl.to(wordRef.current, {
          rotateX: -90,
          opacity: 0,
          duration,
          ease: 'power2.in',
          onComplete: () => {
            indexRef.current = (indexRef.current + 1) % words.length
            if (wordRef.current) {
              wordRef.current.textContent = words[indexRef.current]
            }
          },
        })

        // Rotate in new word
        tl.fromTo(
          wordRef.current,
          {
            rotateX: 90,
            opacity: 0,
          },
          {
            rotateX: 0,
            opacity: 1,
            duration,
            ease: 'power2.out',
          }
        )
      }

      gsap.delayedCall(pause, cycleWord)
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6 text-center', className)}
    >
      <div className="mx-auto max-w-3xl">
        <Tag
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          style={{ perspective: '600px' }}
        >
          {prefix}{' '}
          <span
            ref={wordRef}
            className="inline-block text-indigo-400"
            style={{ transformOrigin: 'center bottom' }}
          >
            {words[0]}
          </span>
        </Tag>
        <p className="mt-6 text-lg text-neutral-400 max-w-xl mx-auto">
          Rotating text that cycles through keywords with a smooth 3D rotation
          animation, perfect for hero headlines and dynamic taglines.
        </p>
      </div>
    </div>
  )
}
