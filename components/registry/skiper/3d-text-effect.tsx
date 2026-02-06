'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface Skiper3dTextEffectProps {
  text?: string
  depth?: number
  color?: string
  shadowColor?: string
  className?: string
}

export default function Skiper3dTextEffect({
  text = '3D TEXT',
  depth = 8,
  color = '#ffffff',
  shadowColor = '#6366f1',
  className,
}: Skiper3dTextEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 100, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [25, -25]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-25, 25]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const layers = Array.from({ length: depth }, (_, i) => i)

  return (
    <div
      ref={containerRef}
      className={cn('flex h-[400px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '800px' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Extruded depth layers */}
        {layers.map((i) => {
          const layerOpacity = 0.3 - (i / depth) * 0.25
          return (
            <span
              key={i}
              className="absolute left-0 top-0 select-none whitespace-nowrap text-6xl font-black md:text-8xl"
              style={{
                color: shadowColor,
                opacity: layerOpacity,
                transform: `translateZ(${-i * 3}px) translateX(${i * 0.5}px) translateY(${i * 0.5}px)`,
              }}
              aria-hidden="true"
            >
              {text}
            </span>
          )
        })}

        {/* Front face */}
        <motion.span
          className="relative select-none whitespace-nowrap text-6xl font-black md:text-8xl"
          style={{
            color,
            transform: `translateZ(${depth * 3}px)`,
            textShadow: `2px 2px 0 ${shadowColor}40, 4px 4px 0 ${shadowColor}20`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  )
}
