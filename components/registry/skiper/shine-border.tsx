'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, animate, useTransform } from 'framer-motion'
import { useEffect, CSSProperties, ReactNode } from 'react'

export default function ShineBorder({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  const shineAngle = useMotionValue(0)

  useEffect(() => {
    const controls = animate(shineAngle, 360, {
      duration: 3,
      repeat: Infinity,
      ease: 'linear' as const,
    })
    return controls.stop
  }, [shineAngle])

  const shineGradient = useTransform(
    shineAngle,
    (angle) =>
      `conic-gradient(from ${angle}deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(139,92,246,0.6) 90deg, rgba(6,182,212,0.4) 120deg, transparent 150deg, transparent 360deg)`
  )

  const outerGlow = useTransform(
    shineAngle,
    (angle) =>
      `conic-gradient(from ${angle}deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(139,92,246,0.3) 90deg, rgba(6,182,212,0.2) 120deg, transparent 150deg, transparent 360deg)`
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className={cn('relative rounded-2xl p-[1px] overflow-hidden group cursor-pointer', className)}
      style={style}
    >
      {/* Rotating shine border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ background: shineGradient }}
      />

      {/* Outer glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-2 rounded-2xl blur-lg opacity-0 group-hover:opacity-80"
        style={{ background: outerGlow }}
        transition={{ duration: 0.4 }}
      />

      {/* Base border for when shine isn't visible */}
      <div className="absolute inset-0 rounded-2xl border border-white/5" />

      {/* Inner card */}
      <motion.div
        className="relative rounded-[15px] bg-black/90 backdrop-blur-xl p-6"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
        transition={{ duration: 0.3 }}
      >
        {children ?? (
          <>
            <motion.h3
              className="text-lg font-semibold text-white mb-2"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Shine Border
            </motion.h3>
            <motion.p
              className="text-white/50 text-sm"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              A card with a light beam continuously sweeping across its border.
            </motion.p>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
