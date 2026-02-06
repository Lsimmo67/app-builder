'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperMagneticButtonProps {
  label?: string
  color?: string
  strength?: number
  className?: string
}

export default function SkiperMagneticButton({
  label = 'Magnetic',
  color = '#6366f1',
  strength = 0.4,
  className,
}: SkiperMagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const textX = useMotionValue(0)
  const textY = useMotionValue(0)
  const springTextX = useSpring(textX, { stiffness: 200, damping: 20, mass: 0.1 })
  const springTextY = useSpring(textY, { stiffness: 200, damping: 20, mass: 0.1 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY

    x.set(distX * strength)
    y.set(distY * strength)
    textX.set(distX * strength * 0.6)
    textY.set(distY * strength * 0.6)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    textX.set(0)
    textY.set(0)
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.button
        ref={buttonRef}
        className="relative cursor-pointer overflow-hidden rounded-full border-2 px-10 py-4 text-lg font-semibold transition-colors"
        style={{
          x: springX,
          y: springY,
          borderColor: color,
          color,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.9 }}
      >
        {/* Hover fill */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Text that also follows with slight delay */}
        <motion.span
          className="relative z-10 inline-block mix-blend-difference"
          style={{
            x: springTextX,
            y: springTextY,
            color: '#ffffff',
          }}
        >
          {label}
        </motion.span>
      </motion.button>
    </div>
  )
}
