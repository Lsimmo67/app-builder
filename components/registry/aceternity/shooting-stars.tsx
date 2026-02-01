"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityShootingStarsProps {
  title?: string
  subtitle?: string
  minDelay?: number
  maxDelay?: number
  starCount?: number
  className?: string
}

function ShootingStar({
  delay,
  duration,
  startX,
  startY,
  angle,
}: {
  delay: number
  duration: number
  startX: number
  startY: number
  angle: number
}) {
  const length = 80 + Math.random() * 120
  const radians = (angle * Math.PI) / 180
  const endX = startX + Math.cos(radians) * 500
  const endY = startY + Math.sin(radians) * 500

  return (
    <motion.div
      className="absolute"
      style={{
        left: startX,
        top: startY,
        width: length,
        height: 1,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 0",
        background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)`,
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, endX - startX],
        y: [0, endY - startY],
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

function BackgroundStar({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{
        duration: 2 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export default function AceternityShootingStars({
  title = "Shooting Stars",
  subtitle = "Watch the stars streak across the night sky in this mesmerizing background effect.",
  minDelay = 1,
  maxDelay = 5,
  starCount = 8,
  className,
}: AceternityShootingStarsProps) {
  const shootingStars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: i,
        startX: Math.random() * 100,
        startY: Math.random() * 50,
        angle: 30 + Math.random() * 30,
        delay: minDelay + Math.random() * (maxDelay - minDelay),
        duration: 1 + Math.random() * 2,
      })),
    [starCount, minDelay, maxDelay]
  )

  const bgStars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 3,
      })),
    []
  )

  return (
    <div
      className={cn(
        "relative min-h-[500px] w-full flex items-center justify-center bg-neutral-950 overflow-hidden rounded-md",
        className
      )}
    >
      <div className="absolute inset-0">
        {bgStars.map((star) => (
          <BackgroundStar key={star.id} x={star.x} y={star.y} size={star.size} delay={star.delay} />
        ))}
        {shootingStars.map((star) => (
          <ShootingStar
            key={star.id}
            startX={star.startX}
            startY={star.startY}
            angle={star.angle}
            delay={star.delay}
            duration={star.duration}
          />
        ))}
      </div>
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-neutral-400 max-w-lg mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
