'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'

interface HeroSpotlightProps {
  className?: string
  headline?: string
  subheadline?: string
  spotlightSize?: number
  spotlightColor?: string
}

export default function HeroSpotlight({
  className,
  headline = 'Spotlight That\nFollows You',
  subheadline = 'A beautiful spotlight effect that tracks your mouse movement across the hero section, creating an immersive dark-mode experience.',
  spotlightSize = 400,
  spotlightColor = 'rgba(120, 119, 198, 0.15)',
}: HeroSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    []
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
    >
      {/* Spotlight SVG */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="spotlight-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={spotlightColor} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <motion.ellipse
            cx={mousePosition.x}
            cy={mousePosition.y}
            rx={spotlightSize}
            ry={spotlightSize}
            fill="url(#spotlight-grad)"
            animate={{
              cx: mousePosition.x,
              cy: mousePosition.y,
            }}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 30 }}
          />
        </svg>
      </motion.div>

      {/* Secondary ambient glow */}
      <motion.div
        className="pointer-events-none absolute z-10 rounded-full blur-3xl"
        style={{
          width: spotlightSize * 1.5,
          height: spotlightSize * 1.5,
          background: `radial-gradient(circle, ${spotlightColor}, transparent 70%)`,
        }}
        animate={{
          x: mousePosition.x - (spotlightSize * 1.5) / 2,
          y: mousePosition.y - (spotlightSize * 1.5) / 2,
          opacity: isHovering ? 0.6 : 0,
        }}
        transition={{ type: 'spring' as const, stiffness: 150, damping: 25 }}
      />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="whitespace-pre-line bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-7xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl text-base text-neutral-400 md:text-lg"
        >
          {subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <button className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200">
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  )
}
