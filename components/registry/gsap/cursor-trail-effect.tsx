"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapCursorTrailEffectProps {
  trailCount?: number
  trailColor?: string
  trailSize?: number
  children?: React.ReactNode
  className?: string
}

export default function GsapCursorTrailEffect({
  trailCount = 12,
  trailColor = "#667eea",
  trailSize = 20,
  children,
  className,
}: GsapCursorTrailEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const dots: HTMLDivElement[] = []

    // Create trail dots
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement("div")
      const size = trailSize * (1 - i / trailCount)
      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${trailColor};
        opacity: ${0.6 * (1 - i / trailCount)};
        pointer-events: none;
        z-index: 50;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
      `
      container.appendChild(dot)
      dots.push(dot)
    }
    dotsRef.current = dots

    const positions = dots.map(() => ({ x: 0, y: 0 }))
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const animate = () => {
      positions[0].x += (mouseX - positions[0].x) * 0.3
      positions[0].y += (mouseY - positions[0].y) * 0.3

      for (let i = 1; i < positions.length; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.2
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.2
      }

      dots.forEach((dot, i) => {
        gsap.set(dot, { x: positions[i].x, y: positions[i].y })
      })

      requestAnimationFrame(animate)
    }

    container.addEventListener("mousemove", handleMouseMove)
    const animFrame = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animFrame)
      dots.forEach((dot) => dot.remove())
    }
  }, [trailCount, trailColor, trailSize])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight: "400px", cursor: "none" }}
    >
      {children || (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            minHeight: "400px",
            fontSize: "1.25rem",
            opacity: 0.5,
          }}
        >
          Move your cursor around this area
        </div>
      )}
    </div>
  )
}
