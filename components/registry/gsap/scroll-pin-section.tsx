"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollPinSectionProps {
  title?: string
  content?: string
  bgColor?: string
  duration?: number
  className?: string
}

export default function GsapScrollPinSection({
  title = "Pinned Section",
  content = "This section stays fixed while you scroll. The content animates in and the section unpins after the scroll distance is covered.",
  bgColor = "#0f172a",
  duration = 300,
  className,
}: GsapScrollPinSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const titleEl = containerRef.current!.querySelector(".pin-title")
      const contentEl = containerRef.current!.querySelector(".pin-content")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${duration}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.from(titleEl, {
        y: 60,
        opacity: 0,
        duration: 0.4,
      })
        .from(
          contentEl,
          {
            y: 40,
            opacity: 0,
            duration: 0.4,
          },
          "-=0.2"
        )
        .to(
          {},
          { duration: 0.3 } // hold
        )
        .to([titleEl, contentEl], {
          y: -40,
          opacity: 0,
          duration: 0.3,
        })
    }, containerRef)

    return () => ctx.revert()
  }, [title, content, duration])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        color: "#fff",
        padding: "4rem 2rem",
      }}
    >
      <h2
        className="pin-title"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, marginBottom: "1.5rem" }}
      >
        {title}
      </h2>
      <p
        className="pin-content"
        style={{ fontSize: "1.25rem", maxWidth: "600px", textAlign: "center", opacity: 0.8, lineHeight: 1.6 }}
      >
        {content}
      </p>
    </div>
  )
}
