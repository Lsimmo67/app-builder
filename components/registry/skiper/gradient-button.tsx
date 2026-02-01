'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface GradientButtonProps {
  className?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function GradientButton({
  className,
  children = 'Get Started',
  size = 'md',
  onClick,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const shimmerX = useMotionValue(-100)
  const shimmerOpacity = useTransform(shimmerX, [-100, 50, 200], [0, 1, 0])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    function runShimmer() {
      animate(shimmerX, 200, {
        duration: 1.5,
        ease: 'easeInOut' as const,
        onComplete: () => shimmerX.set(-100),
      })
    }
    runShimmer()
    intervalRef.current = setInterval(runShimmer, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [shimmerX])

  const gradientAngle = useMotionValue(135)

  useEffect(() => {
    const controls = animate(gradientAngle, [135, 225, 315, 45, 135], {
      duration: 8,
      repeat: Infinity,
      ease: 'linear' as const,
    })
    return controls.stop
  }, [gradientAngle])

  const backgroundGradient = useTransform(
    gradientAngle,
    (angle) =>
      `linear-gradient(${angle}deg, #7c3aed, #6366f1, #9333ea, #7c3aed)`
  )

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04, boxShadow: '0 10px 40px -10px rgba(124,58,237,0.5)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
      style={{ background: backgroundGradient }}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold text-white',
        sizeClasses[size],
        className
      )}
    >
      {/* Animated border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100"
        style={{ background: backgroundGradient, filter: 'blur(8px)' }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
          x: shimmerX,
          opacity: shimmerOpacity,
        }}
      />

      {/* Top inner highlight */}
      <div className="pointer-events-none absolute inset-px rounded-[11px] bg-gradient-to-b from-white/25 to-transparent" />

      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring' as const, stiffness: 300 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </motion.svg>
      </span>
    </motion.button>
  )
}
