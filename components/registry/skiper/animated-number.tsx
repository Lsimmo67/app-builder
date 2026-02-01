"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

export interface SkiperAnimatedNumberProps {
  value?: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

function AnimatedCounter({
  value,
  duration,
  decimals,
}: {
  value: number
  duration: number
  decimals: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  })
  const display = useTransform(spring, (current) =>
    current.toFixed(decimals)
  )
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [display])

  return <span ref={ref}>{displayValue}</span>
}

export default function SkiperAnimatedNumber({
  value = 12847,
  duration = 2,
  prefix = "",
  suffix = "+",
  decimals = 0,
  className,
}: SkiperAnimatedNumberProps) {
  return (
    <div className={cn("inline-flex items-baseline", className)}>
      {prefix && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold text-white/60 md:text-6xl"
        >
          {prefix}
        </motion.span>
      )}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="tabular-nums text-5xl font-bold text-white md:text-7xl"
      >
        <AnimatedCounter
          value={value}
          duration={duration}
          decimals={decimals}
        />
      </motion.span>
      {suffix && (
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: duration * 0.8 }}
          className="text-4xl font-bold text-white/60 md:text-6xl"
        >
          {suffix}
        </motion.span>
      )}
    </div>
  )
}
