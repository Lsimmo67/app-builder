"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapTextWaveAnimationProps {
  text?: string
  speed?: number
  amplitude?: number
  loop?: boolean
  className?: string
}

export default function GsapTextWaveAnimation({
  text = "Wave Animation",
  speed = 1,
  amplitude = 20,
  loop = true,
  className,
}: GsapTextWaveAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const letters = containerRef.current!.querySelectorAll(".wave-letter")

      const tl = gsap.timeline({
        repeat: loop ? -1 : 0,
        defaults: { duration: 0.4 / speed, ease: "sine.inOut" },
      })

      letters.forEach((letter, i) => {
        tl.to(
          letter,
          {
            y: -amplitude,
            duration: 0.3 / speed,
            ease: "sine.out",
          },
          i * (0.08 / speed)
        ).to(
          letter,
          {
            y: 0,
            duration: 0.3 / speed,
            ease: "sine.in",
          },
          i * (0.08 / speed) + 0.3 / speed
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [text, speed, amplitude, loop])

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-12 px-4", className)}
    >
      <div
        style={{
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
          fontWeight: 800,
          display: "flex",
          gap: "0.02em",
        }}
      >
        {text.split("").map((char, i) =>
          char === " " ? (
            <span key={i} style={{ width: "0.3em" }} />
          ) : (
            <span
              key={i}
              className="wave-letter"
              style={{
                display: "inline-block",
                willChange: "transform",
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
