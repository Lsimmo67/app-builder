'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface CardItem {
  title: string
  description: string
  link?: string
}

interface CardHoverEffectProps {
  className?: string
  items?: CardItem[]
  columns?: number
}

const defaultItems: CardItem[] = [
  {
    title: 'Analytics',
    description:
      'Real-time analytics and insights to help you make data-driven decisions for your business.',
  },
  {
    title: 'Automation',
    description:
      'Streamline your workflows with intelligent automation that saves time and reduces errors.',
  },
  {
    title: 'Integration',
    description:
      'Connect with hundreds of tools and services to create a unified ecosystem.',
  },
  {
    title: 'Security',
    description:
      'Enterprise-grade security with end-to-end encryption and compliance certifications.',
  },
  {
    title: 'Scalability',
    description:
      'Infrastructure that grows with you, from startup to enterprise without missing a beat.',
  },
  {
    title: 'Support',
    description:
      'World-class support team available around the clock to help you succeed.',
  },
]

export default function CardHoverEffect({
  className,
  items = defaultItems,
  columns = 3,
}: CardHoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2',
        columns === 3 && 'lg:grid-cols-3',
        columns === 2 && 'lg:grid-cols-2',
        columns === 4 && 'lg:grid-cols-4',
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-2xl bg-neutral-200/[0.08]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-black p-6 transition-all duration-300 group-hover:border-white/[0.15]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
