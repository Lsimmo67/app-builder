"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityTextRevealCardProps {
  text?: string
  revealText?: string
  className?: string
}

export default function AceternityTextRevealCard({
  text = "Sometimes, you just need to see it to believe it.",
  revealText = "You just need to see it to believe it.",
  className,
}: AceternityTextRevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [widthPercentage, setWidthPercentage] = useState(0)
  const [isMouseOver, setIsMouseOver] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = (x / rect.width) * 100
    setWidthPercentage(Math.max(0, Math.min(100, percent)))
  }

  useEffect(() => {
    if (!isMouseOver) {
      const timeout = setTimeout(() => setWidthPercentage(0), 100)
      return () => clearTimeout(timeout)
    }
  }, [isMouseOver])

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative w-full max-w-lg mx-auto rounded-lg p-8 bg-[#1d1c20] border border-white/[0.08] overflow-hidden cursor-pointer h-40 flex items-center",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {/* Background text */}
      <p className="text-lg md:text-2xl font-bold text-white/10 select-none">
        {text}
      </p>

      {/* Reveal overlay */}
      <motion.div
        className="absolute inset-0 flex items-center overflow-hidden p-8"
        animate={{ clipPath: `inset(0 ${100 - widthPercentage}% 0 0)` }}
        transition={{ duration: isMouseOver ? 0 : 0.4, ease: "easeOut" }}
      >
        <p className="text-lg md:text-2xl font-bold text-white bg-[#1d1c20] select-none whitespace-nowrap">
          {revealText}
        </p>
      </motion.div>

      {/* Divider line */}
      <motion.div
        className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-indigo-500 to-transparent z-20"
        animate={{ left: `${widthPercentage}%`, opacity: isMouseOver ? 1 : 0 }}
        transition={{ duration: isMouseOver ? 0 : 0.4, ease: "easeOut" }}
      />

      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
