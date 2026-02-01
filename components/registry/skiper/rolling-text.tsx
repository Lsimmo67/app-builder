"use client"

import React, { useEffect, useRef } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface SkiperRollingTextProps {
  text?: string
  speed?: number
  direction?: "left" | "right"
  className?: string
}

export default function SkiperRollingText({
  text = "Design with purpose. Build with passion. Ship with confidence.",
  speed = 30,
  direction = "left",
  className,
}: SkiperRollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const repeatedText = Array(6).fill(text)

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden py-4", className)}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {repeatedText.map((t, index) => (
          <span
            key={index}
            className="mx-8 inline-block text-4xl font-bold text-white md:text-6xl lg:text-8xl"
          >
            {t}
            <span className="mx-8 text-white/20">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
