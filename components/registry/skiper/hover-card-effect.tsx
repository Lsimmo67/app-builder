'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent, CSSProperties, ReactNode } from 'react'

export default function HoverCardEffect({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 300 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [0, 1], [12, -12])
  const rotateY = useTransform(smoothX, [0, 1], [-12, 12])
  const scale = useMotionValue(1)
  const smoothScale = useSpring(scale, springConfig)

  const glareX = useTransform(smoothX, [0, 1], [0, 100])
  const glareY = useTransform(smoothY, [0, 1], [0, 100])
  const glareOpacity = useMotionValue(0)
  const smoothGlareOp = useSpring(glareOpacity, springConfig)

  const glareBg = useTransform(
    [glareX, glareY, smoothGlareOp],
    ([x, y, o]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(139,92,246,${Number(o) * 0.15}), transparent 50%)`
  )

  const shadowY = useTransform(smoothY, [0, 1], [20, 5])
  const shadowBlur = useTransform(smoothY, [0, 1], [40, 15])
  const boxShadow = useTransform(
    [shadowY, shadowBlur, smoothGlareOp],
    ([y, b, o]) =>
      `0 ${y}px ${b}px -10px rgba(0,0,0,${0.2 + Number(o) * 0.2})`
  )

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
    scale.set(1.04)
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
        ...style,
        rotateX,
        rotateY,
        scale: smoothScale,
        boxShadow,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={cn(
        'relative rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 cursor-pointer',
        className
      )}
    >
      {/* Dynamic gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: glareBg }}
      />

      {/* Subtle edge glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[15px] border border-violet-500/0"
        animate={{ borderColor: glareOpacity.get() > 0 ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0)' }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative z-10 text-white/80 text-sm"
        style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
      >
        {children ?? (
          <>
            <motion.h3
              className="text-lg font-bold text-white mb-2"
              style={{ transform: 'translateZ(10px)' }}
            >
              3D Hover Card
            </motion.h3>
            <p>Move your cursor over this card to see the 3D tilt effect in action.</p>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
