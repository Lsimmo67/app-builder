"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapElasticCursorProps {
  size?: number
  color?: string
  elasticity?: number
  children?: React.ReactNode
  className?: string
}

export default function GsapElasticCursor({
  size = 40,
  color = "rgba(102, 126, 234, 0.6)",
  elasticity = 0.15,
  children,
  className,
}: GsapElasticCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !cursorRef.current) return

    const container = containerRef.current
    const cursor = cursorRef.current

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let velocityX = 0
    let velocityY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.3 })
    }

    const tick = () => {
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY

      velocityX += dx * elasticity
      velocityY += dy * elasticity

      velocityX *= 0.75
      velocityY *= 0.75

      cursorX += velocityX
      cursorY += velocityY

      // Calculate stretch based on velocity
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY)
      const angle = Math.atan2(velocityY, velocityX)
      const stretch = Math.min(speed * 0.03, 0.5)

      gsap.set(cursor, {
        x: cursorX - size / 2,
        y: cursorY - size / 2,
        scaleX: 1 + stretch,
        scaleY: 1 - stretch * 0.5,
        rotation: (angle * 180) / Math.PI,
      })

      requestAnimationFrame(tick)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)
    const frame = requestAnimationFrame(tick)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(frame)
    }
  }, [size, color, elasticity])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight: "400px", cursor: "none" }}
    >
      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundColor: color,
          pointerEvents: "none",
          zIndex: 50,
          opacity: 0,
          willChange: "transform",
        }}
      />
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
          Move your cursor to see the elastic effect
        </div>
      )}
    </div>
  )
}
