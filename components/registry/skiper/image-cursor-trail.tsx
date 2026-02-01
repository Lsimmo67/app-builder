"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface SkiperImageCursorTrailProps {
  images?: string[]
  trailLength?: number
  fadeSpeed?: number
  className?: string
}

interface TrailImage {
  id: number
  x: number
  y: number
  imageIndex: number
}

const defaultImages = [
  "https://placehold.co/200x250/6366f1/ffffff?text=01",
  "https://placehold.co/200x250/ec4899/ffffff?text=02",
  "https://placehold.co/200x250/14b8a6/ffffff?text=03",
  "https://placehold.co/200x250/f97316/ffffff?text=04",
  "https://placehold.co/200x250/8b5cf6/ffffff?text=05",
]

export default function SkiperImageCursorTrail({
  images = defaultImages,
  trailLength = 8,
  fadeSpeed = 0.8,
  className,
}: SkiperImageCursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [trail, setTrail] = useState<TrailImage[]>([])
  const counterRef = useRef(0)
  const imageIndexRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const throttleRef = useRef(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (throttleRef.current) return
      throttleRef.current = true
      setTimeout(() => {
        throttleRef.current = false
      }, 80)

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dx = x - lastPositionRef.current.x
      const dy = y - lastPositionRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 40) return

      lastPositionRef.current = { x, y }

      const newImage: TrailImage = {
        id: counterRef.current++,
        x,
        y,
        imageIndex: imageIndexRef.current % images.length,
      }
      imageIndexRef.current++

      setTrail((prev) => [...prev.slice(-trailLength + 1), newImage])
    },
    [images.length, trailLength]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => {
        if (prev.length === 0) return prev
        return prev.slice(1)
      })
    }, fadeSpeed * 1000)
    return () => clearInterval(interval)
  }, [fadeSpeed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[500px] w-full cursor-none overflow-hidden rounded-xl border border-white/10 bg-black/50",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Helper text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg text-white/20">Move your cursor around</p>
      </div>

      {/* Trail images */}
      <AnimatePresence>
        {trail.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 0.9,
              scale: 1,
              rotate: (index % 2 === 0 ? 1 : -1) * (Math.random() * 15),
            }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute z-10"
            style={{
              left: item.x - 60,
              top: item.y - 75,
            }}
          >
            <div className="h-[150px] w-[120px] overflow-hidden rounded-lg shadow-2xl">
              <img
                src={images[item.imageIndex]}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
