"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapFloatingElementsProps {
  count?: number
  colors?: string[]
  speed?: number
  className?: string
}

const defaultColors = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#43e97b"]

export default function GsapFloatingElements({
  count = 8,
  colors = defaultColors,
  speed = 1,
  className,
}: GsapFloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const elements = containerRef.current!.querySelectorAll(".floating-el")

      elements.forEach((el) => {
        const randomX = gsap.utils.random(-60, 60)
        const randomY = gsap.utils.random(-60, 60)
        const randomDuration = gsap.utils.random(3, 6) / speed
        const randomDelay = gsap.utils.random(0, 2)

        gsap.to(el, {
          x: randomX,
          y: randomY,
          rotation: gsap.utils.random(-15, 15),
          duration: randomDuration,
          delay: randomDelay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [count, colors, speed])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight: "400px", padding: "2rem" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const size = 20 + Math.random() * 60
        const color = colors[i % colors.length]
        const isCircle = i % 3 === 0
        const isTriangle = i % 3 === 1

        return (
          <div
            key={i}
            className="floating-el"
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              left: `${10 + (i / count) * 80}%`,
              top: `${15 + Math.random() * 60}%`,
              borderRadius: isCircle ? "50%" : isTriangle ? "0" : "8px",
              backgroundColor: isTriangle ? "transparent" : color,
              opacity: 0.4,
              willChange: "transform",
              ...(isTriangle
                ? {
                    width: 0,
                    height: 0,
                    borderLeft: `${size / 2}px solid transparent`,
                    borderRight: `${size / 2}px solid transparent`,
                    borderBottom: `${size}px solid ${color}`,
                    backgroundColor: "transparent",
                  }
                : {}),
            }}
          />
        )
      })}
    </div>
  )
}
