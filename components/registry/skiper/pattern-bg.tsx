'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { CSSProperties, ReactNode, useMemo } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.02,
    },
  },
}

export default function PatternBg({
  className,
  style,
  children,
  dotCount = 15,
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  dotCount?: number
}) {
  const dots = useMemo(
    () =>
      Array.from({ length: dotCount * dotCount }).map((_, i) => ({
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 3,
      })),
    [dotCount]
  )

  return (
    <motion.div
      className={cn('relative w-full min-h-[300px] rounded-2xl overflow-hidden bg-black', className)}
      style={style}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {dots.map((dot, i) => {
            const col = i % dotCount
            const row = Math.floor(i / dotCount)
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-violet-500/30"
                style={{
                  left: `${(col / dotCount) * 100}%`,
                  top: `${(row / dotCount) * 100}%`,
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: dot.duration,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: 'easeInOut' as const,
                }}
              />
            )
          })}
        </motion.div>
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '24px 24px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' as const }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      <div className="relative z-10 flex items-center justify-center h-full min-h-[300px] p-8 text-white">
        {children ?? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' as const }}
          >
            <h2 className="text-3xl font-bold mb-2">Pattern Background</h2>
            <p className="text-white/50">Animated dot matrix pattern with gradient overlay.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
