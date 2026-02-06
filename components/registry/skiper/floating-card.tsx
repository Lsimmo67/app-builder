'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperFloatingCardProps {
  title?: string
  description?: string
  floatRange?: number
  duration?: number
  className?: string
}

export default function SkiperFloatingCard({
  title = 'Floating Card',
  description = 'This card gently floats in space with a smooth continuous animation.',
  floatRange = 20,
  duration = 4,
  className,
}: SkiperFloatingCardProps) {
  return (
    <div className={cn('flex h-[450px] w-full items-center justify-center', className)}>
      <motion.div
        className="relative w-[320px] rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-800 to-zinc-900 p-8 shadow-2xl"
        animate={{
          y: [-floatRange / 2, floatRange / 2, -floatRange / 2],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Glow effect behind card */}
        <div
          className="absolute -inset-4 -z-10 rounded-3xl opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Floating orb decorations */}
        <motion.div
          className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-indigo-400/60"
          animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(2px)' }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-purple-400/60"
          animate={{ y: [6, -6, 6], x: [3, -3, 3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(2px)' }}
        />

        {/* Card content */}
        <div className="relative z-10 text-white">
          <motion.div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/20 text-2xl backdrop-blur-sm"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            &#9672;
          </motion.div>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="mb-6 text-sm text-white/60">{description}</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/50">Active</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
