'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, animate, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface AnimatedBorderProps {
  className?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function AnimatedBorder({
  className,
  title = 'Animated Border',
  description = 'A card with a continuously rotating gradient border that catches the eye. Ideal for highlighting premium content.',
  children,
}: AnimatedBorderProps) {
  const angle = useMotionValue(0)

  useEffect(() => {
    const controls = animate(angle, 360, {
      duration: 4,
      repeat: Infinity,
      ease: 'linear' as const,
    })
    return controls.stop
  }, [angle])

  const borderGradient = useTransform(
    angle,
    (a) =>
      `conic-gradient(from ${a}deg, #8b5cf6, #06b6d4, #f43f5e, #eab308, #8b5cf6)`
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      whileHover={{ scale: 1.02 }}
      className={cn('relative rounded-2xl p-px', className)}
    >
      {/* Animated rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ background: borderGradient }}
      />

      {/* Outer glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-md"
        style={{ background: borderGradient }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.4 }}
      />

      {/* Inner card */}
      <motion.div
        className="relative rounded-[15px] bg-zinc-950 p-8"
        whileHover={{ backgroundColor: 'rgba(9,9,11,0.95)' }}
        transition={{ duration: 0.3 }}
      >
        {children ?? (
          <>
            <motion.div
              className="mb-3 inline-flex rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 px-3 py-1 text-xs font-medium text-violet-300"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Premium
            </motion.div>
            <motion.h3
              className="mb-2 text-xl font-bold text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="mb-4 text-sm leading-relaxed text-zinc-400"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {description}
            </motion.p>
            <div className="flex gap-2">
              {['bg-violet-500', 'bg-cyan-500', 'bg-rose-500'].map((color, i) => (
                <motion.span
                  key={color}
                  className={cn('inline-block h-2 w-2 rounded-full', color)}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring' as const, stiffness: 300 }}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
