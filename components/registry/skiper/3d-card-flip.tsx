'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface Skiper3dCardFlipProps {
  frontTitle?: string
  frontDescription?: string
  backTitle?: string
  backDescription?: string
  width?: number
  height?: number
  className?: string
}

export default function Skiper3dCardFlip({
  frontTitle = 'Front Side',
  frontDescription = 'Hover or click to flip this card and reveal the back side.',
  backTitle = 'Back Side',
  backDescription = 'This is the back of the card. Click again to flip back.',
  width = 320,
  height = 420,
  className,
}: Skiper3dCardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative cursor-pointer"
        style={{
          width,
          height,
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white shadow-2xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="mb-4 text-5xl">&#9830;</div>
            <h3 className="mb-3 text-2xl font-bold">{frontTitle}</h3>
            <p className="text-sm text-white/80">{frontDescription}</p>
          </motion.div>
          <div className="absolute bottom-4 text-xs text-white/50">Click to flip</div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <motion.div className="text-center">
            <div className="mb-4 text-5xl">&#9733;</div>
            <h3 className="mb-3 text-2xl font-bold">{backTitle}</h3>
            <p className="text-sm text-white/80">{backDescription}</p>
          </motion.div>
          <div className="absolute bottom-4 text-xs text-white/50">Click to flip back</div>
        </div>
      </motion.div>
    </div>
  )
}
