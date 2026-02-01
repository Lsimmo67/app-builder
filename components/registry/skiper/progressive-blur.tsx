"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface SkiperProgressiveBlurProps {
  intensity?: number
  direction?: "top" | "bottom" | "left" | "right"
  children?: React.ReactNode
  className?: string
}

export default function SkiperProgressiveBlur({
  intensity = 10,
  direction = "bottom",
  children,
  className,
}: SkiperProgressiveBlurProps) {
  const steps = 6

  const getGradientDirection = () => {
    switch (direction) {
      case "top":
        return "to top"
      case "bottom":
        return "to bottom"
      case "left":
        return "to left"
      case "right":
        return "to right"
    }
  }

  const getPositionStyles = (stepIndex: number) => {
    const fraction = stepIndex / steps
    const nextFraction = (stepIndex + 1) / steps

    const base: React.CSSProperties = {
      position: "absolute",
      backdropFilter: `blur(${(stepIndex / steps) * intensity}px)`,
      WebkitBackdropFilter: `blur(${(stepIndex / steps) * intensity}px)`,
      maskImage: `linear-gradient(${getGradientDirection()}, transparent ${fraction * 100}%, black ${nextFraction * 100}%)`,
      WebkitMaskImage: `linear-gradient(${getGradientDirection()}, transparent ${fraction * 100}%, black ${nextFraction * 100}%)`,
    }

    switch (direction) {
      case "top":
        return { ...base, top: 0, left: 0, right: 0, height: `${nextFraction * 100}%` }
      case "bottom":
        return { ...base, bottom: 0, left: 0, right: 0, height: `${nextFraction * 100}%` }
      case "left":
        return { ...base, top: 0, left: 0, bottom: 0, width: `${nextFraction * 100}%` }
      case "right":
        return { ...base, top: 0, right: 0, bottom: 0, width: `${nextFraction * 100}%` }
    }
  }

  const defaultContent = (
    <div className="flex h-[400px] w-full items-center justify-center">
      <div className="grid grid-cols-3 gap-4 p-8">
        {Array.from({ length: 9 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="h-24 w-24 rounded-xl"
            style={{
              background: `linear-gradient(135deg, hsl(${i * 40}, 70%, 50%) 0%, hsl(${i * 40 + 30}, 70%, 40%) 100%)`,
            }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children || defaultContent}

      {/* Progressive blur layers */}
      {Array.from({ length: steps }, (_, i) => (
        <div
          key={i}
          className="pointer-events-none"
          style={getPositionStyles(i)}
        />
      ))}
    </div>
  )
}
