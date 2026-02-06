'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperScrollMorphTextProps {
  startText?: string
  endText?: string
  color?: string
  className?: string
}

export default function SkiperScrollMorphText({
  startText = 'CREATE',
  endText = 'DESIGN',
  color = '#ffffff',
  className,
}: SkiperScrollMorphTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const blurStart = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 10])
  const opacityStart = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0])
  const scaleStart = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0.8])

  const blurEnd = useTransform(scrollYProgress, [0.5, 0.7, 1], [10, 0, 0])
  const opacityEnd = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1])
  const scaleEnd = useTransform(scrollYProgress, [0.5, 0.7, 1], [0.8, 1, 1])

  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 0])

  return (
    <div
      ref={containerRef}
      className={cn('relative h-[200vh] w-full', className)}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-zinc-950">
        {/* Start text */}
        <motion.div
          className="absolute"
          style={{
            filter: useTransform(blurStart, (v) => `blur(${v}px)`),
            opacity: opacityStart,
            scale: scaleStart,
            letterSpacing,
          }}
        >
          <span
            className="select-none whitespace-nowrap text-5xl font-black md:text-7xl lg:text-9xl"
            style={{ color }}
          >
            {startText}
          </span>
        </motion.div>

        {/* End text */}
        <motion.div
          className="absolute"
          style={{
            filter: useTransform(blurEnd, (v) => `blur(${v}px)`),
            opacity: opacityEnd,
            scale: scaleEnd,
            letterSpacing,
          }}
        >
          <span
            className="select-none whitespace-nowrap text-5xl font-black md:text-7xl lg:text-9xl"
            style={{ color }}
          >
            {endText}
          </span>
        </motion.div>

        {/* Scroll progress indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 h-16 w-px -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, transparent, ${color}40)`,
            scaleY: useTransform(scrollYProgress, [0, 1], [0.3, 1]),
            transformOrigin: 'top',
          }}
        />
        <motion.p
          className="absolute bottom-6 text-xs"
          style={{ color: `${color}40` }}
        >
          Scroll to morph
        </motion.p>
      </div>
    </div>
  )
}
