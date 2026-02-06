'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperLiquidButtonProps {
  label?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function SkiperLiquidButton({
  label = 'Liquid Button',
  color = '#6366f1',
  size = 'md',
  className,
}: SkiperLiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const blobX = useTransform(mouseX, [0, 1], [-20, 20])
  const blobY = useTransform(mouseY, [0, 1], [-10, 10])

  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-5 text-lg',
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.button
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-full font-semibold text-white',
          sizeClasses[size]
        )}
        style={{ backgroundColor: color }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          mouseX.set(0.5)
          mouseY.set(0.5)
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Liquid blob 1 */}
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: '120%',
            height: '200%',
            left: '-10%',
            backgroundColor: `${color}`,
            filter: 'brightness(1.3)',
            x: blobX,
            y: blobY,
          }}
          animate={{
            borderRadius: isHovered
              ? ['30% 70% 70% 30% / 30% 30% 70% 70%', '50% 50% 30% 70% / 60% 40% 60% 40%', '30% 70% 70% 30% / 30% 30% 70% 70%']
              : '50%',
            top: isHovered ? '-50%' : '-100%',
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            borderRadius: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            top: { duration: 0.4 },
            opacity: { duration: 0.3 },
          }}
        />

        {/* Liquid blob 2 */}
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: '100%',
            height: '180%',
            left: '0%',
            backgroundColor: `${color}`,
            filter: 'brightness(1.5)',
          }}
          animate={{
            borderRadius: isHovered
              ? ['60% 40% 30% 70% / 50% 60% 40% 50%', '40% 60% 70% 30% / 40% 50% 60% 50%', '60% 40% 30% 70% / 50% 60% 40% 50%']
              : '50%',
            top: isHovered ? '-40%' : '-100%',
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{
            borderRadius: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            top: { duration: 0.5, delay: 0.1 },
            opacity: { duration: 0.3, delay: 0.1 },
          }}
        />

        {/* Text */}
        <span className="relative z-10">{label}</span>
      </motion.button>
    </div>
  )
}
