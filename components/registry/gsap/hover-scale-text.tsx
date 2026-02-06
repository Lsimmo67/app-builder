"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapHoverScaleTextProps {
  text?: string
  scaleAmount?: number
  duration?: number
  color?: string
  className?: string
}

export default function GsapHoverScaleText({
  text = "Hover Me",
  scaleAmount = 1.3,
  duration = 0.3,
  color = "#667eea",
  className,
}: GsapHoverScaleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const letters = containerRef.current.querySelectorAll(".scale-letter")

    letters.forEach((letter) => {
      const el = letter as HTMLElement

      const handleMouseEnter = () => {
        gsap.to(el, {
          scale: scaleAmount,
          color,
          duration,
          ease: "back.out(1.7)",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(el, {
          scale: 1,
          color: "inherit",
          duration: duration * 1.5,
          ease: "elastic.out(1, 0.3)",
        })
      }

      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      letters.forEach((letter) => {
        const el = letter as HTMLElement
        el.replaceWith(el.cloneNode(true))
      })
    }
  }, [text, scaleAmount, duration, color])

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-12 px-4", className)}
    >
      <div
        style={{
          fontSize: "clamp(2rem, 6vw, 5rem)",
          fontWeight: 800,
          display: "flex",
          gap: "0.05em",
          cursor: "default",
        }}
      >
        {text.split("").map((char, i) =>
          char === " " ? (
            <span key={i} style={{ width: "0.3em" }} />
          ) : (
            <span
              key={i}
              className="scale-letter"
              style={{
                display: "inline-block",
                willChange: "transform",
                transition: "none",
              }}
            >
              {char}
            </span>
          )
        )}
      </div>
    </div>
  )
}
