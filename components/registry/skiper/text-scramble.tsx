'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, CSSProperties, useCallback } from 'react'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function TextScramble({
  className,
  style,
  text = 'Decrypting...',
  speed = 40,
}: {
  className?: string
  style?: CSSProperties
  text?: string
  speed?: number
}) {
  const [display, setDisplay] = useState('')
  const [hasScrambled, setHasScrambled] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-50px' })
  const frameRef = useRef(0)
  const rafRef = useRef(0)

  const scramble = useCallback(() => {
    let frame = 0
    setHasScrambled(true)

    function run() {
      frame++
      const result = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < frame / 3) return ch
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      setDisplay(result)
      if (frame < text.length * 3 + 10) {
        rafRef.current = requestAnimationFrame(run)
      }
    }

    const timeout = setTimeout(run, speed)
    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafRef.current)
    }
  }, [text, speed])

  useEffect(() => {
    if (isInView) {
      const cleanup = scramble()
      return cleanup
    } else {
      setDisplay(
        text
          .split('')
          .map((ch) => (ch === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))
          .join('')
      )
      setHasScrambled(false)
    }
  }, [isInView, scramble, text])

  return (
    <motion.span
      ref={containerRef}
      className={cn(
        'font-mono text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent inline-block',
        className
      )}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' as const }}
      whileHover={{ scale: 1.03 }}
    >
      {display.split('').map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
          style={{
            display: 'inline-block',
            minWidth: char === ' ' ? '0.25em' : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}

      {/* Cursor blink effect while scrambling */}
      <motion.span
        className="inline-block w-[2px] h-[1em] ml-1 align-middle"
        style={{ backgroundColor: '#34d399' }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' as const }}
      />
    </motion.span>
  )
}
