"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface HorizontalSection {
  title: string
  content: string
  bgColor: string
}

export interface GsapScrollHorizontalSectionProps {
  sections?: HorizontalSection[]
  className?: string
}

const defaultSections: HorizontalSection[] = [
  { title: "Section One", content: "Horizontal scrolling creates a unique and immersive experience.", bgColor: "#1a1a2e" },
  { title: "Section Two", content: "GSAP ScrollTrigger makes this effect smooth and performant.", bgColor: "#16213e" },
  { title: "Section Three", content: "Perfect for portfolios, product showcases, and storytelling.", bgColor: "#0f3460" },
  { title: "Section Four", content: "The scroll distance is mapped to horizontal translation.", bgColor: "#533483" },
]

export default function GsapScrollHorizontalSection({
  sections = defaultSections,
  className,
}: GsapScrollHorizontalSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!
      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [sections])

  return (
    <div ref={containerRef} className={className} style={{ overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          width: `${sections.length * 100}vw`,
          height: "100vh",
        }}
      >
        {sections.map((section, i) => (
          <div
            key={i}
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: section.bgColor,
              color: "#fff",
              padding: "4rem",
              flexShrink: 0,
            }}
          >
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, marginBottom: "1rem" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: "1.25rem", maxWidth: "600px", textAlign: "center", opacity: 0.8 }}>
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
