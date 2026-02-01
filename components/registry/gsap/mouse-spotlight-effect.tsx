"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

export interface GsapMouseSpotlightEffectProps {
  radius?: number
  color?: string
  intensity?: number
  children?: React.ReactNode
  className?: string
}

export default function GsapMouseSpotlightEffect({
  radius = 200,
  color = "rgba(102, 126, 234, 0.3)",
  intensity = 1,
  children,
  className,
}: GsapMouseSpotlightEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !spotlightRef.current) return

    const container = containerRef.current
    const spotlight = spotlightRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(spotlight, {
        x: x - radius,
        y: y - radius,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      gsap.to(spotlight, { opacity: intensity, duration: 0.4 })
    }

    const handleMouseLeave = () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.4 })
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [radius, intensity])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        borderRadius: "16px",
        cursor: "none",
      }}
    >
      <div
        ref={spotlightRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1,
          willChange: "transform",
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        {children || (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>
              Spotlight Effect
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)" }}>
              Move your mouse to reveal the spotlight
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
