"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollPathAnimationProps {
  strokeColor?: string
  strokeWidth?: number
  duration?: number
  className?: string
}

export default function GsapScrollPathAnimation({
  strokeColor = "#667eea",
  strokeWidth = 3,
  duration = 1,
  className,
}: GsapScrollPathAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const paths = containerRef.current!.querySelectorAll(".draw-path")

      paths.forEach((path) => {
        const svgPath = path as SVGPathElement
        const length = svgPath.getTotalLength()

        gsap.set(svgPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(svgPath, {
          strokeDashoffset: 0,
          duration,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [strokeColor, strokeWidth, duration])

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-16 px-4", className)}
    >
      <svg
        viewBox="0 0 400 200"
        fill="none"
        style={{ width: "100%", maxWidth: "600px", overflow: "visible" }}
      >
        {/* Decorative wave path */}
        <path
          className="draw-path"
          d="M10 100 C 40 10, 65 10, 95 100 S 150 190, 180 100 S 235 10, 265 100 S 320 190, 350 100 S 380 10, 390 100"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        {/* Circle at start */}
        <path
          className="draw-path"
          d="M10 100 A 1 1 0 0 1 10 100"
          stroke={strokeColor}
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow at end */}
        <path
          className="draw-path"
          d="M380 90 L 395 100 L 380 110"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
