'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface FlipCardProps {
  className?: string
  frontTitle?: string
  frontDescription?: string
  backTitle?: string
  backDescription?: string
  trigger?: 'click' | 'hover'
  duration?: number
}

export default function FlipCard({
  className,
  frontTitle = 'Hover to Flip',
  frontDescription = 'This card has a hidden back side with more content. Interact to reveal it.',
  backTitle = 'The Back Side',
  backDescription = 'You discovered the hidden content! This flip animation is powered by GSAP rotateY.',
  trigger = 'hover',
  duration = 0.6,
}: FlipCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const flip = (toFlipped: boolean) => {
    if (!cardRef.current) return
    setIsFlipped(toFlipped)

    gsap.to(cardRef.current, {
      rotateY: toFlipped ? 180 : 0,
      duration,
      ease: 'power2.inOut',
    })
  }

  const handleClick = () => {
    if (trigger === 'click') flip(!isFlipped)
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') flip(true)
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover') flip(false)
  }

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6', className)}
    >
      <div className="mx-auto max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          3D Flip Card
        </h2>
        <p className="mb-10 text-neutral-400">
          {trigger === 'hover' ? 'Hover over' : 'Click'} the card below to see the flip animation.
        </p>

        <div
          className="mx-auto"
          style={{ perspective: '1000px' }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={cardRef}
            className="relative h-72 w-full cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/80 p-8"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{frontTitle}</h3>
              <p className="mt-2 text-sm text-neutral-400">{frontDescription}</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 to-purple-950/80 p-8"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <svg
                  className="h-7 w-7 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{backTitle}</h3>
              <p className="mt-2 text-sm text-indigo-200/70">{backDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
