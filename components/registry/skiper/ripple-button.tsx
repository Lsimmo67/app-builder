'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, CSSProperties, MouseEvent } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
}

export default function RippleButton({
  className,
  style,
  children = 'Click Me',
}: {
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
}) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { x, y, id }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800)
  }

  return (
    <motion.button
      ref={btnRef}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 12px 40px -10px rgba(139,92,246,0.4)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
      className={cn(
        'relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-white',
        'bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/25 cursor-pointer',
        className
      )}
      style={style}
      onClick={handleClick}
    >
      {/* Ripple animations */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: r.x - 50,
              top: r.y - 50,
              width: 100,
              height: 100,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
          />
        ))}
      </AnimatePresence>

      {/* Top inner highlight */}
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[11px] bg-gradient-to-b from-white/20 to-transparent"
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.8 }}
      />

      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
