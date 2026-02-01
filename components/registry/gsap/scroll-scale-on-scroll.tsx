"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollScaleProps {
  children?: React.ReactNode
  scaleFrom?: number
  scaleTo?: number
  scrub?: boolean | number
  className?: string
}

export default function GsapScrollScale({
  children,
  scaleFrom = 0.6,
  scaleTo = 1,
  scrub = true,
  className,
}: GsapScrollScaleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { scale: scaleFrom, opacity: 0.3 },
        {
          scale: scaleTo,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: scrub === true ? 1 : scrub === false ? undefined : scrub,
            toggleActions: scrub ? undefined : "play none none reverse",
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [scaleFrom, scaleTo, scrub])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ padding: "4rem 0", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div ref={contentRef} style={{ willChange: "transform" }}>
        {children || (
          <div
            style={{
              width: "min(80vw, 700px)",
              height: "400px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 700,
            }}
          >
            Scale on Scroll
          </div>
        )}
      </div>
    </div>
  )
}
