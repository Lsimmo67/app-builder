'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface ComparisonSectionProps {
  className?: string
  beforeTitle?: string
  afterTitle?: string
  beforeItems?: string[]
  afterItems?: string[]
}

const defaultBefore = ['Slow loading times', 'Complex setup', 'Limited customization', 'No dark mode']
const defaultAfter = ['Instant performance', 'One-click deploy', 'Fully customizable', 'Beautiful dark theme']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const listItemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 },
  },
}

export default function ComparisonSection({
  className,
  beforeTitle = 'Before',
  afterTitle = 'After',
  beforeItems = defaultBefore,
  afterItems = defaultAfter,
}: ComparisonSectionProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      className={cn(
        'mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 py-8 md:grid-cols-2',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Before card */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -3, borderColor: 'rgba(239,68,68,0.3)' }}
        transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
        className="group rounded-2xl border border-red-500/20 bg-red-950/10 p-6"
      >
        <motion.h3
          className="mb-4 text-lg font-bold text-red-400"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' as const }}
          viewport={{ once: true }}
        >
          {beforeTitle}
        </motion.h3>
        <motion.ul
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {beforeItems.map((item, i) => (
            <motion.li
              key={i}
              variants={listItemVariants}
              className="flex items-start gap-2 text-sm text-white/50"
            >
              <motion.span
                className="mt-0.5 text-red-400"
                variants={iconVariants}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.3, ease: 'easeOut' as const }}
                viewport={{ once: true }}
              >
                {item}
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* After card */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -3, borderColor: 'rgba(16,185,129,0.3)' }}
        transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
        className="group rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6"
      >
        <motion.h3
          className="mb-4 text-lg font-bold text-emerald-400"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' as const }}
          viewport={{ once: true }}
        >
          {afterTitle}
        </motion.h3>
        <motion.ul
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {afterItems.map((item, i) => (
            <motion.li
              key={i}
              variants={listItemVariants}
              className="flex items-start gap-2 text-sm text-white/70"
            >
              <motion.span
                className="mt-0.5 text-emerald-400"
                variants={iconVariants}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.3, ease: 'easeOut' as const }}
                viewport={{ once: true }}
              >
                {item}
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Animated divider between cards (visible on md+) */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.3), transparent)',
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
        viewport={{ once: true }}
      />
    </motion.div>
  )
}
