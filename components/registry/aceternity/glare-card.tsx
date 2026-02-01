"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityGlareCardProps {
  title?: string
  description?: string
  icon?: string
  className?: string
}

export default function AceternityGlareCard({
  title = "The Spirit of Adventure",
  description = "Explore uncharted territories with the power of imagination and the tools we provide.",
  icon = "✨",
  className,
}: AceternityGlareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x, y })
    setRotation({
      x: (y - 50) / 5,
      y: (x - 50) / 5,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative w-80 h-[420px] rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotation({ x: 0, y: 0 })
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        <span className="text-5xl mb-4">{icon}</span>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
        }}
      />
      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 rounded-xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `inset 0 0 30px rgba(255,255,255,0.05), 0 0 20px rgba(120,119,198,0.2)`,
        }}
      />
    </motion.div>
  )
}
