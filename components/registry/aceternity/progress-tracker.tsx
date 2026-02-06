"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityProgressTrackerProps {
  steps?: { label: string; description?: string }[]
  currentStep?: number
  className?: string
}

const defaultSteps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Settings", description: "Configure preferences" },
  { label: "Complete", description: "Ready to go" },
]

export default function AceternityProgressTracker({
  steps = defaultSteps,
  currentStep = 1,
  className,
}: AceternityProgressTrackerProps) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-8", className)}>
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-800" />

        {/* Progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
          initial={{ width: "0%" }}
          animate={{
            width: `${Math.max(0, ((currentStep) / (steps.length - 1)) * 100)}%`,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep
          const isCurrent = idx === currentStep
          const isUpcoming = idx > currentStep

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="relative flex flex-col items-center z-10"
            >
              {/* Step circle */}
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors",
                  isCompleted &&
                    "bg-gradient-to-r from-purple-500 to-cyan-500 border-transparent text-white",
                  isCurrent &&
                    "bg-neutral-950 border-purple-500 text-purple-400",
                  isUpcoming &&
                    "bg-neutral-950 border-neutral-700 text-neutral-600"
                )}
                animate={
                  isCurrent
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(168, 85, 247, 0)",
                          "0 0 0 8px rgba(168, 85, 247, 0.15)",
                          "0 0 0 0 rgba(168, 85, 247, 0)",
                        ],
                      }
                    : {}
                }
                transition={
                  isCurrent
                    ? { repeat: Infinity, duration: 2, ease: "easeInOut" }
                    : {}
                }
              >
                {isCompleted ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  idx + 1
                )}
              </motion.div>

              {/* Label */}
              <motion.p
                className={cn(
                  "mt-3 text-sm font-medium",
                  isCompleted && "text-white",
                  isCurrent && "text-purple-400",
                  isUpcoming && "text-neutral-600"
                )}
                animate={{ opacity: isCurrent ? 1 : isCompleted ? 0.9 : 0.5 }}
              >
                {step.label}
              </motion.p>

              {/* Description */}
              {step.description && (
                <motion.p
                  className="text-xs text-neutral-500 mt-1 text-center max-w-[100px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isCurrent ? 1 : 0.4 }}
                  transition={{ delay: 0.3 }}
                >
                  {step.description}
                </motion.p>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
