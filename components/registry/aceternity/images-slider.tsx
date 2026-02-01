"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityImagesSliderProps {
  images?: string[]
  autoplay?: boolean
  direction?: "up" | "down"
  overlay?: boolean
  overlayClassName?: string
  className?: string
  children?: React.ReactNode
}

export default function AceternityImagesSlider({
  images = [
    "https://placehold.co/1200x600/1a1a2e/ffffff?text=Slide+1",
    "https://placehold.co/1200x600/16213e/ffffff?text=Slide+2",
    "https://placehold.co/1200x600/0f3460/ffffff?text=Slide+3",
    "https://placehold.co/1200x600/533483/ffffff?text=Slide+4",
  ],
  autoplay = true,
  direction = "up",
  overlay = true,
  overlayClassName,
  className,
  children,
}: AceternityImagesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [autoplay, handleNext])

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0] as [number, number, number, number],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: { duration: 1 },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: { duration: 1 },
    },
  }

  if (!isLoaded) return null

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden h-[500px] w-full",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Images */}
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          initial="initial"
          animate="visible"
          exit={direction === "up" ? "upExit" : "downExit"}
          variants={slideVariants}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Overlay */}
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-black/60 z-10",
            overlayClassName
          )}
        />
      )}

      {/* Default content if no children */}
      {children ? (
        <div className="relative z-20">{children}</div>
      ) : (
        <div className="relative z-20 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Beautiful Image Slider
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 max-w-lg mx-auto"
          >
            Navigate through stunning visuals with smooth animations
          </motion.p>
        </div>
      )}

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 z-30 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 z-30 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 z-30 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  )
}
