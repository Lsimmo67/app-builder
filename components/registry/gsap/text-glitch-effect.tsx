"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapTextGlitchEffectProps {
  text?: string
  glitchColor1?: string
  glitchColor2?: string
  intensity?: number
  className?: string
}

export default function GsapTextGlitchEffect({
  text = "GLITCH",
  glitchColor1 = "#ff0040",
  glitchColor2 = "#00ffff",
  intensity = 1,
  className,
}: GsapTextGlitchEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const layer1 = containerRef.current!.querySelector(".glitch-layer-1") as HTMLElement
      const layer2 = containerRef.current!.querySelector(".glitch-layer-2") as HTMLElement
      if (!layer1 || !layer2) return

      const glitch = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.delayedCall(gsap.utils.random(0.5, 3) / intensity, glitch)
          },
        })

        const offset = 4 * intensity

        tl.to(layer1, {
          x: gsap.utils.random(-offset, offset),
          y: gsap.utils.random(-2, 2),
          skewX: gsap.utils.random(-3, 3) * intensity,
          duration: 0.05,
        })
          .to(layer2, {
            x: gsap.utils.random(-offset, offset),
            y: gsap.utils.random(-2, 2),
            skewX: gsap.utils.random(-3, 3) * intensity,
            duration: 0.05,
          }, "<")
          .to(layer1, {
            x: gsap.utils.random(-offset, offset),
            duration: 0.05,
          })
          .to(layer2, {
            x: gsap.utils.random(-offset, offset),
            duration: 0.05,
          }, "<")
          .to([layer1, layer2], {
            x: 0,
            y: 0,
            skewX: 0,
            duration: 0.05,
          })
      }

      glitch()
    }, containerRef)

    return () => ctx.revert()
  }, [text, glitchColor1, glitchColor2, intensity])

  const textStyle: React.CSSProperties = {
    fontSize: "clamp(2.5rem, 8vw, 6rem)",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    position: "absolute",
    whiteSpace: "nowrap",
  }

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-12 px-4", className)}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Base text */}
        <div style={{ ...textStyle, position: "relative", color: "#fff" }}>
          {text}
        </div>
        {/* Glitch layers */}
        <div
          className="glitch-layer-1"
          style={{
            ...textStyle,
            top: 0,
            left: 0,
            color: glitchColor1,
            mixBlendMode: "multiply",
            opacity: 0.8,
          }}
          aria-hidden="true"
        >
          {text}
        </div>
        <div
          className="glitch-layer-2"
          style={{
            ...textStyle,
            top: 0,
            left: 0,
            color: glitchColor2,
            mixBlendMode: "multiply",
            opacity: 0.8,
          }}
          aria-hidden="true"
        >
          {text}
        </div>
      </div>
    </div>
  )
}
