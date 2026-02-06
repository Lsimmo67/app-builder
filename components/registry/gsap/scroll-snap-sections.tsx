"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface SnapSection {
  title: string
  content: string
  bgColor: string
}

export interface GsapScrollSnapSectionsProps {
  sections?: SnapSection[]
  className?: string
}

const defaultSections: SnapSection[] = [
  { title: "Welcome", content: "Scroll down to snap between sections.", bgColor: "#0f172a" },
  { title: "Features", content: "Each section snaps precisely into view.", bgColor: "#1e293b" },
  { title: "Design", content: "GSAP ScrollTrigger handles smooth snapping.", bgColor: "#334155" },
  { title: "Contact", content: "Get in touch to learn more.", bgColor: "#1a1a2e" },
]

export default function GsapScrollSnapSections({
  sections = defaultSections,
  className,
}: GsapScrollSnapSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const panels = containerRef.current.querySelectorAll<HTMLElement>(".snap-panel")

    const ctx = gsap.context(() => {
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "bottom top",
          snap: {
            snapTo: 1,
            duration: { min: 0.2, max: 0.6 },
            ease: "power2.inOut",
          },
        })

        // Animate content in
        const title = panel.querySelector(".snap-title")
        const content = panel.querySelector(".snap-content")

        gsap.from([title, content], {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [sections])

  return (
    <div ref={containerRef} className={className}>
      {sections.map((section, i) => (
        <div
          key={i}
          className="snap-panel"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: section.bgColor,
            color: "#fff",
            padding: "4rem 2rem",
          }}
        >
          <h2 className="snap-title" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
            {section.title}
          </h2>
          <p className="snap-content" style={{ fontSize: "1.25rem", maxWidth: "600px", textAlign: "center", opacity: 0.8 }}>
            {section.content}
          </p>
        </div>
      ))}
    </div>
  )
}
