"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

export interface SkiperScrollWithFadeProps {
  children?: React.ReactNode
  fadeHeight?: number
  direction?: "top" | "bottom" | "both"
  className?: string
}

export default function SkiperScrollWithFade({
  children,
  fadeHeight = 80,
  direction = "both",
  className,
}: SkiperScrollWithFadeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const topOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const bottomOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0])

  const defaultContent = (
    <div className="space-y-6 p-6">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          className="rounded-xl bg-white/5 p-6"
        >
          <h3 className="text-lg font-semibold text-white">
            Section {i + 1}
          </h3>
          <p className="mt-2 text-sm text-white/50">
            This is scrollable content that fades at the edges. Scroll to see
            the effect in action. Each section appears with a subtle animation.
          </p>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className={cn("relative h-[400px] w-full", className)}>
      {/* Top fade */}
      {(direction === "top" || direction === "both") && (
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-10"
          style={{
            height: fadeHeight,
            background:
              "linear-gradient(to bottom, rgb(10,10,10) 0%, transparent 100%)",
          }}
        />
      )}

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
      >
        {children || defaultContent}
      </div>

      {/* Bottom fade */}
      {(direction === "bottom" || direction === "both") && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
          style={{
            height: fadeHeight,
            background:
              "linear-gradient(to top, rgb(10,10,10) 0%, transparent 100%)",
          }}
        />
      )}
    </div>
  )
}
