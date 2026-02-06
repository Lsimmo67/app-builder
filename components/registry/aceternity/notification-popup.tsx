"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityNotificationPopupProps {
  title?: string
  message?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  autoShow?: boolean
  className?: string
}

const typeStyles = {
  success: {
    bg: "bg-emerald-500/10 border-emerald-500/30",
    icon: "text-emerald-400",
    bar: "bg-emerald-500",
  },
  error: {
    bg: "bg-red-500/10 border-red-500/30",
    icon: "text-red-400",
    bar: "bg-red-500",
  },
  warning: {
    bg: "bg-amber-500/10 border-amber-500/30",
    icon: "text-amber-400",
    bar: "bg-amber-500",
  },
  info: {
    bg: "bg-blue-500/10 border-blue-500/30",
    icon: "text-blue-400",
    bar: "bg-blue-500",
  },
}

const icons = {
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
}

export default function AceternityNotificationPopup({
  title = "Success!",
  message = "Your changes have been saved successfully.",
  type = "success",
  duration = 5000,
  position = "top-right",
  autoShow = true,
  className,
}: AceternityNotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(autoShow)
  const styles = typeStyles[type]

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => setIsVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration])

  return (
    <div className={cn("relative min-h-[200px]", className)}>
      {!isVisible && (
        <div className="flex items-center justify-center h-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVisible(true)}
            className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-sm hover:bg-neutral-700 transition-colors"
          >
            Show Notification
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={cn(
              "absolute z-50 w-80 rounded-xl border backdrop-blur-sm p-4",
              styles.bg,
              positionClasses[position]
            )}
          >
            <div className="flex items-start gap-3">
              <span className={cn("shrink-0 mt-0.5", styles.icon)}>
                {icons[type]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-neutral-400 mt-1">{message}</p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="shrink-0 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <motion.div
              className={cn("absolute bottom-0 left-0 h-0.5 rounded-b-xl", styles.bar)}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
