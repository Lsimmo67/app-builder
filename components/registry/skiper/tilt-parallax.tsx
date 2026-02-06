'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperTiltParallaxProps {
  title?: string
  subtitle?: string
  intensity?: number
  className?: string
}

export default function SkiperTiltParallax({
  title = 'Tilt Parallax',
  subtitle = 'Move your cursor to see the layered parallax tilt effect.',
  intensity = 15,
  className,
}: SkiperTiltParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 100, damping: 15 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig)

  // Parallax layers move at different rates
  const layer1X = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), springConfig)
  const layer1Y = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), springConfig)
  const layer2X = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig)
  const layer2Y = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig)
  const layer3X = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), springConfig)
  const layer3Y = useSpring(useTransform(mouseY, [0, 1], [-5, 5]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
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
        ref={containerRef}
        className="relative h-[400px] w-[350px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background layer (moves most) */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: layer1X,
            y: layer1Y,
            scale: 1.2,
          }}
        >
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-indigo-400"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  opacity: 0.3 + (i % 3) * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Middle layer (moves moderately) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ x: layer2X, y: layer2Y }}
        >
          <div className="h-48 w-48 rounded-full border border-indigo-500/20 opacity-40" />
          <div className="absolute h-32 w-32 rounded-full border border-purple-500/20 opacity-50" />
          <div className="absolute h-16 w-16 rounded-full bg-indigo-500/10" />
        </motion.div>

        {/* Foreground layer (moves least) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          style={{ x: layer3X, y: layer3Y, transform: 'translateZ(40px)' }}
        >
          <h3 className="mb-3 text-3xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/50">{subtitle}</p>
        </motion.div>

        {/* Shine overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([mx, my]) =>
                `radial-gradient(circle at ${Number(mx) * 100}% ${Number(my) * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            ),
          }}
        />
      </motion.div>
    </div>
  )
}
