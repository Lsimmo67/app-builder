"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface SkiperStairsPreloaderProps {
  steps?: number
  color?: string
  duration?: number
  className?: string
}

export default function SkiperStairsPreloader({
  steps = 5,
  color = "#6366f1",
  duration = 1.5,
  className,
}: SkiperStairsPreloaderProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  const [phase, setPhase] = useState<"enter" | "exit">("enter")

  useEffect(() => {
    if (!isAnimating) return

    const timer = setTimeout(() => {
      if (phase === "enter") {
        setPhase("exit")
      } else {
        setPhase("enter")
      }
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [phase, duration, isAnimating])

  const handleReplay = () => {
    setPhase("enter")
    setIsAnimating(true)
  }

  return (
    <div
      className={cn(
        "relative h-[300px] w-full overflow-hidden rounded-xl bg-black",
        className
      )}
    >
      {/* Stair columns */}
      <AnimatePresence mode="wait">
        {isAnimating && (
          <div className="absolute inset-0 flex">
            {Array.from({ length: steps }, (_, index) => (
              <motion.div
                key={`${phase}-${index}`}
                className="flex-1"
                initial={{
                  scaleY: phase === "enter" ? 0 : 1,
                }}
                animate={{
                  scaleY: phase === "enter" ? 1 : 0,
                }}
                transition={{
                  duration: duration * 0.4,
                  delay: index * (duration * 0.08),
                  ease: [0.65, 0, 0.35, 1],
                }}
                style={{
                  backgroundColor: color,
                  originY: phase === "enter" ? 0 : 1,
                }}
                onAnimationComplete={() => {
                  if (index === steps - 1 && phase === "exit") {
                    setIsAnimating(false)
                  }
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
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
      </div>

      {/* Loading text */}
      {isAnimating && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm font-medium text-white/80">Loading...</span>
        </motion.div>
      )}
    </div>
  )
}
