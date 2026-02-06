"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollRotateElementProps {
  rotation?: number
  scrub?: boolean
  children?: React.ReactNode
  className?: string
}

export default function GsapScrollRotateElement({
  rotation = 360,
  scrub = true,
  children,
  className,
}: GsapScrollRotateElementProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const el = containerRef.current!.querySelector(".rotate-target")
      if (!el) return

      gsap.fromTo(
        el,
        { rotation: 0 },
        {
          rotation,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: scrub ? 1 : false,
            toggleActions: scrub ? undefined : "play none none reverse",
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [rotation, scrub])

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-20", className)}
    >
      <div
        className="rotate-target"
        style={{ willChange: "transform" }}
      >
        {children || (
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            &#x2B22;
          </div>
        )}
      </div>
    </div>
  )
}
