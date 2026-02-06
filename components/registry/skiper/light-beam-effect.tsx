'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperLightBeamEffectProps {
  color?: string
  speed?: number
  beamCount?: number
  title?: string
  className?: string
}

export default function SkiperLightBeamEffect({
  color = '#6366f1',
  speed = 1,
  beamCount = 3,
  title = 'Light Beam',
  className,
}: SkiperLightBeamEffectProps) {
  const beams = Array.from({ length: beamCount }, (_, i) => i)
  const baseDuration = 4 / speed

  return (
    <div className={cn('relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      {/* Light beams */}
      {beams.map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{
            width: '30%',
            height: '200%',
            background: `linear-gradient(90deg, transparent, ${color}${Math.round(20 - i * 5).toString(16).padStart(2, '0')}, transparent)`,
            transform: `rotate(${15 + i * 12}deg)`,
            transformOrigin: 'center center',
          }}
          animate={{
            x: ['-150%', '250%'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: baseDuration + i * 1.5,
            repeat: Infinity,
            delay: i * (baseDuration / beamCount),
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle glow at sweep origin */}
      <motion.div
        className="pointer-events-none absolute left-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: baseDuration * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Card with beam highlight effect */}
      <motion.div
        className="relative z-10 w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Sweeping highlight across card */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${color}15 45%, ${color}05 55%, transparent 60%)`,
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{
            duration: baseDuration * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <h2 className="mb-3 text-2xl font-bold text-white">{title}</h2>
        <p className="text-sm text-white/60">
          Light beams sweep across the viewport with a smooth, continuous motion creating an elegant reveal effect.
        </p>
        <div className="mt-6 flex gap-2">
          <div className="rounded-full px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: `${color}30` }}>
            Explore
          </div>
          <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60">
            Learn More
          </div>
        </div>
      </motion.div>
    </div>
  )
}
