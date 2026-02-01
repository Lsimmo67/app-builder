"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityBackgroundGradientProps {
  title?: string
  subtitle?: string
  interactive?: boolean
  className?: string
}

export default function AceternityBackgroundGradient({
  title = "Gradients X Animations",
  subtitle = "A mesmerizing gradient animation background that shifts and morphs colors, creating a living canvas effect.",
  interactive = true,
  className,
}: AceternityBackgroundGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    if (!interactive) return
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setCursorPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    const el = containerRef.current
    el?.addEventListener("mousemove", handleMove)
    return () => el?.removeEventListener("mousemove", handleMove)
  }, [interactive])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-[500px] items-center justify-center overflow-hidden bg-[#0a0a0a] rounded-lg",
        className
      )}
    >
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute w-[80%] h-[80%] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        animate={{
          x: interactive ? `${cursorPos.x - 50}%` : ["0%", "10%", "-10%", "0%"],
          y: interactive ? `${cursorPos.y - 50}%` : ["0%", "-10%", "10%", "0%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          x: { duration: interactive ? 0.3 : 8, repeat: interactive ? 0 : Infinity, ease: interactive ? "easeOut" : "easeInOut" },
          y: { duration: interactive ? 0.3 : 10, repeat: interactive ? 0 : Infinity, ease: interactive ? "easeOut" : "easeInOut" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute w-[60%] h-[60%] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        }}
        animate={{
          x: ["10%", "-10%", "10%"],
          y: ["-10%", "10%", "-10%"],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[50%] h-[50%] rounded-full opacity-20 blur-[100px]"
        style={{
          background:
            "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        }}
        animate={{
          x: ["-15%", "15%", "-15%"],
          y: ["5%", "-5%", "5%"],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[40%] h-[40%] rounded-full opacity-20 blur-[80px]"
        style={{
          background:
            "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        }}
        animate={{
          x: ["5%", "-15%", "5%"],
          y: ["-15%", "5%", "-15%"],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-50" />
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-bold text-white bg-clip-text"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-white/60 max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
