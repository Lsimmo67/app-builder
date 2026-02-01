'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

interface TiltCardProps {
  className?: string
  title?: string
  description?: string
  maxTilt?: number
  children?: React.ReactNode
}

export default function TiltCard({
  className,
  title = '3D Tilt Card',
  description = 'Hover and move your mouse to see this card respond with a subtle 3D tilt effect. Perspective transforms bring cards to life.',
  maxTilt = 10,
  children,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 300 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt])
  const scale = useMotionValue(1)
  const smoothScale = useSpring(scale, springConfig)

  const glareX = useTransform(smoothX, [0, 1], [0, 100])
  const glareY = useTransform(smoothY, [0, 1], [0, 100])
  const glareOpacity = useMotionValue(0)
  const smoothGlare = useSpring(glareOpacity, springConfig)

  const glareBg = useTransform(
    [glareX, glareY, smoothGlare],
    ([x, y, o]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,${Number(o) * 0.15}), transparent 60%)`
  )

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
    scale.set(1.03)
    glareOpacity.set(1)
  }

  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
    scale.set(1)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      style={{
        rotateX,
        rotateY,
        scale: smoothScale,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-8 cursor-pointer',
        className
      )}
    >
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glareBg }}
      />

      {/* Floating content layer with depth */}
      <motion.div
        className="relative z-10"
        style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
      >
        {children ?? (
          <>
            <motion.div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20"
              style={{ transform: 'translateZ(20px)' }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            </motion.div>
            <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
