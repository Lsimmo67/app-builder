"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollProgressBarProps {
  color?: string
  height?: number
  position?: "top" | "bottom"
  className?: string
}

export default function GsapScrollProgressBar({
  color = "#667eea",
  height = 4,
  position = "top",
  className,
}: GsapScrollProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={barRef}
      className={className}
      style={{
        position: "fixed",
        [position]: 0,
        left: 0,
        width: "100%",
        height: `${height}px`,
        background: color,
        transformOrigin: "left center",
        transform: "scaleX(0)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  )
}
