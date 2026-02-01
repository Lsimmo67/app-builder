'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { CSSProperties, useMemo } from 'react'

const colors = [
  'bg-violet-400',
  'bg-fuchsia-400',
  'bg-cyan-400',
  'bg-indigo-400',
  'bg-purple-400',
]

export default function ParticleField({
  className,
  style,
  count = 50,
}: {
  className?: string
  style?: CSSProperties
  count?: number
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 40,
        dy: (Math.random() - 0.5) * 60,
      })),
    [count]
  )

  return (
    <motion.div
      className={cn(
        'relative w-full min-h-[300px] overflow-hidden rounded-2xl bg-black/40',
        className
      )}
      style={style}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={cn('absolute rounded-full', p.color)}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity * 0.5, p.opacity, 0],
            scale: [0.5, 1, 1.2, 1, 0.5],
            x: [0, p.dx * 0.5, p.dx, p.dx * 0.5, 0],
            y: [0, p.dy * 0.3, p.dy * 0.6, p.dy, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </motion.div>
  )
}
