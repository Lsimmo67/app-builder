"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityFlipWordsProps {
  words?: string[]
  duration?: number
  className?: string
}

export default function AceternityFlipWords({
  words = ["better", "modern", "beautiful", "awesome"],
  duration = 3000,
  className,
}: AceternityFlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = useCallback(() => {
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % words.length)
    setTimeout(() => setIsAnimating(false), 600)
  }, [words.length])

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(startAnimation, duration)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, duration, startAnimation])

  return (
    <div className={cn("inline-block relative", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block font-bold text-neutral-900 dark:text-neutral-100"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
