'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

interface GlowCardProps {
  className?: string
  glowColor?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function GlowCard({
  className,
  glowColor = 'rgba(139, 92, 246, 0.4)',
  title = 'Hover Glow',
  description = 'This card radiates a vibrant glow on hover. A subtle yet striking way to draw attention to important content.',
  children,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const glowX = useTransform(smoothX, [0, 1], [0, 100])
  const glowY = useTransform(smoothY, [0, 1], [0, 100])

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, ${glowColor}, transparent 40%)`
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4, boxShadow: `0 0 60px 12px ${glowColor}` }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className={cn(
        'group relative rounded-2xl border border-white/10 bg-zinc-900 p-8',
        className
      )}
    >
      {/* Mouse-following glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />

      {/* Pulsing border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, transparent 50%, ${glowColor})`,
          filter: 'blur(1px)',
        }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      <div className="relative z-10">
        {children ?? (
          <>
            <motion.div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(139,92,246,0.2)' }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </motion.div>
            <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
          </>
        )}
      </div>
    </motion.div>
  )
}
