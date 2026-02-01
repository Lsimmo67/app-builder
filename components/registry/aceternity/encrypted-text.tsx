"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityEncryptedTextProps {
  text?: string
  speed?: number
  className?: string
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

export default function AceternityEncryptedText({
  text = "Encrypted Text Effect",
  speed = 50,
  className,
}: AceternityEncryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isRevealed, setIsRevealed] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const scramble = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsRevealed(false)

    let iteration = 0
    const length = text.length

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " "
            if (idx < iteration) return text[idx]
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          })
          .join("")
      )

      iteration += 1 / 3

      if (iteration >= length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsAnimating(false)
        setIsRevealed(true)
      }
    }, speed)
  }, [text, speed, isAnimating])

  useEffect(() => {
    scramble()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      className={cn(
        "font-mono text-2xl md:text-4xl font-bold cursor-pointer select-none",
        className
      )}
      onMouseEnter={scramble}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="inline-flex overflow-hidden">
        {displayText.split("").map((char, i) => (
          <motion.span
            key={i}
            className={cn(
              "inline-block transition-colors duration-200",
              isRevealed
                ? "text-neutral-900 dark:text-white"
                : "text-emerald-500 dark:text-emerald-400"
            )}
            animate={
              !isRevealed && i >= displayText.indexOf(text[i])
                ? { opacity: [0.5, 1] }
                : {}
            }
            transition={{ duration: 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </motion.div>
  )
}
