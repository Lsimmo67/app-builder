"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface Skiper3DPerspectiveTextProps {
  text?: string
  depth?: number
  color?: string
  rotateX?: number
  rotateY?: number
  className?: string
}

export default function Skiper3DPerspectiveText({
  text = "PERSPECTIVE",
  depth = 10,
  color = "#ffffff",
  rotateX: initialRotateX = 0,
  rotateY: initialRotateY = 0,
  className,
}: Skiper3DPerspectiveTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 100, damping: 20 }
  const rX = useSpring(
    useTransform(mouseY, [-200, 200], [30 + initialRotateX, -30 + initialRotateX]),
    springConfig
  )
  const rY = useSpring(
    useTransform(mouseX, [-200, 200], [-30 + initialRotateY, 30 + initialRotateY]),
    springConfig
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Generate depth layers
  const layers = Array.from({ length: depth }, (_, i) => i)

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-[400px] w-full items-center justify-center overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX: rX,
          rotateY: rY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Shadow layers for depth */}
        {layers.map((i) => (
          <span
            key={i}
            className="absolute left-0 top-0 select-none whitespace-nowrap text-6xl font-black md:text-8xl lg:text-9xl"
            style={{
              color: "transparent",
              WebkitTextStroke: i === 0 ? "none" : `1px rgba(255,255,255,${0.03})`,
              transform: `translateZ(${-i * 4}px)`,
              ...(i === 0 ? { color: `${color}08` } : {}),
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        ))}

        {/* Front text */}
        <motion.span
          className="relative select-none whitespace-nowrap text-6xl font-black md:text-8xl lg:text-9xl"
          style={{
            color,
            transform: `translateZ(${depth * 4}px)`,
            textShadow: `0 0 40px ${color}30`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  )
}
