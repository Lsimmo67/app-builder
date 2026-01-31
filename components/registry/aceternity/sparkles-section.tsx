'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

interface Sparkle {
  id: number
  x: string
  y: string
  size: number
  duration: number
  delay: number
  color: string
}

interface SparklesSectionProps {
  className?: string
  children?: React.ReactNode
  sparkleCount?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
}

function generateSparkle(
  id: number,
  colors: string[],
  minSize: number,
  maxSize: number
): Sparkle {
  return {
    id,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: minSize + Math.random() * (maxSize - minSize),
    duration: 1.5 + Math.random() * 3,
    delay: Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }
}

export default function SparklesSection({
  className,
  children,
  sparkleCount = 40,
  colors = ['#fbbf24', '#f59e0b', '#d97706', '#ffffff', '#fde68a'],
  minSize = 2,
  maxSize = 6,
}: SparklesSectionProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const initial = Array.from({ length: sparkleCount }, (_, i) =>
      generateSparkle(i, colors, minSize, maxSize)
    )
    setSparkles(initial)

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const idx = Math.floor(Math.random() * prev.length)
        const updated = [...prev]
        updated[idx] = generateSparkle(
          Date.now() + idx,
          colors,
          minSize,
          maxSize
        )
        return updated
      })
    }, 800)

    return () => clearInterval(interval)
  }, [sparkleCount, colors, minSize, maxSize])

  return (
    <div
      className={cn(
        'relative min-h-[60vh] w-full overflow-hidden bg-black px-4 py-20',
        className
      )}
    >
      {/* Sparkles */}
      <div className="pointer-events-none absolute inset-0">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 90, 180, 270],
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-full w-full"
            >
              <path
                d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
                fill={sparkle.color}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {children || (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-4xl font-bold text-transparent md:text-7xl"
            >
              Sparkle & Shine
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-6 max-w-lg text-base text-neutral-400 md:text-lg"
            >
              Add a touch of magic to your sections with animated sparkle
              effects. Each particle dances independently, creating a
              captivating visual experience.
            </motion.p>
          </>
        )}
      </div>
    </div>
  )
}
