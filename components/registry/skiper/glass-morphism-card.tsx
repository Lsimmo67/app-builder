'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperGlassMorphismCardProps {
  title?: string
  description?: string
  blur?: number
  opacity?: number
  className?: string
}

export default function SkiperGlassMorphismCard({
  title = 'Glass Morphism',
  description = 'A frosted glass card effect with animated background blobs and translucent overlay.',
  blur = 20,
  opacity = 0.15,
  className,
}: SkiperGlassMorphismCardProps) {
  return (
    <div className={cn('relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      {/* Animated background blobs */}
      <motion.div
        className="absolute h-72 w-72 rounded-full bg-purple-500/40"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(60px)', top: '15%', left: '20%' }}
      />
      <motion.div
        className="absolute h-64 w-64 rounded-full bg-blue-500/40"
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(60px)', top: '30%', right: '20%' }}
      />
      <motion.div
        className="absolute h-56 w-56 rounded-full bg-pink-500/30"
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(60px)', bottom: '15%', left: '35%' }}
      />

      {/* Glass card */}
      <motion.div
        className="relative z-10 w-[340px] rounded-2xl border border-white/20 p-8 shadow-2xl"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">
          &#9674;
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-white/70">{description}</p>
        <div className="flex gap-3">
          <div className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Learn More
          </div>
          <div className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/70">
            Dismiss
          </div>
        </div>
      </motion.div>
    </div>
  )
}
