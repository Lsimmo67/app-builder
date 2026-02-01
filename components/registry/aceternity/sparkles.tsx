"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternitySparklesProps {
  title?: string
  subtitle?: string
  particleColor?: string
  minSize?: number
  maxSize?: number
  particleCount?: number
  className?: string
}

function SparkleParticle({
  color,
  size,
  x,
  y,
  delay,
  duration,
}: {
  color: string
  size: number
  x: number
  y: number
  delay: number
  duration: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export default function AceternitySparkles({
  title = "Build With Sparkles",
  subtitle = "Create magical interfaces with sparkling particle effects that captivate your users.",
  particleColor = "#FFF",
  minSize = 1,
  maxSize = 3,
  particleCount = 50,
  className,
}: AceternitySparklesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: minSize + Math.random() * (maxSize - minSize),
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [particleCount, minSize, maxSize]
  )

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center min-h-[400px] w-full bg-black overflow-hidden rounded-md",
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full">
        {particles.map((p) => (
          <SparkleParticle
            key={p.id}
            color={particleColor}
            size={p.size}
            x={p.x}
            y={p.y}
            delay={p.delay}
            duration={p.duration}
          />
        ))}
      </div>
      {/* Gradient masks for fading edges */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent z-20" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent z-20" />
      <div className="relative z-30 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-neutral-300 max-w-lg mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
