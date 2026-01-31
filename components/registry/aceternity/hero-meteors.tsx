'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface HeroMeteorsProps {
  className?: string
  meteorCount?: number
  headline?: string
  subheadline?: string
}

interface MeteorStyle {
  top: string
  left: string
  delay: number
  duration: number
  size: number
}

export default function HeroMeteors({
  className,
  meteorCount = 20,
  headline = 'The Future is Now',
  subheadline = 'Experience the beauty of motion. Our platform brings your wildest ideas to life with cutting-edge animations and interactions.',
}: HeroMeteorsProps) {
  const meteors = useMemo<MeteorStyle[]>(() => {
    return Array.from({ length: meteorCount }, () => ({
      top: `${Math.random() * 60 - 10}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 1.5 + Math.random() * 3,
      size: 1 + Math.random() * 2,
    }))
  }, [meteorCount])

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
    >
      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={`star-${i}`}
            className="absolute h-px w-px rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          />
        ))}
      </div>

      {/* Meteors */}
      {meteors.map((meteor, i) => (
        <motion.span
          key={`meteor-${i}`}
          className="pointer-events-none absolute rotate-[215deg]"
          style={{
            top: meteor.top,
            left: meteor.left,
          }}
          initial={{ y: -200, x: 200, opacity: 0 }}
          animate={{
            y: [null, 800],
            x: [null, -800],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 8 + 2,
            ease: 'linear',
          }}
        >
          {/* Meteor head */}
          <span
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: `${meteor.size * 2}px`,
              height: `${meteor.size * 2}px`,
              boxShadow: `0 0 ${meteor.size * 4}px ${meteor.size}px rgba(6, 182, 212, 0.3)`,
            }}
          />
          {/* Meteor tail */}
          <span
            className="absolute bg-gradient-to-r from-cyan-400/80 to-transparent"
            style={{
              width: `${60 + Math.random() * 100}px`,
              height: `${meteor.size}px`,
              top: `${(meteor.size * 2 - meteor.size) / 2}px`,
            }}
          />
        </motion.span>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-5xl font-bold text-transparent md:text-8xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-base text-neutral-400 md:text-lg"
        >
          {subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/10">
            Launch App
          </button>
          <button className="rounded-full border border-neutral-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-neutral-500">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  )
}
