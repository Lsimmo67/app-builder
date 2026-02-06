"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollSplitTextProps {
  text?: string
  stagger?: number
  duration?: number
  animation?: "fadeUp" | "scatter" | "wave"
  className?: string
}

export default function GsapScrollSplitText({
  text = "Split Text Animation",
  stagger = 0.03,
  duration = 0.6,
  animation = "fadeUp",
  className,
}: GsapScrollSplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const textEl = containerRef.current.querySelector(".split-text-target") as HTMLElement
    if (!textEl) return

    // Split text into individual letter spans
    textEl.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? '<span style="display:inline-block;width:0.3em">&nbsp;</span>'
          : `<span class="split-letter" style="display:inline-block;opacity:0">${char}</span>`
      )
      .join("")

    const letters = textEl.querySelectorAll(".split-letter")

    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = { opacity: 0, y: 50 }
      let toVars: gsap.TweenVars = { opacity: 1, y: 0, stagger, duration, ease: "power2.out" }

      if (animation === "scatter") {
        fromVars = { opacity: 0, x: () => gsap.utils.random(-80, 80), y: () => gsap.utils.random(-80, 80), rotation: () => gsap.utils.random(-45, 45) }
        toVars = { opacity: 1, x: 0, y: 0, rotation: 0, stagger, duration, ease: "back.out(1.7)" }
      } else if (animation === "wave") {
        fromVars = { opacity: 0, y: 60, rotationX: -90 }
        toVars = { opacity: 1, y: 0, rotationX: 0, stagger, duration, ease: "elastic.out(1, 0.5)" }
      }

      gsap.fromTo(letters, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [text, stagger, duration, animation])

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-16 px-4", className)}
    >
      <h2
        className="split-text-target"
        style={{
          fontSize: "clamp(2rem, 6vw, 4rem)",
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      />
    </div>
  )
}
