'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface WavyBackgroundProps {
  className?: string
  children?: React.ReactNode
  waveCount?: number
  waveOpacity?: number
  colors?: string[]
}

export default function WavyBackground({
  className,
  children,
  waveCount = 5,
  waveOpacity = 0.5,
  colors = [
    'rgba(59, 130, 246, 0.3)',
    'rgba(139, 92, 246, 0.3)',
    'rgba(236, 72, 153, 0.3)',
    'rgba(34, 197, 94, 0.3)',
    'rgba(234, 179, 8, 0.3)',
  ],
}: WavyBackgroundProps) {
  const generateWavePath = (index: number, total: number) => {
    const amplitude = 30 + index * 15
    const frequency = 0.005 + index * 0.002
    const yOffset = 300 + (index / total) * 200
    const phase = index * 60

    let d = `M 0 ${yOffset}`
    for (let x = 0; x <= 1200; x += 10) {
      const y =
        yOffset +
        Math.sin((x + phase) * frequency * Math.PI * 2) * amplitude +
        Math.sin((x + phase * 2) * frequency * 1.5 * Math.PI * 2) *
          (amplitude * 0.5)
      d += ` L ${x} ${y}`
    }
    d += ` L 1200 800 L 0 800 Z`
    return d
  }

  const waves = Array.from({ length: waveCount }, (_, i) => ({
    path: generateWavePath(i, waveCount),
    color: colors[i % colors.length],
    duration: 8 + i * 2,
    delay: i * 0.5,
  }))

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950',
        className
      )}
    >
      {/* Animated waves */}
      <div className="absolute inset-0 z-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {waves.map((wave, i) => (
            <motion.path
              key={i}
              d={wave.path}
              fill={wave.color}
              opacity={waveOpacity}
              initial={{ translateX: 0 }}
              animate={{
                translateX: [0, -50, 0, 50, 0],
                translateY: [0, 15, 0, -15, 0],
              }}
              transition={{
                duration: wave.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: wave.delay,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {children || (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold text-white md:text-7xl"
            >
              Ride the Wave of Innovation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-base text-neutral-300 md:text-lg"
            >
              Smooth, fluid animations that bring your content to life. Built
              with performance and aesthetics in mind.
            </motion.p>
          </>
        )}
      </div>
    </div>
  )
}
