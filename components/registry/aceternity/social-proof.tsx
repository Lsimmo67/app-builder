"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternitySocialProofProps {
  avatars?: string[]
  count?: number
  label?: string
  rating?: number
  className?: string
}

export default function AceternitySocialProof({
  avatars = [],
  count = 2400,
  label = "developers trust us",
  rating = 4.9,
  className,
}: AceternitySocialProofProps) {
  const displayAvatars = avatars.length > 0 ? avatars : Array(5).fill("")
  const initials = ["A", "B", "C", "D", "E"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cn(
        "inline-flex flex-col items-center gap-4 p-6 rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Stacked avatars */}
        <div className="flex -space-x-3">
          {displayAvatars.slice(0, 5).map((avatar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
              className="relative w-9 h-9 rounded-full border-2 border-neutral-900 overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center"
            >
              {avatar ? (
                <img src={avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-xs font-bold">
                  {initials[idx] || "?"}
                </span>
              )}
            </motion.div>
          ))}

          {/* +N more */}
          {count > 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="relative w-9 h-9 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center"
            >
              <span className="text-xs text-neutral-300 font-medium">
                +{count > 1000 ? `${(count / 1000).toFixed(0)}k` : count - 5}
              </span>
            </motion.div>
          )}
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1 mb-0.5"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.svg
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05, type: "spring" }}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(rating) ? "text-yellow-400" : "text-neutral-600"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
            <span className="text-xs text-neutral-400 ml-1">{rating}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-neutral-400"
          >
            <span className="text-white font-semibold">
              {count.toLocaleString()}+
            </span>{" "}
            {label}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
