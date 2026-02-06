'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperScrollWarpTextProps {
  text?: string
  color?: string
  className?: string
}

export default function SkiperScrollWarpText({
  text = 'WARP SPEED',
  color = '#ffffff',
  className,
}: SkiperScrollWarpTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const skewX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [20, -10, 0, 10, -20])
  const scaleX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.8, 1.1, 1, 1.1, 0.8])
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 20, -5])
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3])

  const characters = text.split('')

  return (
    <div
      ref={containerRef}
      className={cn('relative h-[200vh] w-full', className)}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-zinc-950">
        <motion.div
          className="flex"
          style={{
            skewX,
            scaleX,
            rotateZ,
            transformOrigin: 'center center',
          }}
        >
          {characters.map((char, i) => {
            const charProgress = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [
                -30 + Math.sin(i * 0.5) * 20,
                0,
                30 + Math.cos(i * 0.5) * 20,
              ]
            )

            const charOpacity = useTransform(
              scrollYProgress,
              [0, 0.3, 0.7, 1],
              [0.3, 1, 1, 0.3]
            )

            return (
              <motion.span
                key={i}
                className="inline-block select-none text-5xl font-black md:text-7xl lg:text-9xl"
                style={{
                  color,
                  y: charProgress,
                  opacity: charOpacity,
                  letterSpacing,
                  textShadow: `0 0 20px ${color}30`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )
          })}
        </motion.div>

        {/* Decorative lines */}
        <motion.div
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 opacity-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]),
          }}
        />

        <motion.p
          className="absolute bottom-8 text-xs"
          style={{ color: `${color}40` }}
        >
          Scroll to warp
        </motion.p>
      </div>
    </div>
  )
}
