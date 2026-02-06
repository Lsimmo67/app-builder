'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperMorphingBlobProps {
  colors?: string[]
  speed?: number
  title?: string
  className?: string
}

export default function SkiperMorphingBlob({
  colors = ['#6366f1', '#ec4899', '#8b5cf6'],
  speed = 1,
  title = 'Morphing Blob',
  className,
}: SkiperMorphingBlobProps) {
  const blobPaths = [
    'M44.5,-76.2C57.3,-68.4,67.3,-55.6,74.6,-41.6C81.9,-27.6,86.6,-12.3,85.8,2.6C85,17.5,78.6,32.1,69.4,44.2C60.1,56.3,48,65.9,34.5,72.4C21,78.9,6,82.3,-9.2,81.1C-24.3,79.9,-39.7,74.2,-51.8,64.8C-63.9,55.3,-72.8,42.2,-78,27.5C-83.3,12.8,-85,-3.4,-81.5,-18.4C-78,-33.4,-69.4,-47.2,-57.4,-55.5C-45.4,-63.8,-30.1,-66.6,-15.6,-70.7C-1.1,-74.8,12.6,-80.2,26.2,-80.1C39.8,-80,53.3,-74.4,44.5,-76.2Z',
    'M39.9,-67.8C52.7,-60.4,64.6,-50.8,72.1,-38.3C79.7,-25.8,82.8,-10.4,80.9,4.2C79.1,18.8,72.3,32.7,63,44.3C53.6,55.9,41.7,65.3,28.2,71.3C14.7,77.3,-0.3,79.9,-14.8,77.2C-29.2,74.4,-43.1,66.3,-53.8,55.3C-64.5,44.3,-72,30.4,-76.1,15.1C-80.2,-0.3,-80.9,-17,-75.1,-30.5C-69.3,-44,-57,-54.2,-43.5,-61.2C-30.1,-68.2,-15.1,-71.9,-0.3,-71.4C14.5,-70.8,27.1,-75.2,39.9,-67.8Z',
    'M42.8,-73.5C55.4,-66.8,65.4,-54.5,72.3,-40.8C79.3,-27.1,83.2,-12,82.1,2.6C81,17.2,75,31.2,66.2,43C57.5,54.7,46,64.3,32.9,70.7C19.8,77.2,5.2,80.5,-9.5,79.3C-24.1,78.1,-38.9,72.4,-50.3,63C-61.7,53.5,-69.7,40.2,-75,25.6C-80.2,11,-82.6,-4.8,-79.2,-19.4C-75.8,-34,-66.5,-47.3,-54.5,-54.4C-42.5,-61.5,-27.7,-62.5,-13.9,-67.6C-0.1,-72.7,12.8,-81.9,26.2,-82C39.6,-82.2,30.2,-80.2,42.8,-73.5Z',
  ]

  const baseDuration = 8 / speed

  return (
    <div className={cn('relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      {/* Morphing blobs */}
      {colors.map((blobColor, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 300 + i * 40,
            height: 300 + i * 40,
            left: '50%',
            top: '50%',
            marginLeft: -(150 + i * 20),
            marginTop: -(150 + i * 20),
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            rotate: { duration: baseDuration * (2 + i * 0.5), repeat: Infinity, ease: 'linear' },
            scale: { duration: baseDuration * (1.5 + i * 0.3), repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg viewBox="-100 -100 200 200" className="h-full w-full">
            <motion.path
              d={blobPaths[i % blobPaths.length]}
              fill={blobColor}
              fillOpacity={0.2}
              animate={{
                d: [
                  blobPaths[i % blobPaths.length],
                  blobPaths[(i + 1) % blobPaths.length],
                  blobPaths[(i + 2) % blobPaths.length],
                  blobPaths[i % blobPaths.length],
                ],
              }}
              transition={{
                duration: baseDuration * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ filter: `blur(${2 + i}px)` }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Center content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-sm text-white/50">Organic morphing shapes</p>
      </motion.div>
    </div>
  )
}
