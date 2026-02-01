"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

export interface GsapMouseCursorFollowerProps {
  size?: number
  color?: string
  mixBlendMode?: string
  children?: React.ReactNode
  className?: string
}

export default function GsapMouseCursorFollower({
  size = 40,
  color = "rgba(102, 126, 234, 0.6)",
  mixBlendMode = "difference",
  children,
  className,
}: GsapMouseCursorFollowerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !cursorRef.current || !dotRef.current) return

    const container = containerRef.current
    const cursor = cursorRef.current
    const dot = dotRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x - size / 2,
        y: y - size / 2,
        duration: 0.5,
        ease: "power3.out",
      })

      gsap.to(dot, {
        x: x - 4,
        y: y - 4,
        duration: 0.1,
      })
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, dot], { opacity: 1, duration: 0.3 })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.3 })
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [size])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          background: color,
          mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"],
          pointerEvents: "none",
          opacity: 0,
          zIndex: 10,
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#fff",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 11,
          willChange: "transform",
        }}
      />
      {children || (
        <p style={{ fontSize: "1.5rem", opacity: 0.5, userSelect: "none" }}>
          Move your cursor around this area
        </p>
      )}
    </div>
  )
}
