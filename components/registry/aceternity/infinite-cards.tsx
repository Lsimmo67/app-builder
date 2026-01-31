'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface TestimonialCard {
  quote: string
  name: string
  title: string
  avatar?: string
}

interface InfiniteCardsProps {
  className?: string
  items?: TestimonialCard[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
}

const defaultItems: TestimonialCard[] = [
  {
    quote:
      'This product has completely transformed how we work. The attention to detail is remarkable.',
    name: 'Sarah Chen',
    title: 'CTO at TechCorp',
  },
  {
    quote:
      'I have never seen anything like this before. Absolutely revolutionary approach to design systems.',
    name: 'Michael Roberts',
    title: 'Design Lead at Figma',
  },
  {
    quote:
      'The performance improvements are incredible. Our load times dropped by 60% overnight.',
    name: 'Emily Zhang',
    title: 'Engineering Manager at Vercel',
  },
  {
    quote:
      'Beautifully crafted, thoughtfully designed, and incredibly powerful. A must-have tool.',
    name: 'David Park',
    title: 'Founder of StartupXYZ',
  },
  {
    quote:
      'Our team productivity doubled after we started using this platform. Simply outstanding.',
    name: 'Lisa Thompson',
    title: 'VP of Engineering at Scale',
  },
]

export default function InfiniteCards({
  className,
  items = defaultItems,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
}: InfiniteCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (scrollerRef.current && containerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)
      scrollerContent.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement
        scrollerRef.current?.appendChild(clone)
      })

      setStart(true)
    }
  }, [])

  const speedMap = {
    fast: '20s',
    normal: '40s',
    slow: '80s',
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={
          start
            ? ({
                animation: `scroll ${speedMap[speed]} linear infinite`,
                animationDirection:
                  direction === 'right' ? 'reverse' : 'normal',
              } as React.CSSProperties)
            : undefined
        }
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="relative w-[350px] max-w-full flex-shrink-0 rounded-2xl border border-white/[0.1] bg-gradient-to-br from-neutral-900 to-neutral-950 px-8 py-6 md:w-[450px]"
          >
            <blockquote>
              <div className="relative z-20 text-sm leading-relaxed text-neutral-300">
                &ldquo;{item.quote}&rdquo;
              </div>
              <div className="relative z-20 mt-6 flex items-center gap-3">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-sm font-bold text-white">
                    {item.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-neutral-200">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-500">{item.title}</p>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>

      {/* Keyframe injection */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
