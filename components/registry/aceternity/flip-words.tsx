'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

interface FlipWordsProps {
  className?: string
  words?: string[]
  duration?: number
  prefix?: string
  suffix?: string
}

export default function FlipWords({
  className,
  words = ['amazing', 'beautiful', 'powerful', 'innovative', 'creative'],
  duration = 3000,
  prefix = 'Build something',
  suffix = 'today.',
}: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % words.length)
  }, [words.length])

  useEffect(() => {
    const interval = setInterval(next, duration)
    return () => clearInterval(interval)
  }, [next, duration])

  return (
    <div
      className={cn(
        'flex items-center justify-center px-4 py-20',
        className
      )}
    >
      <div className="text-center text-3xl font-bold text-white md:text-5xl lg:text-6xl">
        {prefix}{' '}
        <span className="relative inline-block w-auto">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[currentIndex]}
              initial={{
                opacity: 0,
                rotateX: -90,
                y: 10,
                filter: 'blur(8px)',
              }}
              animate={{
                opacity: 1,
                rotateX: 0,
                y: 0,
                filter: 'blur(0px)',
              }}
              exit={{
                opacity: 0,
                rotateX: 90,
                y: -10,
                filter: 'blur(8px)',
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut' as const,
              }}
              className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              {words[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </span>{' '}
        {suffix}
      </div>
    </div>
  )
}
