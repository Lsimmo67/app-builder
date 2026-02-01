"use client"

import React, { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityCompareProps {
  beforeImage?: string
  afterImage?: string
  className?: string
}

export default function AceternityCompare({
  beforeImage = "https://placehold.co/800x600/1a1a2e/ffffff?text=Before",
  afterImage = "https://placehold.co/800x600/2d5a27/ffffff?text=After",
  className,
}: AceternityCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const percent = (x / rect.width) * 100
      setSliderPosition(percent)
    },
    []
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging, handleMove]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging, handleMove]
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden cursor-col-resize select-none border border-neutral-200 dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After image (full) */}
      <img
        src={afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      />
      {/* Slider handle */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-40 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing border-2 border-neutral-300"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onTouchStart={() => setIsDragging(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-600"
        >
          <path d="M18 8L22 12L18 16" />
          <path d="M6 8L2 12L6 16" />
        </svg>
      </motion.div>
      {/* Labels */}
      <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-black/50 rounded text-white text-xs font-medium">
        Before
      </div>
      <div className="absolute top-3 right-3 z-20 px-2 py-1 bg-black/50 rounded text-white text-xs font-medium">
        After
      </div>
    </div>
  )
}
