"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityRatingStarsProps {
  maxStars?: number
  initialRating?: number
  size?: "sm" | "md" | "lg"
  label?: string
  className?: string
}

const sizes = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-9 h-9",
}

export default function AceternityRatingStars({
  maxStars = 5,
  initialRating = 0,
  size = "md",
  label = "Rate this",
  className,
}: AceternityRatingStarsProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const activeRating = hoverRating || rating

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("flex flex-col items-center gap-3", className)}
    >
      {label && (
        <p className="text-sm text-neutral-400">{label}</p>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }).map((_, idx) => {
          const starValue = idx + 1
          const isFilled = starValue <= activeRating

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(starValue === rating ? 0 : starValue)}
              className="relative focus:outline-none"
            >
              {/* Glow behind active star */}
              {isFilled && (
                <motion.div
                  layoutId={`star-glow-${idx}`}
                  className="absolute inset-0 bg-yellow-400/30 blur-md rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <motion.svg
                className={cn(
                  sizes[size],
                  "relative z-10 transition-colors duration-200",
                  isFilled ? "text-yellow-400" : "text-neutral-700"
                )}
                fill={isFilled ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={isFilled ? 0 : 1.5}
                animate={isFilled ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </motion.svg>
            </motion.button>
          )
        })}
      </div>

      {/* Rating text */}
      <motion.p
        key={activeRating}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-neutral-500"
      >
        {activeRating > 0
          ? `${activeRating} of ${maxStars} stars`
          : "Click to rate"}
      </motion.p>
    </motion.div>
  )
}
