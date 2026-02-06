'use client'

import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperParticleBackgroundProps {
  particleCount?: number
  color?: string
  speed?: number
  title?: string
  className?: string
}

export default function SkiperParticleBackground({
  particleCount = 50,
  color = '#6366f1',
  speed = 1,
  title = 'Particle Background',
  className,
}: SkiperParticleBackgroundProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: (Math.random() * 10 + 10) / speed,
        delay: Math.random() * 5,
        xDrift: (Math.random() - 0.5) * 200,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [particleCount, speed]
  )

  return (
    <div className={cn('relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 2}px ${color}60`,
          }}
          animate={{
            y: [-20, -100 - Math.random() * 200, -20],
            x: [0, p.xDrift, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Connection lines via CSS grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Center content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-sm text-white/50">
          {particleCount} particles floating in space
        </p>
      </motion.div>
    </div>
  )
}
