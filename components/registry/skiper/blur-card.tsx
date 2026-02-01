'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, MouseEvent, CSSProperties, ReactNode } from 'react'

export default function BlurCard({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const glowX = useTransform(smoothX, [0, 1], [0, 100])
  const glowY = useTransform(smoothY, [0, 1], [0, 100])

  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}% ${y}%, rgba(139,92,246,0.3), transparent 50%)`
  )

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
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className={cn('relative group cursor-pointer', className)}
      style={style}
    >
      {/* Animated background blur glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-cyan-600/30"
        animate={{
          opacity: isHovered ? 1 : 0.6,
          filter: isHovered ? 'blur(20px)' : 'blur(12px)',
        }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
      />

      {/* Mouse-following glow */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{ background: glowBg, filter: 'blur(16px)' }}
        transition={{ duration: 0.3 }}
      />

      {/* Inner card */}
      <motion.div
        className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl p-6 shadow-xl"
        animate={{
          backdropFilter: isHovered ? 'blur(30px)' : 'blur(16px)',
          borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
        }}
        transition={{ duration: 0.4 }}
      >
        {children ?? (
          <>
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-lg mb-4"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </motion.div>
            <h3 className="text-lg font-semibold text-white mb-2">Frosted Glass</h3>
            <p className="text-white/50 text-sm">
              A glassmorphic card with a frosted blur effect and glowing border on hover.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
