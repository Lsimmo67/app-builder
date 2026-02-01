'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSProperties, useEffect, useState } from 'react'

const wordVariants = {
  enter: {
    y: 30,
    opacity: 0,
    scale: 0.9,
    filter: 'blur(8px)',
  },
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    y: -30,
    opacity: 0,
    scale: 0.9,
    filter: 'blur(8px)',
    transition: {
      duration: 0.4,
      ease: 'easeIn' as const,
    },
  },
}

export default function MorphingText({
  className,
  style,
  words = ['Innovate', 'Create', 'Design', 'Build', 'Ship'],
  interval = 2500,
}: {
  className?: string
  style?: CSSProperties
  words?: string[]
  interval?: number
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <motion.div
      className={cn('text-center py-8', className)}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
    >
      <h2 className="text-5xl font-bold">
        <span className="text-white/80">We </span>
        <span className="relative inline-block min-w-[180px] text-left">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              variants={wordVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h2>
      <motion.div
        className="mt-4 h-1 mx-auto rounded-full bg-gradient-to-r from-violet-500/0 via-fuchsia-500/40 to-violet-500/0"
        animate={{ width: ['0%', '60%', '0%'] }}
        transition={{
          duration: interval / 1000,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
    </motion.div>
  )
}
