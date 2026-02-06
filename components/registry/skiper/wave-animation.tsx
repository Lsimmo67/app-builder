'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperWaveAnimationProps {
  waveCount?: number
  color?: string
  speed?: number
  title?: string
  className?: string
}

export default function SkiperWaveAnimation({
  waveCount = 4,
  color = '#6366f1',
  speed = 1,
  title = 'Wave Animation',
  className,
}: SkiperWaveAnimationProps) {
  const waves = Array.from({ length: waveCount }, (_, i) => i)

  return (
    <div className={cn('relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      {/* Animated wave layers */}
      {waves.map((i) => {
        const opacity = 0.08 + (i * 0.04)
        const duration = (12 - i * 1.5) / speed
        const yOffset = 60 + i * 25

        return (
          <motion.div
            key={i}
            className="absolute w-[200%]"
            style={{ bottom: 0, height: `${yOffset}%` }}
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg
              viewBox="0 0 1200 200"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                d={`M0,${80 + i * 10} C200,${40 + i * 15} 400,${120 - i * 10} 600,${80 + i * 10} C800,${40 + i * 15} 1000,${120 - i * 10} 1200,${80 + i * 10} L1200,200 L0,200 Z`}
                fill={color}
                fillOpacity={opacity}
              />
            </svg>
          </motion.div>
        )
      })}

      {/* Foreground content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-sm text-white/50">Smooth animated wave layers</p>
      </motion.div>
    </div>
  )
}
