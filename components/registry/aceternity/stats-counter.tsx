"use client"

import React, { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const spring = useSpring(0, { duration: duration * 1000 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      setDisplayValue(v)
    })
    return unsubscribe
  }, [display])

  return <span>{displayValue}</span>
}

export interface AceternityStatsCounterProps {
  stats?: { value: number; label: string; prefix?: string; suffix?: string }[]
  duration?: number
  className?: string
}

const defaultStats = [
  { value: 10000, label: "Active Users", suffix: "+" },
  { value: 99, label: "Uptime", suffix: "%" },
  { value: 500, label: "Projects Shipped", prefix: "" },
  { value: 24, label: "Support", suffix: "/7" },
]

export default function AceternityStatsCounter({
  stats = defaultStats,
  duration = 2,
  className,
}: AceternityStatsCounterProps) {
  return (
    <div
      className={cn(
        "w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-8",
        className
      )}
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15, duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            {/* Glow behind number */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-2xl rounded-full" />
            <div className="relative text-4xl md:text-5xl font-bold text-white">
              {stat.prefix}
              <AnimatedNumber value={stat.value} duration={duration} />
              {stat.suffix}
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.15 + 0.3, duration: 0.4 }}
            className="mt-2 text-sm text-neutral-400"
          >
            {stat.label}
          </motion.p>
        </motion.div>
      ))}
    </div>
  )
}
