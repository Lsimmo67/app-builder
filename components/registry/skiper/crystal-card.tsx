'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperCrystalCardProps {
  title?: string
  description?: string
  color?: string
  className?: string
}

export default function SkiperCrystalCard({
  title = 'Crystal Card',
  description = 'A gemstone-inspired card with refraction light effects that respond to cursor movement.',
  color = '#6366f1',
  className,
}: SkiperCrystalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 200, damping: 25 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig)

  const lightX = useTransform(mouseX, [0, 1], [20, 80])
  const lightY = useTransform(mouseY, [0, 1], [20, 80])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        className="relative h-[400px] w-[300px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: `linear-gradient(135deg, ${color}20 0%, ${color}05 50%, ${color}15 100%)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Crystal facet lines */}
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 300 400">
          <line x1="0" y1="0" x2="150" y2="200" stroke={color} strokeWidth="0.5" />
          <line x1="300" y1="0" x2="150" y2="200" stroke={color} strokeWidth="0.5" />
          <line x1="0" y1="400" x2="150" y2="200" stroke={color} strokeWidth="0.5" />
          <line x1="300" y1="400" x2="150" y2="200" stroke={color} strokeWidth="0.5" />
          <line x1="150" y1="0" x2="150" y2="200" stroke={color} strokeWidth="0.3" />
          <line x1="0" y1="200" x2="150" y2="200" stroke={color} strokeWidth="0.3" />
          <line x1="300" y1="200" x2="150" y2="200" stroke={color} strokeWidth="0.3" />
        </svg>

        {/* Refraction light spot */}
        <motion.div
          className="pointer-events-none absolute z-10 h-40 w-40 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            left: useTransform(lightX, (v) => `${v - 20}%`),
            top: useTransform(lightY, (v) => `${v - 20}%`),
            filter: 'blur(20px)',
          }}
        />

        {/* Secondary refraction */}
        <motion.div
          className="pointer-events-none absolute z-10 h-24 w-24 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)`,
            left: useTransform(lightX, (v) => `${100 - v}%`),
            top: useTransform(lightY, (v) => `${100 - v}%`),
            filter: 'blur(15px)',
          }}
        />

        {/* Content */}
        <div className="relative z-20 flex h-full flex-col justify-end p-8">
          <motion.div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}30` }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span style={{ color }} className="text-xl">&#9670;</span>
          </motion.div>
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>

        {/* Edge highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}20 0%, transparent 30%, transparent 70%, ${color}10 100%)`,
          }}
        />
      </motion.div>
    </div>
  )
}
