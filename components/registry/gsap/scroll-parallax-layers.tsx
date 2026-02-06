"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface ParallaxLayer {
  content: string
  speed: number
  color: string
}

export interface GsapScrollParallaxLayersProps {
  layers?: ParallaxLayer[]
  height?: string
  className?: string
}

const defaultLayers: ParallaxLayer[] = [
  { content: "Background", speed: 0.2, color: "rgba(102, 126, 234, 0.15)" },
  { content: "Midground", speed: 0.5, color: "rgba(102, 126, 234, 0.3)" },
  { content: "Foreground", speed: 0.8, color: "rgba(102, 126, 234, 0.5)" },
]

export default function GsapScrollParallaxLayers({
  layers = defaultLayers,
  height = "150vh",
  className,
}: GsapScrollParallaxLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const layerEls = containerRef.current!.querySelectorAll(".parallax-layer")

      layerEls.forEach((el, i) => {
        const speed = layers[i]?.speed ?? 0.5

        gsap.to(el, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [layers])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ height }}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          className="parallax-layer"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform",
          }}
        >
          <div
            style={{
              padding: "2rem 3rem",
              borderRadius: "16px",
              backgroundColor: layer.color,
              backdropFilter: "blur(8px)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#fff",
              transform: `scale(${1 + i * 0.2})`,
            }}
          >
            {layer.content}
          </div>
        </div>
      ))}
    </div>
  )
}
