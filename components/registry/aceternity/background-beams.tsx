"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityBackgroundBeamsProps {
  title?: string
  subtitle?: string
  className?: string
}

function Beam({ delay, duration, x }: { delay: number; duration: number; x: number }) {
  return (
    <motion.div
      className="absolute top-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"
      style={{
        left: `${x}%`,
        height: "100%",
      }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{
        opacity: [0, 1, 0.5, 0],
        scaleY: [0, 1, 1, 0],
        y: ["-100%", "100%"],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

export default function AceternityBackgroundBeams({
  title = "Join the waitlist",
  subtitle = "Be the first to experience the future of web development with our next-generation platform.",
  className,
}: AceternityBackgroundBeamsProps) {
  const beams = Array.from({ length: 12 }, (_, i) => ({
    x: (i + 1) * (100 / 13),
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6,
  }))

  return (
    <div
      className={cn(
        "relative min-h-[500px] w-full rounded-md bg-neutral-950 flex flex-col items-center justify-center antialiased overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0">
        {beams.map((beam, i) => (
          <Beam key={i} x={beam.x} delay={beam.delay} duration={beam.duration} />
        ))}
        {/* Diagonal beams */}
        {beams.slice(0, 6).map((beam, i) => (
          <motion.div
            key={`diag-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"
            style={{
              left: `${beam.x}%`,
              height: "140%",
              transform: `rotate(${15 + i * 5}deg)`,
              transformOrigin: "top center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{
              duration: beam.duration * 1.5,
              delay: beam.delay + 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-2xl mx-auto p-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 max-w-lg mx-auto my-4 text-sm"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
