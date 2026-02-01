"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

import { SparklesCore } from "./sparkles"
import { IconDotsVertical } from "@tabler/icons-react"

export const Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassName,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: {
  firstImage?: string
  secondImage?: string
  className?: string
  firstImageClassName?: string
  secondImageClassName?: string
  initialSliderPercentage?: number
  slideMode?: "hover" | "drag"
  showHandlebar?: boolean
  autoplay?: boolean
  autoplayDuration?: number
}) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage)
  const [isDragging, setIsDragging] = useState(false)

  const sliderRef = useRef<HTMLDivElement>(null)

  const [isMouseOver, setIsMouseOver] = useState(false)

  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoplay = useCallback(() => {
    if (!autoplay) return

    const startTime = Date.now()
    const animate = () => {
      const elapsedTime = Date.now() - startTime
      const progress =
        (elapsedTime % (autoplayDuration * 2)) / autoplayDuration
      const percentage =
        progress <= 1 ? progress * 100 : (2 - progress) * 100

      setSliderXPercent(percentage)
      autoplayRef.current = setTimeout(animate, 16)
    }

    animate()
  }, [autoplay, autoplayDuration])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [startAutoplay, stopAutoplay])

  function mouseEnterHandler() {
    setIsMouseOver(true)
    stopAutoplay()
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false)
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage)
    }
    if (slideMode === "drag") {
      setIsDragging(false)
    }
    startAutoplay()
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!sliderRef.current) return

      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect()
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        const x = clientX - rect.left
        const percent = (x / rect.width) * 100
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)))
        })
      }
    },
    [slideMode, isDragging]
  )

  const handleMouseDown = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(true)
    }
  }, [slideMode])

  const handleMouseUp = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false)
    }
  }, [slideMode])

  return (
    <div
      ref={sliderRef}
      className={cn("w-[400px] h-[400px] overflow-hidden", className)}
      style={{ position: "relative", cursor: slideMode === "drag" ? "grab" : "col-resize" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          {showHandlebar && (
            <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <IconDotsVertical className="h-4 w-4 text-black" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence initial={false}>
          {firstImage ? (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none overflow-hidden",
                firstImageClassName
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              <img
                alt="first image"
                src={firstImage}
                className={cn(
                  "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none object-cover object-center",
                  firstImageClassName
                )}
                draggable={false}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondImage ? (
          <motion.img
            className={cn(
              "absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none object-cover object-center",
              secondImageClassName
            )}
            alt="second image"
            src={secondImage}
            draggable={false}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export interface AceternityCompareProps {
  beforeImage?: string
  afterImage?: string
  className?: string
}

export default function AceternityCompareWrapper({
  beforeImage = "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?q=80&w=2671&auto=format&fit=crop",
  afterImage = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2674&auto=format&fit=crop",
  className,
}: AceternityCompareProps) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <Compare
        firstImage={beforeImage}
        secondImage={afterImage}
        className="h-[250px] w-[200px] md:h-[500px] md:w-[500px] rounded-2xl"
        slideMode="hover"
      />
    </div>
  )
}
