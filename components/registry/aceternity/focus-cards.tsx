'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface FocusCard {
  title: string
  description: string
  gradient: string
  icon: string
}

interface FocusCardsProps {
  className?: string
  cards?: FocusCard[]
}

const defaultCards: FocusCard[] = [
  {
    title: 'Design Systems',
    description: 'Build consistent, scalable UI with reusable components and shared design tokens.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
  },
  {
    title: 'Performance',
    description: 'Optimize load times and runtime efficiency for a silky-smooth user experience.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
  {
    title: 'Accessibility',
    description: 'Make your product usable by everyone with WCAG-compliant components and patterns.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Security',
    description: 'Enterprise-grade security with end-to-end encryption and audit logging built in.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
]

export default function FocusCards({
  className,
  cards = defaultCards,
}: FocusCardsProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-2',
        className
      )}
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-950 p-8"
          onMouseEnter={() => setFocusedIndex(idx)}
          onMouseLeave={() => setFocusedIndex(null)}
          animate={{
            opacity: focusedIndex === null || focusedIndex === idx ? 1 : 0.4,
            scale: focusedIndex === idx ? 1.02 : 1,
            filter:
              focusedIndex !== null && focusedIndex !== idx
                ? 'blur(2px)'
                : 'blur(0px)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Gradient background on hover */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100',
              card.gradient
            )}
          />

          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
              <svg
                className="h-6 w-6 text-white/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-bold text-white">{card.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              {card.description}
            </p>

            {/* Arrow indicator */}
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/40 transition-colors duration-300 group-hover:text-white/80">
              <span>Learn more</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
