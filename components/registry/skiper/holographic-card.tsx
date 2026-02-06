'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperHolographicCardProps {
  title?: string
  description?: string
  intensity?: number
  className?: string
}

export default function SkiperHolographicCard({
  title = 'Holographic Card',
  description = 'Move your cursor over this card to see the holographic rainbow effect.',
  intensity = 15,
  className,
}: SkiperHolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig)

  const gradientX = useTransform(mouseX, [0, 1], [0, 100])
  const gradientY = useTransform(mouseY, [0, 1], [0, 100])

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
        className="relative h-[380px] w-[300px] cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-zinc-900 p-8 shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
      >
        {/* Holographic overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-50 mix-blend-overlay"
          style={{
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) =>
                `linear-gradient(${135 + (Number(x) - 50) * 0.5}deg,
                  rgba(255,0,0,0.3) 0%,
                  rgba(255,165,0,0.3) 15%,
                  rgba(255,255,0,0.3) 30%,
                  rgba(0,255,0,0.3) 45%,
                  rgba(0,255,255,0.3) 60%,
                  rgba(0,0,255,0.3) 75%,
                  rgba(128,0,255,0.3) 90%,
                  rgba(255,0,128,0.3) 100%)`
            ),
          }}
        />

        {/* Shine effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
          style={{
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col justify-between text-white">
          <div>
            <div className="mb-2 h-10 w-14 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-inner" />
            <div className="mt-6 font-mono text-lg tracking-wider">4242 4242 4242 4242</div>
          </div>
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-1 text-sm text-white/60">{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
