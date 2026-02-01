"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityGridBackgroundProps {
  variant?: "grid" | "dot"
  color?: string
  size?: number
  className?: string
  children?: React.ReactNode
}

export default function AceternityGridBackground({
  variant = "grid",
  color = "rgba(255,255,255,0.1)",
  size = 40,
  className,
  children,
}: AceternityGridBackgroundProps) {
  const backgroundStyle =
    variant === "dot"
      ? {
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
        }
      : {
          backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
        }

  return (
    <div
      className={cn(
        "relative flex min-h-[400px] w-full items-center justify-center bg-black dark:bg-black overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0" style={backgroundStyle} />
      {/* Radial gradient fade for center focus */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-10">
        {children || (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
              {variant === "dot" ? "Dot Background" : "Grid Background"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
