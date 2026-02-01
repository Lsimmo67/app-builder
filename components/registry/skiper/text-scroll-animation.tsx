"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface SkiperTextScrollAnimationProps {
  text?: string
  speed?: number
  direction?: "left" | "right"
  className?: string
}

export default function SkiperTextScrollAnimation({
  text = "Scroll to Animate",
  speed = 1,
  direction = "left",
  className,
}: SkiperTextScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const baseMovement = 400 * speed
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left"
      ? [baseMovement, -baseMovement]
      : [-baseMovement, baseMovement]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  )

  const repeatedText = Array(4).fill(text)

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[40vh] w-full items-center overflow-hidden",
        className
      )}
    >
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x, opacity, scale }}
      >
        {repeatedText.map((t, index) => (
          <span
            key={index}
            className="inline-flex items-center text-6xl font-black text-white md:text-8xl lg:text-[10rem]"
          >
            {t}
            <span className="mx-8 inline-block h-4 w-4 rounded-full bg-white/20 md:mx-16 md:h-6 md:w-6" />
          </span>
        ))}
      </motion.div>

      {/* Gradient edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}
