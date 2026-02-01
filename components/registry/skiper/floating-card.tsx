'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface FloatingCardProps {
  className?: string
  title?: string
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const floatAnimation = {
  y: [-4, 4, -4],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

const shadowAnimation = {
  boxShadow: [
    '0 10px 30px -10px rgba(0,0,0,0.3)',
    '0 20px 40px -10px rgba(0,0,0,0.4)',
    '0 10px 30px -10px rgba(0,0,0,0.3)',
  ],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

export default function FloatingCard({
  className,
  title = 'Floating Card',
  description = 'Hover over this card to see it gently lift off the surface with an enhanced shadow, creating a sense of depth and interactivity.',
  icon,
  children,
}: FloatingCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      animate={floatAnimation}
      whileHover={{
        y: -12,
        scale: 1.02,
        boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)',
        borderColor: 'rgba(63,63,70,1)',
      }}
      transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
      className={cn(
        'group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-8',
        'shadow-lg shadow-black/20 cursor-pointer',
        className
      )}
    >
      {/* Floating shadow underneath */}
      <motion.div
        className="pointer-events-none absolute -bottom-4 left-4 right-4 h-8 rounded-full bg-black/30 blur-xl"
        animate={shadowAnimation}
      />

      {children ?? (
        <>
          <motion.div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-400"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: 'spring' as const, stiffness: 300 }}
          >
            {icon ?? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            )}
          </motion.div>
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-zinc-400">{description}</p>
          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-violet-400"
            whileHover={{ x: 4, color: '#c4b5fd' }}
            transition={{ type: 'spring' as const, stiffness: 300 }}
          >
            <span>Learn more</span>
            <motion.svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
