'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface BackgroundBeamsProps {
  className?: string
  children?: React.ReactNode
  beamCount?: number
}

export default function BackgroundBeams({
  className,
  children,
  beamCount = 12,
}: BackgroundBeamsProps) {
  const beams = Array.from({ length: beamCount }, (_, i) => {
    const angle = (i / beamCount) * 360
    const length = 600 + Math.random() * 600
    const radians = (angle * Math.PI) / 180
    const endX = Math.cos(radians) * length
    const endY = Math.sin(radians) * length
    return {
      id: i,
      x2: endX,
      y2: endY,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      width: 0.5 + Math.random() * 1.5,
    }
  })

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950',
        className
      )}
    >
      {/* Beams SVG */}
      <div className="absolute inset-0 z-0">
        <svg
          className="h-full w-full"
          viewBox="-600 -400 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.5)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {beams.map((beam) => (
            <motion.line
              key={beam.id}
              x1={0}
              y1={0}
              x2={beam.x2}
              y2={beam.y2}
              stroke="url(#beam-grad)"
              strokeWidth={beam.width}
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: [0, 0.6, 0.6, 0],
                pathLength: [0, 1, 1, 0],
              }}
              transition={{
                duration: beam.duration,
                delay: beam.delay,
                repeat: Infinity,
                ease: 'easeInOut' as const,
                times: [0, 0.3, 0.7, 1],
              }}
            />
          ))}

          {/* Center glow */}
          <circle cx={0} cy={0} r={4} fill="rgba(6, 182, 212, 0.8)">
            <animate
              attributeName="r"
              values="3;6;3"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Radial fade */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,10,0.8)_70%,rgba(10,10,10,1)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        {children || (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-7xl"
            >
              Background Beams
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-6 max-w-md text-base text-neutral-500 md:text-lg"
            >
              Animated beam lines radiate from the center, creating a dramatic
              focal point for your hero sections and landing pages.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8"
            >
              <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 p-1.5 backdrop-blur">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-neutral-500 outline-none"
                />
                <button className="rounded-full bg-cyan-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-400">
                  Join
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
