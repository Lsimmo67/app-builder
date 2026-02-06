"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapTextMaskRevealProps {
  text?: string
  duration?: number
  stagger?: number
  triggerOnScroll?: boolean
  className?: string
}

export default function GsapTextMaskReveal({
  text = "Masked Text Reveal",
  duration = 0.8,
  stagger = 0.1,
  triggerOnScroll = true,
  className,
}: GsapTextMaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const words = containerRef.current!.querySelectorAll(".mask-word-inner")

      const animConfig: gsap.TweenVars = {
        yPercent: 0,
        stagger,
        duration,
        ease: "power3.out",
      }

      if (triggerOnScroll) {
        animConfig.scrollTrigger = {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }

      gsap.fromTo(words, { yPercent: 110 }, animConfig)
    }, containerRef)

    return () => ctx.revert()
  }, [text, duration, stagger, triggerOnScroll])

  const words = text.split(" ")

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-12 px-4", className)}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="mask-word"
          style={{
            overflow: "hidden",
            display: "inline-block",
            verticalAlign: "top",
          }}
        >
          <span
            className="mask-word-inner"
            style={{
              display: "inline-block",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  )
}
