"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

export interface GsapKineticTypographyProps {
  text?: string
  animation?: "wave" | "bounce" | "elastic" | "stagger-rotate"
  speed?: number
  loop?: boolean
  className?: string
}

export default function GsapKineticTypography({
  text = "KINETIC",
  animation = "wave",
  speed = 1,
  loop = true,
  className,
}: GsapKineticTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const textEl = container.querySelector(".kinetic-text") as HTMLElement
    if (!textEl) return

    // Split into characters
    textEl.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? '<span style="display:inline-block;width:0.3em">&nbsp;</span>'
          : `<span class="kinetic-char" style="display:inline-block">${char}</span>`
      )
      .join("")

    const chars = textEl.querySelectorAll(".kinetic-char")

    const ctx = gsap.context(() => {
      const dur = 0.6 / speed

      switch (animation) {
        case "wave": {
          gsap.to(chars, {
            y: -30,
            stagger: {
              each: 0.08,
              repeat: loop ? -1 : 0,
              yoyo: true,
            },
            duration: dur,
            ease: "sine.inOut",
          })
          break
        }
        case "bounce": {
          gsap.to(chars, {
            y: -50,
            scaleY: 1.2,
            stagger: {
              each: 0.1,
              repeat: loop ? -1 : 0,
              yoyo: true,
            },
            duration: dur,
            ease: "bounce.out",
          })
          break
        }
        case "elastic": {
          gsap.to(chars, {
            scale: 1.4,
            color: "#667eea",
            stagger: {
              each: 0.12,
              repeat: loop ? -1 : 0,
              yoyo: true,
            },
            duration: dur * 1.5,
            ease: "elastic.out(1, 0.3)",
          })
          break
        }
        case "stagger-rotate": {
          gsap.to(chars, {
            rotation: 360,
            stagger: {
              each: 0.1,
              repeat: loop ? -1 : 0,
            },
            duration: dur * 2,
            ease: "power2.inOut",
          })
          break
        }
      }
    }, container)

    return () => ctx.revert()
  }, [text, animation, speed, loop])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <div
        className="kinetic-text"
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 900,
          letterSpacing: "0.05em",
          lineHeight: 1.2,
        }}
      />
    </div>
  )
}
