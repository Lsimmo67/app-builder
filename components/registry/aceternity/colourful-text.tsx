"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityColourfulTextProps {
  text?: string
  className?: string
}

const COLORS = [
  "rgb(131, 179, 32)",
  "rgb(47, 195, 106)",
  "rgb(42, 169, 210)",
  "rgb(4, 112, 202)",
  "rgb(107, 57, 202)",
  "rgb(200, 55, 171)",
  "rgb(218, 67, 54)",
  "rgb(208, 118, 47)",
  "rgb(176, 162, 48)",
]

export default function AceternityColourfulText({
  text = "Colourful Text",
  className,
}: AceternityColourfulTextProps) {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % COLORS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const chars = useMemo(() => text.split(""), [text])

  return (
    <span className={cn("text-4xl md:text-6xl font-bold inline-flex", className)}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          animate={{
            color: COLORS[(colorIndex + i) % COLORS.length],
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
