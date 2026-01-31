'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface Card {
  title: string
  description: string
  icon: string
}

interface StaggerCardsProps {
  className?: string
  cards?: Card[]
  stagger?: number
  duration?: number
}

const defaultCards: Card[] = [
  {
    title: 'Lightning Fast',
    description:
      'Optimized performance that loads in milliseconds, keeping your users engaged.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Fully Responsive',
    description:
      'Pixel-perfect layouts that adapt beautifully to any screen size or device.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    title: 'Secure by Default',
    description:
      'Enterprise-grade security baked in from the ground up to protect your data.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    title: 'Easy Integration',
    description:
      'Drop-in components that work seamlessly with your existing tech stack.',
    icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  },
  {
    title: 'Analytics Built-In',
    description:
      'Track user behavior and measure performance with comprehensive dashboards.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    title: '24/7 Support',
    description:
      'Round-the-clock expert support to help you whenever you need it most.',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
]

export default function StaggerCards({
  className,
  cards = defaultCards,
  stagger = 0.12,
  duration = 0.7,
}: StaggerCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = containerRef.current?.querySelectorAll('.stagger-card')
      if (!items?.length) return

      gsap.from(items, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger,
        duration,
        ease: 'power3.out',
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6', className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Everything You Need
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            A comprehensive toolkit designed to help you build, ship, and scale
            with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="stagger-card group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7 transition-colors hover:border-neutral-700 hover:bg-neutral-900/80"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={card.icon}
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
