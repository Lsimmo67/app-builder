'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperDepthCardProps {
  title?: string
  description?: string
  layers?: number
  className?: string
}

export default function SkiperDepthCard({
  title = 'Depth Card',
  description = 'A card with layered depth perception that responds to mouse movement.',
  layers = 4,
  className,
}: SkiperDepthCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const layerColors = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe']
  const layerItems = Array.from({ length: layers }, (_, i) => i)

  return (
    <div
      className={cn('flex h-[500px] w-full items-center justify-center', className)}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={containerRef}
        className="relative h-[380px] w-[300px] cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background layers with depth */}
        {layerItems.map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl border border-white/5"
            style={{
              transform: `translateZ(${-i * 15}px)`,
              backgroundColor: `${layerColors[i % layerColors.length]}${Math.round(15 - i * 3).toString(16).padStart(2, '0')}`,
              boxShadow: `0 ${4 + i * 2}px ${20 + i * 10}px rgba(0,0,0,0.2)`,
            }}
          />
        ))}

        {/* Main card face */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/15 bg-zinc-900/90 p-8 shadow-2xl"
          style={{
            transform: 'translateZ(20px)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="flex h-full flex-col justify-between text-white">
            <div>
              <motion.div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20"
                style={{ transform: 'translateZ(10px)' }}
              >
                <span className="text-xl text-indigo-400">&#9670;</span>
              </motion.div>
              <h3
                className="mb-2 text-xl font-bold"
                style={{ transform: 'translateZ(15px)' }}
              >
                {title}
              </h3>
              <p
                className="text-sm text-white/60"
                style={{ transform: 'translateZ(12px)' }}
              >
                {description}
              </p>
            </div>

            {/* Bottom metric bars */}
            <div className="space-y-3" style={{ transform: 'translateZ(8px)' }}>
              {['Performance', 'Design', 'UX'].map((label, i) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-white/50">{label}</span>
                    <span className="text-white/30">{85 + i * 5}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: layerColors[i] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${85 + i * 5}%` }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
