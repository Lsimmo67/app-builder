"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityCountdownTimerProps {
  targetDate?: string
  label?: string
  className?: string
}

function FlipDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0")

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-20 md:w-24 md:h-28">
        <div className="absolute inset-0 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          {/* Separator line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-800 z-10" />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={display}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ perspective: 200 }}
            >
              <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
                {display}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-xl bg-gradient-to-b from-purple-500/20 to-cyan-500/20 blur-md -z-10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      </div>
      <span className="mt-2 text-xs text-neutral-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <motion.div
      className="flex flex-col gap-2 pb-6"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <div className="w-2 h-2 rounded-full bg-purple-500" />
      <div className="w-2 h-2 rounded-full bg-cyan-500" />
    </motion.div>
  )
}

export default function AceternityCountdownTimer({
  targetDate = "",
  label = "Launch countdown",
  className,
}: AceternityCountdownTimerProps) {
  const getTarget = useCallback(() => {
    if (targetDate) return new Date(targetDate).getTime()
    // Default: 7 days from now
    return Date.now() + 7 * 24 * 60 * 60 * 1000
  }, [targetDate])

  const [target] = useState(getTarget)

  const calcRemaining = useCallback(() => {
    const diff = Math.max(0, target - Date.now())
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }, [target])

  const [time, setTime] = useState(calcRemaining)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calcRemaining())
    }, 1000)
    return () => clearInterval(interval)
  }, [calcRemaining])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cn("flex flex-col items-center gap-6 p-8", className)}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-medium uppercase tracking-widest text-neutral-400"
      >
        {label}
      </motion.p>

      <div className="flex items-center gap-3 md:gap-4">
        <FlipDigit value={time.days} label="Days" />
        <Separator />
        <FlipDigit value={time.hours} label="Hours" />
        <Separator />
        <FlipDigit value={time.minutes} label="Min" />
        <Separator />
        <FlipDigit value={time.seconds} label="Sec" />
      </div>
    </motion.div>
  )
}
