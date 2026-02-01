"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface SkiperInteractive3DHeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  modelUrl?: string
  className?: string
}

export default function SkiperInteractive3DHero({
  title = "Build the future\nof the web",
  subtitle = "Create stunning interactive experiences with modern tools and frameworks.",
  ctaText = "Get Started",
  ctaLink = "#",
  modelUrl,
  className,
}: SkiperInteractive3DHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex min-h-[600px] w-full items-center justify-center overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </div>

      {/* 3D content container */}
      <motion.div
        className="relative z-10 text-center"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
      >
        {/* Floating 3D object (placeholder for modelUrl) */}
        <motion.div
          className="mx-auto mb-8 flex h-32 w-32 items-center justify-center"
          animate={{
            y: [0, -15, 0],
            rotateY: [0, 360],
          }}
          transition={{
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            rotateY: { repeat: Infinity, duration: 20, ease: "linear" },
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {modelUrl ? (
            <img
              src={modelUrl}
              alt="3D Model"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="relative h-24 w-24" style={{ transformStyle: "preserve-3d" }}>
              {/* CSS 3D cube */}
              <div
                className="absolute inset-0 rounded-xl border border-white/20 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-sm"
                style={{ transform: "translateZ(48px)" }}
              />
              <div
                className="absolute inset-0 rounded-xl border border-white/20 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 backdrop-blur-sm"
                style={{ transform: "rotateY(90deg) translateZ(48px)" }}
              />
              <div
                className="absolute inset-0 rounded-xl border border-white/20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm"
                style={{ transform: "rotateX(90deg) translateZ(48px)" }}
              />
            </div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="whitespace-pre-line text-5xl font-bold leading-tight text-white md:text-7xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-6 max-w-lg text-lg text-white/50"
        >
          {subtitle}
        </motion.p>

        {/* CTA */}
        <motion.a
          href={ctaLink}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-black transition-shadow hover:shadow-xl hover:shadow-white/10"
        >
          {ctaText}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8H13M10 5L13 8L10 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  )
}
