'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSProperties, useEffect, useState } from 'react'

const wordVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.95,
    rotateX: direction > 0 ? -15 : 15,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 25,
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.95,
    rotateX: direction > 0 ? 15 : -15,
    transition: {
      duration: 0.3,
      ease: 'easeIn' as const,
    },
  }),
}

export default function WordRotate({
  className,
  style,
  words = ['Amazing', 'Beautiful', 'Creative', 'Dynamic', 'Elegant'],
  interval = 2000,
  prefix = 'This is ',
}: {
  className?: string
  style?: CSSProperties
  words?: string[]
  interval?: number
  prefix?: string
}) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1)
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <motion.div
      className={cn('text-3xl font-bold text-white py-4', className)}
      style={{ ...style, perspective: 600 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      <span className="relative inline-flex overflow-hidden h-[1.3em] align-bottom min-w-[120px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.span
            key={words[index]}
            custom={direction}
            variants={wordVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute left-0 top-0 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.div>
  )
}
