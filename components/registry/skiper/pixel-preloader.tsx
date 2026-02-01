"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface SkiperPixelPreloaderProps {
  gridSize?: number
  color?: string
  speed?: number
  className?: string
}

export default function SkiperPixelPreloader({
  gridSize = 10,
  color = "#6366f1",
  speed = 0.05,
  className,
}: SkiperPixelPreloaderProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  const [phase, setPhase] = useState<"fill" | "clear">("fill")

  const pixels = useMemo(() => {
    const items: { row: number; col: number; delay: number }[] = []
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Randomized reveal order
        const delay = Math.random() * gridSize * speed
        items.push({ row, col, delay })
      }
    }
    return items
  }, [gridSize, speed])

  useEffect(() => {
    if (!isAnimating) return

    const totalDuration = gridSize * speed * 1000 + 500

    const timer = setTimeout(() => {
      if (phase === "fill") {
        setPhase("clear")
      } else {
        setIsAnimating(false)
      }
    }, totalDuration)

    return () => clearTimeout(timer)
  }, [phase, gridSize, speed, isAnimating])

  const handleReplay = () => {
    setPhase("fill")
    setIsAnimating(true)
  }

  return (
    <div
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl bg-black",
        className
      )}
    >
      {isAnimating && (
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {pixels.map(({ row, col, delay }, index) => (
            <motion.div
              key={`${phase}-${index}`}
              initial={{
                opacity: phase === "fill" ? 0 : 1,
                scale: phase === "fill" ? 0 : 1,
              }}
              animate={{
                opacity: phase === "fill" ? 1 : 0,
                scale: phase === "fill" ? 1 : 0,
              }}
              transition={{
                duration: speed * 2,
                delay,
                ease: "easeInOut",
              }}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      {!isAnimating && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleReplay}
          className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10"
        >
          Replay Animation
        </motion.button>
      )}

      {/* Progress indicator */}
      {isAnimating && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: color }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            />
            <span className="text-xs text-white/50">
              {phase === "fill" ? "Loading" : "Complete"}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
