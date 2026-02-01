'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSProperties, useEffect, useState, useCallback } from 'react'

export default function TypingAnimation({
  className,
  style,
  text = 'Hello, World!',
  speed = 80,
  loop = true,
}: {
  className?: string
  style?: CSSProperties
  text?: string
  speed?: number
  loop?: boolean
}) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (idx < text.length) {
            setDisplayed(text.slice(0, idx + 1))
            setIdx(idx + 1)
          } else if (loop) {
            setIsPaused(true)
            setTimeout(() => {
              setIsPaused(false)
              setDeleting(true)
            }, 1500)
          }
        } else {
          if (idx > 0) {
            setDisplayed(text.slice(0, idx - 1))
            setIdx(idx - 1)
          } else {
            setDeleting(false)
          }
        }
      },
      deleting ? speed / 2 : speed
    )
    return () => clearTimeout(timeout)
  }, [idx, deleting, text, speed, loop, isPaused])

  return (
    <motion.span
      className={cn('text-3xl font-bold text-white inline-flex items-baseline', className)}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <span className="relative">
        {displayed.split('').map((char, i) => (
          <motion.span
            key={`${i}-${char}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              type: 'spring' as const,
              stiffness: 500,
              damping: 30,
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
      <motion.span
        className="inline-block w-[3px] h-[0.9em] bg-violet-400 ml-0.5 rounded-full"
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'linear' as const,
          times: [0, 0.5, 1],
        }}
      />
    </motion.span>
  )
}
