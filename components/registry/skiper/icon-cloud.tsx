'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { CSSProperties, useMemo, useRef, useCallback } from 'react'

const defaultIcons = [
  '\u269B\uFE0F', '\u{1F537}', '\u{1F7E2}', '\u{1F536}', '\u{1F48E}', '\u{1F52E}',
  '\u{1F300}', '\u2728', '\u{1F680}', '\u26A1', '\u{1F3AF}', '\u{1F4AB}',
]

export default function IconCloud({
  className,
  style,
  icons = defaultIcons,
}: {
  className?: string
  style?: CSSProperties
  icons?: string[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const smoothX = useSpring(rotateX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(rotateY, { stiffness: 50, damping: 20 })

  const positions = useMemo(() => {
    return icons.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / icons.length)
      const theta = Math.sqrt(icons.length * Math.PI) * phi
      const r = 100
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.cos(phi)
      const z = r * Math.sin(phi) * Math.sin(theta)
      return { x, y, z, delay: i * 0.05 }
    })
  }, [icons.length])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      rotateY.set((e.clientX - cx) * 0.15)
      rotateX.set((e.clientY - cy) * -0.15)
    },
    [rotateX, rotateY]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <div
      ref={containerRef}
      className={cn('relative w-64 h-64 flex items-center justify-center', className)}
      style={{ ...style, perspective: 600 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ rotateX: smoothX, rotateY: smoothY, transformStyle: 'preserve-3d' }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' as const }}
      >
        {icons.map((icon, i) => {
          const { x, y, z, delay } = positions[i]
          const scale = (z + 120) / 240
          return (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 text-2xl cursor-pointer select-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: Math.max(0.3, scale), scale: Math.max(0.5, scale) }}
              transition={{ delay, type: 'spring' as const, stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.4, zIndex: 50 }}
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                zIndex: Math.round(z + 100),
              }}
            >
              {icon}
            </motion.span>
          )
        })}
      </motion.div>
    </div>
  )
}
