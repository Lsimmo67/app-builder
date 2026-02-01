'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { CSSProperties } from 'react'

export default function ScrollProgress({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [0, 0.5, 1])
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'linear-gradient(90deg, #7c3aed, #d946ef)',
      'linear-gradient(90deg, #d946ef, #06b6d4)',
      'linear-gradient(90deg, #06b6d4, #7c3aed)',
    ]
  )

  return (
    <motion.div
      className={cn('fixed top-0 left-0 w-full h-1 z-50', className)}
      style={{ ...style, opacity }}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: bgGradient,
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        }}
      />
      <motion.div
        className="absolute right-0 top-0 h-3 w-3 -translate-y-1/3 rounded-full bg-violet-400"
        style={{
          left: useTransform(scaleX, (v: number) => `${v * 100}%`),
          opacity: useTransform(scrollYProgress, [0, 0.02], [0, 1]),
          scale: useTransform(scrollYProgress, [0, 0.01, 0.03], [0, 1.5, 1]),
        }}
      />
    </motion.div>
  )
}
