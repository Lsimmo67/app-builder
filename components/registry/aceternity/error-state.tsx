"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityErrorStateProps {
  title?: string
  message?: string
  code?: string
  retryLabel?: string
  className?: string
}

export default function AceternityErrorState({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  code = "500",
  retryLabel = "Try Again",
  className,
}: AceternityErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    setTimeout(() => setIsRetrying(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={cn(
        "flex flex-col items-center justify-center p-12 rounded-2xl border border-red-500/20 bg-neutral-950",
        className
      )}
    >
      {/* Animated error icon */}
      <motion.div className="relative mb-6">
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-500/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
        <motion.div
          className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center"
          animate={isRetrying ? { rotate: 360 } : {}}
          transition={isRetrying ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
        >
          {isRetrying ? (
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ) : (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-8 h-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </motion.svg>
          )}
        </motion.div>
      </motion.div>

      {/* Error code */}
      {code && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-xs font-mono text-red-400/60 mb-2 px-3 py-1 rounded-full bg-red-500/5 border border-red-500/10"
        >
          Error {code}
        </motion.span>
      )}

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-white mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-neutral-400 text-center max-w-md mb-8"
      >
        {message}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRetry}
        disabled={isRetrying}
        className={cn(
          "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors",
          isRetrying
            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
        )}
      >
        <svg
          className={cn("w-4 h-4", isRetrying && "animate-spin")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {isRetrying ? "Retrying..." : retryLabel}
      </motion.button>
    </motion.div>
  )
}
