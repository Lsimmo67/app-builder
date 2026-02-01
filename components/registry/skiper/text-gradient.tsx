'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, animate, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface TextGradientProps {
  className?: string
  text?: string
  from?: string
  to?: string
  via?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
}

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-7xl md:text-8xl',
}

export default function TextGradient({
  className,
  text = 'Stunning Gradient Text',
  from = '#8b5cf6',
  to = '#06b6d4',
  via = '#ec4899',
  size = 'xl',
  animate: shouldAnimate = true,
}: TextGradientProps) {
  const bgPosition = useMotionValue(0)

  useEffect(() => {
    if (!shouldAnimate) return
    const controls = animate(bgPosition, 100, {
      duration: 5,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut' as const,
    })
    return controls.stop
  }, [shouldAnimate, bgPosition])

  const backgroundPosition = useTransform(bgPosition, (v) => `${v}% 50%`)

  return (
    <motion.div
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: 'easeOut' as const }}
    >
      <motion.h2
        className={cn(
          'font-extrabold leading-tight tracking-tight',
          sizeClasses[size]
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, ${from}, ${via}, ${to}, ${from})`,
          backgroundSize: shouldAnimate ? '300% 300%' : '100% 100%',
          backgroundPosition: shouldAnimate ? backgroundPosition : undefined,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring' as const, stiffness: 300 }}
      >
        {text}
      </motion.h2>

      {/* Subtle glow underneath */}
      {shouldAnimate && (
        <motion.div
          className="pointer-events-none absolute -bottom-4 left-1/4 right-1/4 h-8 rounded-full blur-2xl"
          style={{
            background: `linear-gradient(90deg, ${from}44, ${via}44, ${to}44)`,
          }}
          animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      )}
    </motion.div>
  )
}
