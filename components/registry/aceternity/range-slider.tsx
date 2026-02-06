"use client"

import React, { useState, useRef, useCallback } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityRangeSliderProps {
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  label?: string
  showValue?: boolean
  className?: string
}

export default function AceternityRangeSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  label = "Volume",
  showValue = true,
  className,
}: AceternityRangeSliderProps) {
  const [value, setValue] = useState(defaultValue)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const percentage = ((value - min) / (max - min)) * 100

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const pct = x / rect.width
      const raw = min + pct * (max - min)
      const stepped = Math.round(raw / step) * step
      setValue(Math.max(min, Math.min(max, stepped)))
    },
    [min, max, step]
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateValue(e.clientX)

    const handleMouseMove = (ev: MouseEvent) => updateValue(ev.clientX)
    const handleMouseUp = () => {
      setIsDragging(false)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full max-w-sm mx-auto space-y-4 p-4", className)}
    >
      {/* Label & value */}
      <div className="flex items-center justify-between">
        {label && <span className="text-sm text-neutral-400">{label}</span>}
        {showValue && (
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-white tabular-nums"
          >
            {value}
          </motion.span>
        )}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 w-full cursor-pointer group"
        onMouseDown={handleMouseDown}
      >
        {/* Background track */}
        <div className="absolute inset-0 rounded-full bg-neutral-800" />

        {/* Filled track */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
          style={{ width: `${percentage}%` }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Glow on filled track */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500/40 to-cyan-500/40 blur-sm"
          style={{ width: `${percentage}%` }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${percentage}%` }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div
            className={cn(
              "relative -ml-2.5 w-5 h-5 rounded-full bg-white border-2 border-purple-500 shadow-lg",
              isDragging && "border-cyan-400"
            )}
            animate={{
              scale: isDragging ? 1.3 : 1,
              boxShadow: isDragging
                ? "0 0 20px rgba(168, 85, 247, 0.5)"
                : "0 0 0px rgba(168, 85, 247, 0)",
            }}
            transition={{ duration: 0.15 }}
          />

          {/* Value tooltip */}
          {isDragging && showValue && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-xs text-white font-medium whitespace-nowrap"
            >
              {value}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 border-r border-b border-neutral-700 transform rotate-45 -mt-1" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Min/max labels */}
      <div className="flex justify-between text-xs text-neutral-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </motion.div>
  )
}
