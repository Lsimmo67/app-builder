'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface MeteorsBgProps {
  className?: string
  children?: React.ReactNode
  count?: number
}

interface MeteorConfig {
  id: number
  left: string
  top: string
  delay: number
  duration: number
  tailLength: number
  headSize: number
  brightness: number
  xEnd: number
  yEnd: number
}

/**
 * The angle (in degrees, CSS-clockwise) at which each meteor streak travels.
 * 215 deg produces a diagonal path from the upper-left toward the lower-right,
 * which matches the classic "meteor shower" look of the original component.
 */
const METEOR_ANGLE_DEG = 215
const METEOR_ANGLE_RAD = (METEOR_ANGLE_DEG * Math.PI) / 180

export default function MeteorsBg({
  className,
  children,
  count = 20,
}: MeteorsBgProps) {
  const meteors = useMemo<MeteorConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      // Each meteor travels a random distance between 400 and 800 px
      const travelDistance = 400 + Math.random() * 400

      // Convert the rotated-axis travel into screen-space x / y deltas.
      // The negative sign mirrors the original CSS `translateX(-600px)`.
      const xEnd = -travelDistance * Math.cos(METEOR_ANGLE_RAD)
      const yEnd = -travelDistance * Math.sin(METEOR_ANGLE_RAD)

      return {
        id: i,
        // Spread starting positions across (and slightly beyond) the container
        // so meteors enter naturally from the edges.
        left: `${-10 + Math.random() * 120}%`,
        // Cluster toward the upper half so most streaks originate from the sky.
        top: `${-15 + Math.random() * 70}%`,
        delay: Math.random() * 6,
        duration: 1 + Math.random() * 2,
        tailLength: 80 + Math.random() * 180,
        headSize: 1 + Math.random() * 1.5,
        brightness: 0.6 + Math.random() * 0.4,
        xEnd,
        yEnd,
      }
    })
  }, [count])

  return (
    <div
      className={cn(
        'relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-neutral-950',
        className
      )}
    >
      {/* Meteor layer */}
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="pointer-events-none absolute"
          style={{
            left: meteor.left,
            top: meteor.top,
          }}
          animate={{
            x: [0, meteor.xEnd],
            y: [0, meteor.yEnd],
            opacity: [0, meteor.brightness, meteor.brightness, 0],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            delay: meteor.delay,
            ease: 'linear' as const,
            times: [0, 0.05, 0.7, 1],
          }}
        >
          {/*
           * Inner wrapper rotated to align the gradient tail with the
           * direction of travel. transformOrigin sits at the head so the
           * line fans out behind the bright dot.
           */}
          <div
            className="relative"
            style={{
              transform: `rotate(${METEOR_ANGLE_DEG}deg)`,
              transformOrigin: '0% 50%',
            }}
          >
            {/* Gradient tail */}
            <div
              className="h-px rounded-full bg-gradient-to-r from-slate-500 to-transparent"
              style={{ width: meteor.tailLength }}
            />

            {/* Bright head glow */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-slate-200"
              style={{
                width: meteor.headSize * 2,
                height: meteor.headSize * 2,
                boxShadow: `0 0 ${meteor.headSize * 4}px ${meteor.headSize}px rgba(255,255,255,0.3)`,
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Subtle radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.9)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {children || (
          <>
            <h2 className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Meteors Background
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-neutral-500 md:text-lg">
              A stunning dark section with animated meteor trails streaking
              across the sky. Perfect for hero sections and dramatic
              call-to-action areas.
            </p>
            <button className="mt-8 rounded-full border border-neutral-700 bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-all hover:border-neutral-500 hover:bg-neutral-800">
              Explore More
            </button>
          </>
        )}
      </div>
    </div>
  )
}
