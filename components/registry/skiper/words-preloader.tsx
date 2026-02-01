"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface SkiperWordsPreloaderProps {
  words?: string[]
  speed?: number
  backgroundColor?: string
  textColor?: string
  className?: string
}

const defaultWords = [
  "Design",
  "Create",
  "Build",
  "Ship",
  "Iterate",
]

export default function SkiperWordsPreloader({
  words = defaultWords,
  speed = 0.8,
  backgroundColor = "#000000",
  textColor = "#ffffff",
  className,
}: SkiperWordsPreloaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isComplete) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= words.length - 1) {
          setIsComplete(true)
          return prev
        }
        return prev + 1
      })
    }, speed * 1000)

    return () => clearInterval(interval)
  }, [words.length, speed, isComplete])

  const handleReplay = () => {
    setCurrentIndex(0)
    setIsComplete(false)
  }

  return (
    <motion.div
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl",
        className
      )}
      style={{ backgroundColor }}
      animate={{
        opacity: isComplete ? [1, 0.97, 1] : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            transition={{
              duration: speed * 0.4,
              ease: [0.25, 0.1, 0, 1],
            }}
            className="text-center"
          >
            <span
              className="text-5xl font-bold md:text-7xl"
              style={{ color: textColor }}
            >
              {words[currentIndex]}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex gap-2">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-lg font-medium"
                  style={{ color: `${textColor}80` }}
                >
                  {word}{i < words.length - 1 ? " /" : ""}
                </motion.span>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleReplay}
              className="mt-2 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/10"
            >
              Replay
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      {!isComplete && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
          {words.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-6 rounded-full"
              animate={{
                backgroundColor:
                  i <= currentIndex ? textColor : `${textColor}20`,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
