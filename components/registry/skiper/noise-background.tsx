'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperNoiseBackgroundProps {
  opacity?: number
  animated?: boolean
  color?: string
  title?: string
  className?: string
}

export default function SkiperNoiseBackground({
  opacity = 0.15,
  animated = true,
  color = '#ffffff',
  title = 'Noise Texture',
  className,
}: SkiperNoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)

  const noiseDataUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    const imageData = ctx.createImageData(200, 200)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const value = Math.random() * 255
      imageData.data[i] = value
      imageData.data[i + 1] = value
      imageData.data[i + 2] = value
      imageData.data[i + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas.toDataURL()
  }, [])

  useEffect(() => {
    if (!animated || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width = 150
    const h = canvas.height = 150

    const drawNoise = () => {
      const imageData = ctx.createImageData(w, h)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 255
        imageData.data[i] = value
        imageData.data[i + 1] = value
        imageData.data[i + 2] = value
        imageData.data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      frameRef.current = requestAnimationFrame(drawNoise)
    }

    drawNoise()
    return () => cancelAnimationFrame(frameRef.current)
  }, [animated])

  return (
    <div className={cn('relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      {/* Noise overlay */}
      {animated ? (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{
            opacity,
            mixBlendMode: 'overlay',
            imageRendering: 'pixelated',
          }}
        />
      ) : (
        noiseDataUrl && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url(${noiseDataUrl})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
              opacity,
              mixBlendMode: 'overlay',
            }}
          />
        )
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold" style={{ color }}>{title}</h2>
        <p className="mt-3 text-sm" style={{ color: `${color}80` }}>
          {animated ? 'Animated grain' : 'Static grain'} texture overlay
        </p>
      </motion.div>
    </div>
  )
}
