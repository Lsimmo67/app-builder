'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'

interface GlareCardProps {
  className?: string
  children?: React.ReactNode
  glareColor?: string
  glareOpacity?: number
}

export default function GlareCard({
  className,
  children,
  glareColor = 'rgba(255, 255, 255, 0.25)',
  glareOpacity = 0.8,
}: GlareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      setGlarePosition({ x, y })

      const centerX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const centerY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      setRotation({ x: -centerY * 8, y: centerX * 8 })
    },
    []
  )

  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false)
          setRotation({ x: 0, y: 0 })
        }}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovering ? 1.02 : 1,
        }}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/[0.1] bg-neutral-950"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {/* Glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30"
          animate={{
            opacity: isHovering ? glareOpacity : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 60%)`,
          }}
        />

        {/* Shine line */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          animate={{ opacity: isHovering ? 0.3 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `linear-gradient(${
              105 + (glarePosition.x - 50) * 0.5
            }deg, transparent 40%, ${glareColor} 50%, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children || (
            <div className="p-8">
              <div className="mb-6 flex h-48 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">Glare Card</h3>
              <p className="mt-2 text-sm text-neutral-400">
                Hover over this card to see the glare effect follow your cursor.
                The subtle shine creates a premium, glass-like feel.
              </p>

              <div className="mt-6 flex gap-3">
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-400">
                  Premium
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-400">
                  Interactive
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
