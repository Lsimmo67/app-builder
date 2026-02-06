"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityPricingCardProps {
  planName?: string
  price?: string
  period?: string
  features?: { text: string }[]
  highlighted?: boolean
  ctaText?: string
  className?: string
}

const defaultFeatures = [
  { text: "Unlimited projects" },
  { text: "Priority support" },
  { text: "Advanced analytics" },
  { text: "Custom integrations" },
  { text: "Team collaboration" },
]

export default function AceternityPricingCard({
  planName = "Pro",
  price = "$29",
  period = "/month",
  features = defaultFeatures,
  highlighted = false,
  ctaText = "Get Started",
  className,
}: AceternityPricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden",
        className
      )}
    >
      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute -inset-[1px] rounded-2xl opacity-0 blur-sm transition-opacity duration-500",
          highlighted
            ? "bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
            : "bg-gradient-to-r from-neutral-500 via-neutral-300 to-neutral-500"
        )}
        animate={{ opacity: isHovered ? 0.7 : highlighted ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card body */}
      <div
        className={cn(
          "relative rounded-2xl border p-8 flex flex-col",
          highlighted
            ? "bg-gradient-to-b from-neutral-900 to-black border-purple-500/30"
            : "bg-neutral-950 border-neutral-800"
        )}
      >
        {highlighted && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-semibold px-4 py-1 rounded-full"
          >
            Most Popular
          </motion.span>
        )}

        <h3 className="text-lg font-semibold text-neutral-300">{planName}</h3>

        <div className="mt-4 flex items-baseline gap-1">
          <motion.span
            className="text-5xl font-bold text-white"
            key={price}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {price}
          </motion.span>
          <span className="text-neutral-500 text-sm">{period}</span>
        </div>

        <div className="mt-8 space-y-3 flex-1">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.08, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <svg
                className={cn(
                  "w-4 h-4 shrink-0",
                  highlighted ? "text-cyan-400" : "text-neutral-500"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-neutral-400">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "mt-8 w-full py-3 rounded-xl font-medium text-sm transition-colors",
            highlighted
              ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          )}
        >
          {ctaText}
        </motion.button>
      </div>
    </motion.div>
  )
}
