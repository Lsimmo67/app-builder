'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, MouseEvent, useState } from 'react'

interface MorphingCardProps {
  className?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function MorphingCard({
  className,
  title = 'Morphing Shape',
  description = 'Hover to see this card morph into an organic blob shape. The smooth border-radius transition creates a fluid, playful interaction.',
  children,
}: MorphingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 120 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [0, 1], [5, -5])
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0.5)
        mouseY.set(0.5)
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      animate={{
        borderRadius: isHovered
          ? '30% 70% 70% 30% / 30% 30% 70% 70%'
          : '16px',
        boxShadow: isHovered
          ? '0 25px 60px -12px rgba(139, 92, 246, 0.4)'
          : '0 4px 20px -4px rgba(0, 0, 0, 0.2)',
      }}
      style={{
        rotateX,
        rotateY,
        perspective: 800,
      }}
      transition={{ duration: 0.7, ease: 'easeInOut' as const }}
      className={cn(
        'group relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white cursor-pointer',
        className
      )}
    >
      {/* Inner glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10"
        animate={{ opacity: isHovered ? 0.8 : 0.4 }}
        transition={{ duration: 0.5 }}
      />

      {/* Pulsing blob accent */}
      <motion.div
        className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0.2, 0.4, 0.2] : 0.1,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      <div className="relative z-10">
        {children ?? (
          <>
            <motion.div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20"
              animate={{
                borderRadius: isHovered ? '40% 60% 60% 40%' : '50%',
                rotate: isHovered ? 180 : 0,
              }}
              transition={{ duration: 0.7, ease: 'easeInOut' as const }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
              </svg>
            </motion.div>
            <motion.h3
              className="mb-2 text-xl font-bold"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-sm leading-relaxed text-white/70"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {description}
            </motion.p>
          </>
        )}
      </div>
    </motion.div>
  )
}
