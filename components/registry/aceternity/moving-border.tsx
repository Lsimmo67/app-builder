"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityMovingBorderProps {
  text?: string
  borderRadius?: string
  duration?: number
  colors?: string[]
  className?: string
  containerClassName?: string
}

export default function AceternityMovingBorder({
  text = "Moving Border Button",
  borderRadius = "1.75rem",
  duration = 4,
  colors = ["#E2CBFF", "#393BB2", "#E2CBFF"],
  className,
  containerClassName,
}: AceternityMovingBorderProps) {
  return (
    <div
      className={cn(
        "relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        containerClassName
      )}
      style={{ borderRadius }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-[-1000%]"
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: `conic-gradient(from 0deg, ${colors.join(", ")})`,
        }}
      />
      {/* Inner content */}
      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
      >
        {text}
      </span>
    </div>
  )
}
