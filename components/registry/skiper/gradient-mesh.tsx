'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperGradientMeshProps {
  colors?: string[]
  speed?: number
  title?: string
  className?: string
}

export default function SkiperGradientMesh({
  colors = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'],
  speed = 1,
  title = 'Gradient Mesh',
  className,
}: SkiperGradientMeshProps) {
  const baseDuration = 10 / speed

  const meshPoints = [
    { x: 20, y: 20 },
    { x: 80, y: 20 },
    { x: 20, y: 80 },
    { x: 80, y: 80 },
  ]

  return (
    <div className={cn('relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      {/* Gradient mesh points */}
      {meshPoints.map((point, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '60%',
            height: '60%',
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${colors[i % colors.length]}60 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50 * Math.sin(i * 1.5), -30 * Math.cos(i), 0],
            y: [0, -40 * Math.cos(i * 1.5), 30 * Math.sin(i), 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: baseDuration + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Additional rotating mesh accent */}
      <motion.div
        className="absolute h-[120%] w-[120%] opacity-30"
        style={{
          background: `conic-gradient(from 0deg, ${colors.join(', ')}, ${colors[0]})`,
          filter: 'blur(80px)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: baseDuration * 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Grid overlay for mesh appearance */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-sm text-white/50">Dynamic gradient mesh animation</p>
      </motion.div>
    </div>
  )
}
