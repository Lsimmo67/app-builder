'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface TextSplitProps {
  className?: string
  text?: string
  splitBy?: 'letter' | 'word'
  stagger?: number
  duration?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p'
}

export default function TextSplit({
  className,
  text = 'Animate Every Letter',
  splitBy = 'letter',
  stagger = 0.04,
  duration = 0.6,
  tag: Tag = 'h2',
}: TextSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const targets = containerRef.current?.querySelectorAll('.split-item')
      if (!targets?.length) return

      gsap.from(targets, {
        opacity: 0,
        y: 40,
        rotateX: -90,
        stagger,
        duration,
        ease: 'back.out(1.7)',
      })
    },
    { scope: containerRef }
  )

  const items =
    splitBy === 'letter'
      ? text.split('').map((char, i) => (
          <span
            key={i}
            className="split-item inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))
      : text.split(' ').map((word, i) => (
          <span key={i} className="split-item inline-block mr-[0.3em]">
            {word}
          </span>
        ))

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6 text-center', className)}
    >
      <Tag
        className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
        style={{ perspective: '600px' }}
      >
        {items}
      </Tag>
      <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto">
        Each {splitBy} animates in with a staggered reveal, creating a dynamic
        typographic entrance that draws attention to your headlines.
      </p>
    </div>
  )
}
