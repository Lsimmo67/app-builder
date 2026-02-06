"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollTextFadeProps {
  paragraphs?: string[]
  stagger?: number
  duration?: number
  className?: string
}

const defaultParagraphs = [
  "The future of design is here. Every pixel tells a story, every animation breathes life into the experience.",
  "We craft digital experiences that captivate, engage, and inspire. Motion is the language of the modern web.",
  "Scroll down and watch as each paragraph gracefully fades into view, creating a narrative rhythm.",
]

export default function GsapScrollTextFade({
  paragraphs = defaultParagraphs,
  stagger = 0.3,
  duration = 0.8,
  className,
}: GsapScrollTextFadeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const paras = containerRef.current!.querySelectorAll(".fade-paragraph")

      paras.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [paragraphs, stagger, duration])

  return (
    <div
      ref={containerRef}
      className={cn("mx-auto max-w-3xl space-y-8 py-16 px-4", className)}
    >
      {paragraphs.map((text, i) => (
        <p
          key={i}
          className="fade-paragraph text-lg leading-relaxed opacity-0"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", lineHeight: 1.8 }}
        >
          {text}
        </p>
      ))}
    </div>
  )
}
