"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapTextScrambleProps {
  text?: string
  speed?: number
  characters?: string
  trigger?: "hover" | "scroll" | "load"
  className?: string
}

export default function GsapTextScramble({
  text = "SCRAMBLE EFFECT",
  speed = 50,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*",
  trigger = "hover",
  className,
}: GsapTextScrambleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(text)
  const isAnimating = useRef(false)

  const scramble = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true

    let iteration = 0
    const originalText = text
    const length = originalText.length

    const interval = setInterval(() => {
      setDisplay(
        originalText
          .split("")
          .map((char, idx) => {
            if (char === " ") return " "
            if (idx < iteration) return originalText[idx]
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      )

      iteration += 1 / 3

      if (iteration >= length) {
        clearInterval(interval)
        setDisplay(originalText)
        isAnimating.current = false
      }
    }, speed)
  }, [text, speed, characters])

  useEffect(() => {
    if (!containerRef.current) return

    if (trigger === "load") {
      scramble()
      return
    }

    if (trigger === "scroll") {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: scramble,
          onEnterBack: scramble,
        })
      }, containerRef)
      return () => ctx.revert()
    }
  }, [trigger, scramble])

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
      style={{
        display: "inline-block",
        padding: "1rem 2rem",
        cursor: trigger === "hover" ? "pointer" : "default",
      }}
    >
      <span
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          fontWeight: 800,
          fontFamily: "monospace",
          letterSpacing: "0.05em",
        }}
      >
        {display}
      </span>
    </div>
  )
}
