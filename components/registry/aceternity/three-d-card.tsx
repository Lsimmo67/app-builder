'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'

interface ThreeDCardProps {
  className?: string
  children?: React.ReactNode
  rotationIntensity?: number
  borderGlow?: boolean
}

export default function ThreeDCard({
  className,
  children,
  rotationIntensity = 15,
  borderGlow = true,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const percentX = mouseX / (rect.width / 2)
      const percentY = mouseY / (rect.height / 2)

      setRotateX(-percentY * rotationIntensity)
      setRotateY(percentX * rotationIntensity)
    },
    [rotationIntensity]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setRotateX(0)
    setRotateY(0)
  }, [])

  return (
    <div
      className={cn('flex items-center justify-center p-8', className)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovering ? rotateX : 0,
          rotateY: isHovering ? rotateY : 0,
          scale: isHovering ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-full max-w-sm"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow border */}
        {borderGlow && (
          <motion.div
            className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 blur-sm"
            animate={{ opacity: isHovering ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Card body */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-black p-8">
          {children || (
            <div style={{ transformStyle: 'preserve-3d' }}>
              {/* Floating image */}
              <motion.div
                className="mb-6 overflow-hidden rounded-xl"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                  <svg
                    className="h-16 w-16 text-white/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Floating text */}
              <motion.h3
                className="text-xl font-bold text-white"
                style={{ transform: 'translateZ(50px)' }}
              >
                Interactive 3D Card
              </motion.h3>

              <motion.p
                className="mt-2 text-sm text-neutral-400"
                style={{ transform: 'translateZ(30px)' }}
              >
                Move your mouse over this card to see the 3D tilt effect.
                Elements float at different depths for a parallax feel.
              </motion.p>

              {/* Floating button */}
              <motion.button
                className="mt-6 rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
                style={{ transform: 'translateZ(60px)' }}
              >
                Explore
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
