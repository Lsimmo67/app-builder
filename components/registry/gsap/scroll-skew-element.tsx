"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollSkewElementProps {
  skewAmount?: number
  children?: React.ReactNode
  className?: string
}

export default function GsapScrollSkewElement({
  skewAmount = 10,
  children,
  className,
}: GsapScrollSkewElementProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const el = containerRef.current!.querySelector(".skew-target") as HTMLElement
      if (!el) return

      gsap.fromTo(
        el,
        { skewY: skewAmount, skewX: skewAmount * 0.5 },
        {
          skewY: -skewAmount,
          skewX: -skewAmount * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [skewAmount])

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-20 px-4", className)}
    >
      <div className="skew-target" style={{ willChange: "transform" }}>
        {children || (
          <div
            style={{
              width: "300px",
              height: "200px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Skew on Scroll
          </div>
        )}
      </div>
    </div>
  )
}
