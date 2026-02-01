'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, animate, useTransform } from 'framer-motion'
import { useEffect, CSSProperties, ReactNode } from 'react'

export default function GradientCard({
  className,
  style,
  children,
  title = 'Gradient Card',
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: string
}) {
  const angle = useMotionValue(0)

  useEffect(() => {
    const controls = animate(angle, 360, {
      duration: 4,
      repeat: Infinity,
      ease: 'linear' as const,
    })
    return controls.stop
  }, [angle])

  const conicGradient = useTransform(
    angle,
    (a) => `conic-gradient(from ${a}deg, #7c3aed, #06b6d4, #f43f5e, #eab308, #7c3aed)`
  )

  const glowGradient = useTransform(
    angle,
    (a) => `conic-gradient(from ${a}deg, #7c3aed88, #06b6d488, #f43f5e88, #eab30888, #7c3aed88)`
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className={cn('relative p-[2px] rounded-2xl overflow-hidden group cursor-pointer', className)}
      style={style}
    >
      {/* Rotating conic gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ background: conicGradient }}
      />

      {/* Outer glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 blur-xl group-hover:opacity-60"
        style={{ background: glowGradient }}
        transition={{ duration: 0.4 }}
      />

      {/* Inner card content */}
      <motion.div
        className="relative rounded-[14px] bg-black/90 backdrop-blur-xl p-6 h-full"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3
          className="text-lg font-semibold text-white mb-2"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {title}
        </motion.h3>
        <motion.div
          className="text-white/60 text-sm"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {children ?? 'A beautiful card with an animated gradient border that rotates continuously.'}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
