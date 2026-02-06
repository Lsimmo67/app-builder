"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapFlipCardAnimationProps {
  frontTitle?: string
  frontDescription?: string
  backTitle?: string
  backDescription?: string
  duration?: number
  width?: number
  height?: number
  className?: string
}

export default function GsapFlipCardAnimation({
  frontTitle = "Front Side",
  frontDescription = "Hover to flip this card and reveal the back side.",
  backTitle = "Back Side",
  backDescription = "This is the hidden content revealed on flip.",
  duration = 0.6,
  width = 350,
  height = 250,
  className,
}: GsapFlipCardAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return

    const card = cardRef.current
    let isFlipped = false

    const handleMouseEnter = () => {
      if (isFlipped) return
      isFlipped = true
      gsap.to(card, {
        rotateY: 180,
        duration,
        ease: "power2.inOut",
      })
    }

    const handleMouseLeave = () => {
      if (!isFlipped) return
      isFlipped = false
      gsap.to(card, {
        rotateY: 0,
        duration,
        ease: "power2.inOut",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [duration])

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    textAlign: "center",
  }

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-12", className)}
    >
      <div style={{ perspective: "1000px" }}>
        <div
          ref={cardRef}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            position: "relative",
            transformStyle: "preserve-3d",
            cursor: "pointer",
            willChange: "transform",
          }}
        >
          {/* Front */}
          <div
            style={{
              ...faceStyle,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#fff" }}>
              {frontTitle}
            </h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.85, lineHeight: 1.5, color: "#fff" }}>
              {frontDescription}
            </p>
          </div>

          {/* Back */}
          <div
            style={{
              ...faceStyle,
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              transform: "rotateY(180deg)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#fff" }}>
              {backTitle}
            </h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.85, lineHeight: 1.5, color: "#fff" }}>
              {backDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
