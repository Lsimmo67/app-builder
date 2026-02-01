'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent, useState } from 'react'

interface SpotlightCardProps {
  className?: string
  title?: string
  description?: string
  spotlightColor?: string
  children?: React.ReactNode
}

export default function SpotlightCard({
  className,
  title = 'Spotlight Effect',
  description = 'Move your mouse across this card to reveal a radial spotlight that follows your cursor. A dynamic way to add depth.',
  spotlightColor = 'rgba(139, 92, 246, 0.15)',
  children,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 300 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const spotX = useTransform(smoothX, [0, 1], [0, 100])
  const spotY = useTransform(smoothY, [0, 1], [0, 100])

  const spotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, ${spotlightColor}, transparent 40%)`
  )

  const borderSpotlight = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}% ${y}%, rgba(139, 92, 246, 0.3), transparent 40%)`
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
      whileHover={{ borderColor: 'rgba(63,63,70,1)' }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-8 cursor-pointer',
        className
      )}
    >
      {/* Main spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlightBg }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Border spotlight glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: borderSpotlight }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Edge highlight on hover */}
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[15px] border border-white/5"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {children ?? (
          <>
            <motion.div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-violet-400"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(39,39,42,1)' }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
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
