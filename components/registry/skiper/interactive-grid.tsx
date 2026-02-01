'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { CSSProperties, useRef, useCallback, useMemo } from 'react'

function GridCell({
  index,
  cols,
  mouseX,
  mouseY,
  containerRef,
}: {
  index: number
  cols: number
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      className="aspect-square rounded-sm cursor-crosshair border border-white/5 bg-white/[0.03]"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.008,
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
        scale: 1.15,
        borderColor: 'rgba(139, 92, 246, 0.6)',
        transition: { duration: 0.2, ease: 'easeOut' as const },
      }}
      whileTap={{
        scale: 0.85,
        backgroundColor: 'rgba(217, 70, 239, 0.6)',
      }}
    />
  )
}

export default function InteractiveGrid({
  className,
  style,
  cols = 8,
  rows = 6,
}: {
  className?: string
  style?: CSSProperties
  cols?: number
  rows?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const cells = useMemo(
    () => Array.from({ length: cols * rows }, (_, i) => i),
    [cols, rows]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  return (
    <motion.div
      ref={containerRef}
      className={cn('w-full max-w-xl p-4', className)}
      style={style}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cells.map((i) => (
          <GridCell
            key={i}
            index={i}
            cols={cols}
            mouseX={mouseX}
            mouseY={mouseY}
            containerRef={containerRef}
          />
        ))}
      </div>
    </motion.div>
  )
}
