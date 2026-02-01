'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, CSSProperties, useCallback } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
}

const sparkleColors = ['#c084fc', '#a78bfa', '#818cf8', '#e879f9', '#22d3ee']

export default function SparkleText({
  className,
  style,
  text = 'Sparkle Magic',
}: {
  className?: string
  style?: CSSProperties
  text?: string
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  const createSparkle = useCallback((): Sparkle => ({
    id: Date.now() + Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 4,
    rotation: Math.random() * 360,
    color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
  }), [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const next = [...prev.slice(-14), createSparkle()]
        return next
      })
    }, 180)
    return () => clearInterval(interval)
  }, [createSparkle])

  return (
    <motion.span
      className={cn('relative inline-block', className)}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
    >
      {/* Sparkle particles */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.svg
            key={s.id}
            className="absolute pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            viewBox="0 0 24 24"
            fill="none"
            initial={{ scale: 0, rotate: s.rotation, opacity: 0 }}
            animate={{ scale: [0, 1, 0], rotate: s.rotation + 180, opacity: [0, 1, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
          >
            <path
              d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"
              fill={s.color}
            />
          </motion.svg>
        ))}
      </AnimatePresence>

      {/* Main text with animated gradient */}
      <motion.span
        className="relative z-10 text-4xl font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(90deg, #c4b5fd, #e879f9, #22d3ee, #c4b5fd)',
          backgroundSize: '200% auto',
        }}
        animate={{ backgroundPosition: ['0% center', '200% center'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' as const }}
        whileHover={{ scale: 1.05 }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}
