"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollTextRevealProps {
  text?: string
  splitBy?: "word" | "char" | "line"
  stagger?: number
  scrub?: boolean | number
  className?: string
}

export default function GsapScrollTextReveal({
  text = "Scroll to reveal this amazing text animation that brings words to life as you navigate down the page.",
  splitBy = "word",
  stagger = 0.05,
  scrub = true,
  className,
}: GsapScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const textEl = container.querySelector(".gsap-reveal-text") as HTMLElement
    if (!textEl) return

    // Split text into spans
    let elements: HTMLElement[] = []
    if (splitBy === "char") {
      textEl.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? " "
            : `<span class="gsap-reveal-unit" style="display:inline-block;opacity:0;transform:translateY(20px)">${char}</span>`
        )
        .join("")
      elements = Array.from(textEl.querySelectorAll(".gsap-reveal-unit"))
    } else if (splitBy === "word") {
      textEl.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span class="gsap-reveal-unit" style="display:inline-block;opacity:0;transform:translateY(20px);margin-right:0.25em">${word}</span>`
        )
        .join("")
      elements = Array.from(textEl.querySelectorAll(".gsap-reveal-unit"))
    } else {
      // line split - approximate by wrapping in a single span
      textEl.innerHTML = `<span class="gsap-reveal-unit" style="display:block;opacity:0;transform:translateY(20px)">${text}</span>`
      elements = Array.from(textEl.querySelectorAll(".gsap-reveal-unit"))
    }

    const ctx = gsap.context(() => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        stagger,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          scrub: scrub === true ? 1 : scrub === false ? undefined : scrub,
          toggleActions: scrub ? undefined : "play none none reverse",
        },
      })
    }, container)

    return () => ctx.revert()
  }, [text, splitBy, stagger, scrub])

  return (
    <div ref={containerRef} className={className} style={{ padding: "2rem 0" }}>
      <div
        className="gsap-reveal-text"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.3,
          maxWidth: "900px",
        }}
      />
    </div>
  )
}
