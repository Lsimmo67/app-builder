'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperHoverBlurEffectProps {
  items?: { title: string; description: string; color: string }[]
  blurAmount?: number
  className?: string
}

const defaultItems = [
  { title: 'Design', description: 'User-centered creative solutions', color: '#6366f1' },
  { title: 'Develop', description: 'Scalable and modern architecture', color: '#ec4899' },
  { title: 'Deploy', description: 'Reliable cloud infrastructure', color: '#14b8a6' },
  { title: 'Optimize', description: 'Performance and accessibility', color: '#f59e0b' },
]

export default function SkiperHoverBlurEffect({
  items = defaultItems,
  blurAmount = 4,
  className,
}: SkiperHoverBlurEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn('flex w-full items-center justify-center gap-4 p-8', className)}>
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

        return (
          <motion.div
            key={index}
            className="relative w-[240px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-6"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              filter: isOtherHovered ? `blur(${blurAmount}px)` : 'blur(0px)',
              opacity: isOtherHovered ? 0.5 : 1,
              scale: isHovered ? 1.05 : isOtherHovered ? 0.97 : 1,
              y: isHovered ? -8 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Glow top border */}
            <motion.div
              className="absolute left-0 right-0 top-0 h-px"
              style={{ backgroundColor: item.color }}
              animate={{
                opacity: isHovered ? 1 : 0.3,
                scaleX: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Background glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${item.color}15 0%, transparent 70%)`,
              }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-lg"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
                animate={{ rotate: isHovered ? 5 : 0, scale: isHovered ? 1.1 : 1 }}
                transition={{ type: 'spring' }}
              >
                &#9670;
              </motion.div>
              <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-white/50">{item.description}</p>

              {/* Expand arrow */}
              <motion.div
                className="mt-4 flex items-center gap-1 text-sm font-medium"
                style={{ color: item.color }}
                animate={{
                  x: isHovered ? 5 : 0,
                  opacity: isHovered ? 1 : 0.5,
                }}
              >
                <span>Explore</span>
                <span>&#8594;</span>
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
