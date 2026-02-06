"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface HorizontalTimelineItem {
  title: string
  description: string
  date: string
}

export interface GsapScrollTimelineHorizontalProps {
  items?: HorizontalTimelineItem[]
  lineColor?: string
  className?: string
}

const defaultItems: HorizontalTimelineItem[] = [
  { title: "Concept", description: "Initial idea and research phase.", date: "Q1" },
  { title: "Design", description: "Wireframes and visual design.", date: "Q2" },
  { title: "Build", description: "Development and integration.", date: "Q3" },
  { title: "Test", description: "QA and user testing.", date: "Q4" },
  { title: "Launch", description: "Public release and marketing.", date: "Q5" },
]

export default function GsapScrollTimelineHorizontal({
  items = defaultItems,
  lineColor = "#667eea",
  className,
}: GsapScrollTimelineHorizontalProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const track = containerRef.current!.querySelector(".h-timeline-track") as HTMLElement
      const entries = containerRef.current!.querySelectorAll(".h-timeline-entry")
      const line = containerRef.current!.querySelector(".h-timeline-line-fill") as HTMLElement

      if (!track) return

      // Pin container and scroll horizontally
      const totalWidth = track.scrollWidth - containerRef.current!.offsetWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
        },
      })

      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${totalWidth}`,
              scrub: 1,
            },
          }
        )
      }

      entries.forEach((entry, i) => {
        gsap.fromTo(
          entry,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: entry,
              containerAnimation: gsap.getById("h-timeline-scroll") || undefined,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [items, lineColor])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ height: "100vh" }}
    >
      <div
        className="h-timeline-track"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "max-content",
          paddingLeft: "4rem",
          paddingRight: "4rem",
        }}
      >
        {/* Horizontal line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "4rem",
            right: "4rem",
            height: "2px",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="h-timeline-line-fill"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: lineColor,
              transformOrigin: "left center",
            }}
          />
        </div>

        {items.map((item, i) => (
          <div
            key={i}
            className="h-timeline-entry"
            style={{
              minWidth: "280px",
              padding: "0 2rem",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Dot */}
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: lineColor,
                margin: "0 auto 1rem",
                border: "3px solid #0f172a",
                position: "relative",
                zIndex: 2,
              }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: lineColor,
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              {item.date}
            </span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.5 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
