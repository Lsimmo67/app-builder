'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperAuroraEffectProps {
  colors?: string[]
  speed?: number
  title?: string
  className?: string
}

export default function SkiperAuroraEffect({
  colors = ['#6366f1', '#22d3ee', '#a855f7', '#34d399'],
  speed = 1,
  title = 'Aurora Effect',
  className,
}: SkiperAuroraEffectProps) {
  const baseDuration = 8 / speed

  return (
    <div className={cn('relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      {/* Aurora bands */}
      {colors.map((auroraColor, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '150%',
            height: '60%',
            left: '-25%',
            top: `${10 + i * 12}%`,
            background: `linear-gradient(90deg, transparent 0%, ${auroraColor}30 20%, ${auroraColor}50 50%, ${auroraColor}30 80%, transparent 100%)`,
            filter: `blur(${40 + i * 10}px)`,
            borderRadius: '50%',
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: [0, -20 + i * 8, 0],
            scaleX: [1, 1.2, 0.9, 1],
            opacity: [0.4, 0.7, 0.5, 0.4],
            rotate: [-5 + i * 2, 5 - i * 2, -5 + i * 2],
          }}
          transition={{
            duration: baseDuration + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Stars */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute h-px w-px rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-sm text-white/50">Northern lights inspired effect</p>
      </motion.div>
    </div>
  )
}
