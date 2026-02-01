"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

export interface SkiperHorizontalTextRevealProps {
  text?: string
  speed?: number
  className?: string
}

export default function SkiperHorizontalTextReveal({
  text = "Creative Development Studio",
  speed = 1,
  className,
}: SkiperHorizontalTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const clipPath = useTransform(
    scrollYProgress,
    [0.1, 0.5 / speed],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  )

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-20 * speed}%`]
  )

  return (
    <div
      ref={containerRef}
      className={cn("relative flex min-h-[50vh] items-center overflow-hidden", className)}
    >
      {/* Background ghost text */}
      <motion.div className="whitespace-nowrap" style={{ x }}>
        <span className="text-6xl font-bold text-white/5 md:text-8xl lg:text-[10rem]">
          {text}
        </span>
      </motion.div>

      {/* Revealed text */}
      <motion.div
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{ clipPath }}
      >
        <motion.div className="whitespace-nowrap" style={{ x }}>
          <span className="text-6xl font-bold text-white md:text-8xl lg:text-[10rem]">
            {text}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
