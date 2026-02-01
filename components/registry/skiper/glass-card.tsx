'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

interface GlassCardProps {
  className?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function GlassCard({
  className,
  title = 'Glassmorphism',
  description = 'A beautifully frosted glass card with depth and translucency. Perfect for layered, modern interfaces.',
  children,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6])
  const gradientX = useTransform(smoothX, [-0.5, 0.5], [0, 100])
  const gradientY = useTransform(smoothY, [-0.5, 0.5], [0, 100])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl',
        'p-8 shadow-2xl cursor-pointer',
        className
      )}
    >
      {/* Mouse-tracking gradient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(139,92,246,0.25), transparent 60%)`
          ),
        }}
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />

      {/* Accent glow blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl"
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.35, 0.2, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      <motion.div
        className="relative z-10"
        style={{ transform: 'translateZ(30px)' }}
      >
        {children ?? (
          <>
            <motion.div
              className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              Featured
            </motion.div>
            <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/60">{description}</p>
            <div className="flex items-center gap-3">
              <motion.div
                className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400"
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: 'spring' as const, stiffness: 300 }}
              />
              <div>
                <p className="text-sm font-medium text-white">Alex Morgan</p>
                <p className="text-xs text-white/40">Product Designer</p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
