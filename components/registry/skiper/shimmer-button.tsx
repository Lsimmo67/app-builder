'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface ShimmerButtonProps {
  className?: string
  children?: React.ReactNode
  shimmerColor?: string
  backgroundColor?: string
  onClick?: () => void
}

export default function ShimmerButton({
  className,
  children = 'Shimmer Effect',
  shimmerColor = 'rgba(255, 255, 255, 0.3)',
  backgroundColor,
  onClick,
}: ShimmerButtonProps) {
  const shimmerPosition = useMotionValue(-200)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    function runShimmer() {
      shimmerPosition.set(-200)
      animate(shimmerPosition, 200, {
        duration: 2,
        ease: 'easeInOut' as const,
      })
    }
    runShimmer()
    intervalRef.current = setInterval(runShimmer, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [shimmerPosition])

  const shimmerGradient = useTransform(
    shimmerPosition,
    (pos) =>
      `linear-gradient(105deg, transparent 20%, transparent 40%, ${shimmerColor} 50%, transparent 60%, transparent 80%)`
  )

  const shimmerBgPos = useTransform(shimmerPosition, [-200, 200], ['0% center', '200% center'])

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 10px 40px -10px rgba(124,58,237,0.4)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-3.5 font-semibold text-white',
        className
      )}
      style={{
        background: backgroundColor ?? 'linear-gradient(135deg, #7c3aed, #4f46e5)',
      }}
    >
      {/* Shimmer sweep layer */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(105deg, transparent 20%, transparent 40%, ${shimmerColor} 50%, transparent 60%, transparent 80%)`,
          backgroundSize: '200% 100%',
          backgroundPosition: shimmerBgPos,
        }}
      />

      {/* Top inner highlight */}
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[11px] bg-gradient-to-b from-white/20 via-transparent to-transparent"
        whileHover={{ opacity: 0.8 }}
      />

      {/* Hover glow ring */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 blur-md"
        style={{ background: backgroundColor ?? 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
        whileHover={{ opacity: 0.4 }}
        transition={{ duration: 0.3 }}
      />

      <motion.span
        className="relative z-10 flex items-center gap-2"
        whileHover={{ letterSpacing: '0.02em' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
