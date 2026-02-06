"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityLoadingSpinnerProps {
  variant?: "orbital" | "dots" | "pulse" | "bars"
  size?: "sm" | "md" | "lg"
  label?: string
  className?: string
}

const sizeMap = {
  sm: { container: "w-8 h-8", text: "text-xs" },
  md: { container: "w-14 h-14", text: "text-sm" },
  lg: { container: "w-20 h-20", text: "text-base" },
}

function OrbitalSpinner({ size }: { size: "sm" | "md" | "lg" }) {
  const s = sizeMap[size]
  return (
    <div className={cn("relative", s.container)}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-purple-500/30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute inset-1.5 rounded-full border-2 border-transparent border-t-cyan-500 border-r-cyan-500/30"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
      />
      {/* Inner dot */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
      </motion.div>
    </div>
  )
}

function DotsSpinner({ size }: { size: "sm" | "md" | "lg" }) {
  const dotCount = 8
  const s = sizeMap[size]
  const dotSize = size === "sm" ? "w-1 h-1" : size === "md" ? "w-1.5 h-1.5" : "w-2 h-2"

  return (
    <div className={cn("relative", s.container)}>
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i / dotCount) * 360
        const delay = (i / dotCount) * 0.8

        return (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-start justify-center"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <motion.div
              className={cn(dotSize, "rounded-full bg-purple-500")}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

function PulseSpinner({ size }: { size: "sm" | "md" | "lg" }) {
  const s = sizeMap[size]
  return (
    <div className={cn("relative flex items-center justify-center", s.container)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-purple-500/50"
          animate={{
            scale: [0.5, 1.5],
            opacity: [0.8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 z-10" />
    </div>
  )
}

function BarsSpinner({ size }: { size: "sm" | "md" | "lg" }) {
  const barCount = 5
  const barHeight = size === "sm" ? "h-4" : size === "md" ? "h-8" : "h-12"
  const barWidth = size === "sm" ? "w-0.5" : size === "md" ? "w-1" : "w-1.5"

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(barWidth, barHeight, "rounded-full bg-gradient-to-t from-purple-500 to-cyan-500")}
          animate={{
            scaleY: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "center" }}
        />
      ))}
    </div>
  )
}

export default function AceternityLoadingSpinner({
  variant = "orbital",
  size = "md",
  label = "",
  className,
}: AceternityLoadingSpinnerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("flex flex-col items-center justify-center gap-4 p-8", className)}
    >
      {variant === "orbital" && <OrbitalSpinner size={size} />}
      {variant === "dots" && <DotsSpinner size={size} />}
      {variant === "pulse" && <PulseSpinner size={size} />}
      {variant === "bars" && <BarsSpinner size={size} />}

      {label && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={cn("text-neutral-500", sizeMap[size].text)}
        >
          {label}
        </motion.p>
      )}
    </motion.div>
  )
}
