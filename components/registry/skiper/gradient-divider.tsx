'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface GradientDividerProps {
  className?: string
  variant?: 'simple' | 'glow' | 'dotted' | 'fade'
  gradient?: string
  height?: number
}

const lineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
}

export default function GradientDivider({
  className,
  variant = 'simple',
  gradient = 'from-transparent via-violet-500/50 to-transparent',
  height = 1,
}: GradientDividerProps) {
  if (variant === 'dotted') {
    return (
      <motion.div
        className={cn('flex w-full items-center justify-center py-4', className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="flex items-center gap-1">
          {Array.from({ length: 40 }, (_, i) => (
            <motion.div
              key={i}
              className="h-px w-2 rounded-full"
              style={{
                backgroundColor:
                  i < 15
                    ? 'rgba(139, 92, 246, 0.5)'
                    : i < 25
                      ? 'rgba(99, 102, 241, 0.5)'
                      : 'rgba(139, 92, 246, 0.5)',
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: Math.abs(i - 20) < 5 ? 0.6 : Math.abs(i - 20) < 10 ? 0.3 : 0.1, scaleX: 1 }}
              transition={{
                duration: 0.3,
                delay: Math.abs(i - 20) * 0.02,
                ease: 'easeOut' as const,
              }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  if (variant === 'glow') {
    return (
      <motion.div
        className={cn('relative w-full py-4', className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div
          className={cn(
            'absolute left-1/2 top-1/2 h-8 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r blur-xl',
            gradient
          )}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: 'easeOut' as const }}
          viewport={{ once: true }}
        />
        <motion.div
          className={cn('relative mx-auto w-full bg-gradient-to-r', gradient)}
          style={{ height: `${height}px` }}
          variants={lineReveal}
        />
      </motion.div>
    )
  }

  if (variant === 'fade') {
    return (
      <motion.div
        className={cn('relative w-full py-8', className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div
          className={cn('mx-auto w-full max-w-2xl bg-gradient-to-r', gradient)}
          style={{ height: `${height}px` }}
          variants={lineReveal}
        />
        {/* Decorative dots at center */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
          {[0.4, 0.6, 0.4].map((opacity, i) => (
            <motion.div
              key={i}
              className={cn('rounded-full bg-violet-500', i === 1 ? 'h-1.5 w-1.5' : 'h-1 w-1')}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity }}
              transition={{
                delay: 0.6 + i * 0.1,
                type: 'spring' as const,
                stiffness: 400,
                damping: 15,
              }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  // Simple variant
  return (
    <motion.div
      className={cn('w-full py-4', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        className={cn('mx-auto w-full bg-gradient-to-r', gradient)}
        style={{ height: `${height}px` }}
        variants={lineReveal}
      />
    </motion.div>
  )
}
