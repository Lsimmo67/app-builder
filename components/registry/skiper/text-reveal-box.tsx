"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface SkiperTextRevealBoxProps {
  text?: string
  revealColor?: string
  backgroundColor?: string
  className?: string
}

export default function SkiperTextRevealBox({
  text = "We build digital experiences that push the boundaries of creativity and technology.",
  revealColor = "#ffffff",
  backgroundColor = "#0a0a0a",
  className,
}: SkiperTextRevealBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  })

  const words = text.split(" ")

  return (
    <div
      ref={containerRef}
      className={cn("relative py-20", className)}
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="flex flex-wrap text-3xl font-bold leading-relaxed md:text-5xl lg:text-6xl">
          {words.map((word, index) => {
            const start = index / words.length
            const end = (index + 1) / words.length
            return (
              <Word
                key={index}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
                revealColor={revealColor}
              />
            )
          })}
        </p>
      </div>
    </div>
  )
}

function Word({
  word,
  progress,
  range,
  revealColor,
}: {
  word: string
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  range: [number, number]
  revealColor: string
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const color = useTransform(
    progress,
    range,
    [`rgba(255,255,255,0.15)`, revealColor]
  )

  return (
    <motion.span className="mr-3 mt-1 inline-block" style={{ opacity, color }}>
      {word}
    </motion.span>
  )
}
