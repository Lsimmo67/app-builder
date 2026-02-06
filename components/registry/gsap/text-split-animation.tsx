"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapTextSplitAnimationProps {
  text?: string
  splitBy?: "word" | "char" | "line"
  animation?: "fadeUp" | "slideIn" | "rotateIn"
  stagger?: number
  className?: string
}

export default function GsapTextSplitAnimation({
  text = "Beautiful text split animation with GSAP",
  splitBy = "char",
  animation = "fadeUp",
  stagger = 0.03,
  className,
}: GsapTextSplitAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const textEl = container.querySelector(".split-text") as HTMLElement
    if (!textEl) return

    // Build split elements
    let units: string[]
    if (splitBy === "char") {
      units = text.split("")
    } else if (splitBy === "word") {
      units = text.split(" ")
    } else {
      units = [text]
    }

    textEl.innerHTML = units
      .map((unit) => {
        if (unit === " ") return " "
        const style = splitBy === "word" ? "margin-right:0.3em;" : ""
        return `<span class="split-unit" style="display:inline-block;overflow:hidden;"><span class="split-inner" style="display:inline-block;${style}">${unit}</span></span>`
      })
      .join("")

    const innerEls = textEl.querySelectorAll(".split-inner")

    const animationMap = {
      fadeUp: { y: "110%", opacity: 0, rotateX: 0 },
      slideIn: { x: "100%", opacity: 0, rotateX: 0 },
      rotateIn: { y: "100%", opacity: 0, rotateX: 90 },
    }

    const fromVars = animationMap[animation]

    const ctx = gsap.context(() => {
      gsap.from(innerEls, {
        ...fromVars,
        stagger,
        duration: 0.8,
        ease: animation === "rotateIn" ? "back.out(1.7)" : "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, container)

    return () => ctx.revert()
  }, [text, splitBy, animation, stagger])

  return (
    <div ref={containerRef} className={className} style={{ padding: "2rem 0" }}>
      <div
        className="split-text"
        style={{
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      />
    </div>
  )
}
