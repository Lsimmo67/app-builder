"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityStepperProps {
  steps?: { title: string; description?: string; content?: string }[]
  className?: string
}

const defaultSteps = [
  {
    title: "Create Account",
    description: "Set up your credentials",
    content: "Enter your email address and create a secure password to get started with your new account.",
  },
  {
    title: "Personal Info",
    description: "Tell us about yourself",
    content: "Provide your name, organization, and role to personalize your experience.",
  },
  {
    title: "Preferences",
    description: "Customize your experience",
    content: "Choose your preferred theme, notification settings, and default workspace configuration.",
  },
  {
    title: "Complete",
    description: "You are all set",
    content: "Congratulations! Your account is ready. Start exploring the platform and build something amazing.",
  },
]

export default function AceternityStepper({
  steps = defaultSteps,
  className,
}: AceternityStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full max-w-lg mx-auto rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden",
        className
      )}
    >
      {/* Step indicators */}
      <div className="px-6 pt-6">
        <div className="flex items-center">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.button
                onClick={() => setCurrentStep(idx)}
                className="relative flex flex-col items-center z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                    idx < currentStep
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 border-transparent text-white"
                      : idx === currentStep
                      ? "bg-neutral-950 border-purple-500 text-purple-400"
                      : "bg-neutral-950 border-neutral-700 text-neutral-600"
                  )}
                  animate={
                    idx === currentStep
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(168,85,247,0)",
                            "0 0 0 6px rgba(168,85,247,0.1)",
                            "0 0 0 0 rgba(168,85,247,0)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    idx === currentStep
                      ? { repeat: Infinity, duration: 2 }
                      : {}
                  }
                >
                  {idx < currentStep ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4"
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
              </motion.button>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-neutral-800 mx-2 relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                    initial={{ width: "0%" }}
                    animate={{
                      width: idx < currentStep ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-white">
              {steps[currentStep].title}
            </h3>
            {steps[currentStep].description && (
              <p className="text-sm text-neutral-500 mt-1">
                {steps[currentStep].description}
              </p>
            )}
            {steps[currentStep].content && (
              <p className="text-sm text-neutral-400 mt-4 leading-relaxed">
                {steps[currentStep].content}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between px-6 pb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={goPrev}
          disabled={currentStep === 0}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            currentStep === 0
              ? "text-neutral-700 cursor-not-allowed"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          )}
        >
          Previous
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={goNext}
          disabled={currentStep === steps.length - 1}
          className={cn(
            "px-5 py-2 rounded-lg text-sm font-medium transition-colors",
            currentStep === steps.length - 1
              ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          )}
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </motion.button>
      </div>
    </motion.div>
  )
}
