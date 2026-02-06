"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityFeatureCardProps {
  icon?: string
  title?: string
  description?: string
  className?: string
}

export default function AceternityFeatureCard({
  icon = "🚀",
  title = "Lightning Fast",
  description = "Built for speed with optimized performance that scales with your needs.",
  className,
}: AceternityFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group w-full max-w-sm mx-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-8 overflow-hidden cursor-pointer",
        className
      )}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Radial glow behind icon */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          scale: isHovered ? 1.3 : 0.8,
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10">
        <motion.div
          className="text-4xl mb-6"
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? [0, -10, 10, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.div>

        <motion.h3
          className="text-xl font-bold text-white mb-3"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-sm text-neutral-400 leading-relaxed"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="mt-6 flex items-center gap-2 text-sm font-medium text-purple-400"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.3 }}
        >
          Learn more
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            &rarr;
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  )
}
