'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperScatterEffectProps {
  itemCount?: number
  color?: string
  scatterRadius?: number
  title?: string
  className?: string
}

export default function SkiperScatterEffect({
  itemCount = 16,
  color = '#6366f1',
  scatterRadius = 300,
  title = 'Scatter Effect',
  className,
}: SkiperScatterEffectProps) {
  const [isScattered, setIsScattered] = useState(false)

  const items = useMemo(
    () =>
      Array.from({ length: itemCount }, (_, i) => ({
        id: i,
        angle: (i / itemCount) * Math.PI * 2,
        distance: scatterRadius * (0.5 + Math.random() * 0.5),
        rotation: Math.random() * 360 - 180,
        size: 30 + Math.random() * 30,
        delay: i * 0.03,
        hue: (i / itemCount) * 60,
      })),
    [itemCount, scatterRadius]
  )

  return (
    <div className={cn('flex h-[500px] w-full flex-col items-center justify-center overflow-hidden', className)}>
      <div className="relative">
        {/* Scatter items */}
        {items.map((item) => {
          const scatteredX = Math.cos(item.angle) * item.distance
          const scatteredY = Math.sin(item.angle) * item.distance

          return (
            <motion.div
              key={item.id}
              className="absolute rounded-lg"
              style={{
                width: item.size,
                height: item.size,
                left: -item.size / 2,
                top: -item.size / 2,
                backgroundColor: color,
                opacity: 0.6 + item.hue / 200,
              }}
              animate={{
                x: isScattered ? scatteredX : 0,
                y: isScattered ? scatteredY : 0,
                rotate: isScattered ? item.rotation : 0,
                scale: isScattered ? 0.8 : 1,
                borderRadius: isScattered ? '50%' : '8px',
                opacity: isScattered ? 0.5 : 0.7,
              }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 12,
                delay: item.delay,
              }}
            />
          )
        })}

        {/* Center content */}
        <motion.div
          className="relative z-10 flex h-32 w-32 cursor-pointer items-center justify-center rounded-2xl border border-white/20 bg-zinc-900/90 text-center shadow-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsScattered(!isScattered)}
          animate={{
            boxShadow: isScattered
              ? `0 0 60px ${color}40`
              : `0 0 20px ${color}20`,
          }}
        >
          <div>
            <motion.div
              className="text-2xl"
              animate={{ rotate: isScattered ? 45 : 0 }}
            >
              {isScattered ? '✕' : '⊕'}
            </motion.div>
            <span className="mt-1 block text-xs text-white/50">
              {isScattered ? 'Collect' : 'Scatter'}
            </span>
          </div>
        </motion.div>
      </div>

      <motion.p
        className="mt-12 text-sm text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {title} -- Click to {isScattered ? 'collect' : 'scatter'} elements
      </motion.p>
    </div>
  )
}
