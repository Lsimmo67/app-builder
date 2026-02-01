'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

interface MagneticButtonProps {
  className?: string
  children?: React.ReactNode
  magnetStrength?: number
  onClick?: () => void
}

export default function MagneticButton({
  className,
  children = 'Magnetic Button',
  magnetStrength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const resetSpring = { damping: 20, stiffness: 300 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const textX = useTransform(smoothX, (v) => v * 0.5)
  const textY = useTransform(smoothY, (v) => v * 0.5)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    mouseX.set(dx * magnetStrength)
    mouseY.set(dy * magnetStrength)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="inline-flex items-center justify-center p-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
    >
      <motion.button
        onClick={onClick}
        style={{ x: smoothX, y: smoothY }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
        className={cn(
          'group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-zinc-900',
          'shadow-lg shadow-black/10',
          className
        )}
      >
        {/* Hover gradient overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow ring on hover */}
        <motion.div
          className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-violet-500/30 to-indigo-500/30 blur-lg"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Magnetic inner text that moves slightly offset */}
        <motion.span
          className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white"
          style={{ x: textX, y: textY }}
        >
          {children}
          <motion.svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring' as const, stiffness: 300 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </motion.span>
      </motion.button>
    </motion.div>
  )
}
