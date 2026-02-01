'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { CSSProperties, ReactNode } from 'react'

const leftVariants = {
  hidden: { opacity: 0, x: -60, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 0.7,
      ease: 'easeOut' as const,
      clipPath: { duration: 0.9, ease: 'easeInOut' as const },
    },
  },
}

const rightVariants = {
  hidden: { opacity: 0, x: 60, clipPath: 'inset(0 0 0 100%)' },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: 'inset(0 0 0 0%)',
    transition: {
      duration: 0.7,
      ease: 'easeOut' as const,
      delay: 0.15,
      clipPath: { duration: 0.9, ease: 'easeInOut' as const, delay: 0.15 },
    },
  },
}

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
      staggerChildren: 0.12,
    },
  },
}

const childVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

export default function SplitSection({
  className,
  style,
  left,
  right,
}: {
  className?: string
  style?: CSSProperties
  left?: ReactNode
  right?: ReactNode
}) {
  return (
    <div
      className={cn('w-full grid grid-cols-1 md:grid-cols-2 min-h-[400px]', className)}
      style={style}
    >
      <motion.div
        className="relative flex items-center justify-center p-10 bg-gradient-to-br from-violet-950 to-black overflow-hidden"
        variants={leftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
        <motion.div
          className="relative z-10 text-white"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {left ?? (
            <div>
              <motion.h2 className="text-3xl font-bold mb-3" variants={childVariant}>
                Left Side
              </motion.h2>
              <motion.p className="text-white/50 max-w-sm" variants={childVariant}>
                Content on the left half of the split section with a purple gradient.
              </motion.p>
            </div>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        className="relative flex items-center justify-center p-10 bg-gradient-to-bl from-cyan-950 to-black overflow-hidden"
        variants={rightVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.15),transparent_70%)]" />
        <motion.div
          className="relative z-10 text-white"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {right ?? (
            <div>
              <motion.h2 className="text-3xl font-bold mb-3" variants={childVariant}>
                Right Side
              </motion.h2>
              <motion.p className="text-white/50 max-w-sm" variants={childVariant}>
                Content on the right half of the split section with a cyan gradient.
              </motion.p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
