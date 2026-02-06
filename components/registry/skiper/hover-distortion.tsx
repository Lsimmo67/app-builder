'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperHoverDistortionProps {
  title?: string
  color?: string
  intensity?: number
  className?: string
}

export default function SkiperHoverDistortion({
  title = 'Hover Distortion',
  color = '#6366f1',
  intensity = 20,
  className,
}: SkiperHoverDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const isHovering = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 20 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  const smoothHover = useSpring(isHovering, { stiffness: 300, damping: 30 })

  const skewX = useTransform(
    [smoothX, smoothHover],
    ([x, h]) => (Number(x) - 0.5) * intensity * Number(h)
  )
  const skewY = useTransform(
    [smoothY, smoothHover],
    ([y, h]) => (Number(y) - 0.5) * intensity * Number(h)
  )
  const scaleEffect = useTransform(smoothHover, [0, 1], [1, 1.05])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const gridCells = Array.from({ length: 16 }, (_, i) => i)

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        ref={containerRef}
        className="relative h-[400px] w-[350px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
        style={{
          skewX,
          skewY,
          scale: scaleEffect,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => isHovering.set(1)}
        onMouseLeave={() => {
          isHovering.set(0)
          mouseX.set(0.5)
          mouseY.set(0.5)
        }}
      >
        {/* Distorted grid pattern */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px opacity-30">
          {gridCells.map((i) => {
            const row = Math.floor(i / 4)
            const col = i % 4
            return (
              <motion.div
                key={i}
                className="rounded-sm"
                style={{
                  backgroundColor: `${color}${(15 + (i % 3) * 5).toString(16)}`,
                  scale: useTransform(
                    [smoothX, smoothY, smoothHover],
                    ([mx, my, h]) => {
                      const dist = Math.sqrt(
                        Math.pow((col / 3 - Number(mx)), 2) +
                        Math.pow((row / 3 - Number(my)), 2)
                      )
                      return 1 + (1 - dist) * 0.3 * Number(h)
                    }
                  ),
                }}
              />
            )
          })}
        </div>

        {/* Ripple effect at cursor */}
        <motion.div
          className="pointer-events-none absolute h-48 w-48 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
            left: useTransform(smoothX, (v) => `${Number(v) * 100 - 24}%`),
            top: useTransform(smoothY, (v) => `${Number(v) * 100 - 24}%`),
            opacity: smoothHover,
            filter: 'blur(10px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
          <motion.div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
            style={{ backgroundColor: `${color}25`, color }}
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ type: 'spring' }}
          >
            &#9674;
          </motion.div>
          <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/50">
            Move your cursor to distort and warp the card surface.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
