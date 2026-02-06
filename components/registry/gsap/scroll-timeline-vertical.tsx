"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface TimelineItem {
  title: string
  description: string
  date: string
}

export interface GsapScrollTimelineVerticalProps {
  items?: TimelineItem[]
  lineColor?: string
  className?: string
}

const defaultItems: TimelineItem[] = [
  { title: "Project Started", description: "Initial concept and planning phase completed.", date: "Jan 2024" },
  { title: "Design Phase", description: "UI/UX designs finalized and approved by stakeholders.", date: "Mar 2024" },
  { title: "Development", description: "Core features built and integrated into the platform.", date: "Jun 2024" },
  { title: "Beta Launch", description: "Released to early adopters for testing and feedback.", date: "Sep 2024" },
  { title: "Public Release", description: "Full launch with all features and optimizations.", date: "Dec 2024" },
]

export default function GsapScrollTimelineVertical({
  items = defaultItems,
  lineColor = "#667eea",
  className,
}: GsapScrollTimelineVerticalProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const line = containerRef.current!.querySelector(".timeline-line-fill") as HTMLElement
      const entries = containerRef.current!.querySelectorAll(".timeline-entry")

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        )
      }

      entries.forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 80%",
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
      className={cn("relative mx-auto max-w-2xl py-16 px-4", className)}
    >
      {/* Timeline line */}
      <div
        style={{
          position: "absolute",
          left: "24px",
          top: "4rem",
          bottom: "4rem",
          width: "2px",
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="timeline-line-fill"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: lineColor,
            transformOrigin: "top center",
          }}
        />
      </div>

      {/* Timeline items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="timeline-entry"
            style={{
              paddingLeft: "56px",
              position: "relative",
              opacity: 0,
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: "16px",
                top: "4px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: lineColor,
                border: "3px solid #0f172a",
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
            <p style={{ fontSize: "0.95rem", opacity: 0.7, lineHeight: 1.6 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
