"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollColorChangeProps {
  colors?: string[]
  height?: string
  children?: React.ReactNode
  className?: string
}

const defaultColors = ["#0f172a", "#1e3a5f", "#4c1d95", "#7c3aed", "#ec4899"]

export default function GsapScrollColorChange({
  colors = defaultColors,
  height = "300vh",
  children,
  className,
}: GsapScrollColorChangeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || colors.length < 2) return

    const ctx = gsap.context(() => {
      const sections = containerRef.current!.querySelectorAll(".color-section")

      sections.forEach((section, i) => {
        if (i === 0) return

        gsap.to(containerRef.current!, {
          backgroundColor: colors[i],
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [colors])

  return (
    <div
      ref={containerRef}
      className={cn("relative transition-colors", className)}
      style={{
        height,
        backgroundColor: colors[0],
        color: "#fff",
      }}
    >
      {colors.map((_, i) => (
        <div
          key={i}
          className="color-section flex items-center justify-center"
          style={{
            height: `${100 / colors.length}%`,
            position: "relative",
          }}
        >
          {children || (
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: 700,
                textAlign: "center",
                padding: "2rem",
              }}
            >
              Section {i + 1}
            </h2>
          )}
        </div>
      ))}
    </div>
  )
}
