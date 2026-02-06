"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapStaggerListItemsProps {
  items?: string[]
  stagger?: number
  direction?: "left" | "right" | "up" | "down"
  className?: string
}

const defaultItems = [
  "Design Systems & Component Libraries",
  "Interactive Animations & Transitions",
  "Responsive Layouts & Grid Systems",
  "Performance Optimization",
  "Accessibility Best Practices",
  "Progressive Web Applications",
]

export default function GsapStaggerListItems({
  items = defaultItems,
  stagger = 0.1,
  direction = "up",
  className,
}: GsapStaggerListItemsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const listItems = containerRef.current!.querySelectorAll(".stagger-item")

      const fromVars: Record<string, gsap.TweenVars> = {
        up: { opacity: 0, y: 40 },
        down: { opacity: 0, y: -40 },
        left: { opacity: 0, x: -60 },
        right: { opacity: 0, x: 60 },
      }

      gsap.fromTo(listItems, fromVars[direction] || fromVars.up, {
        opacity: 1,
        x: 0,
        y: 0,
        stagger,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [items, stagger, direction])

  return (
    <div
      ref={containerRef}
      className={cn("mx-auto max-w-xl py-16 px-4", className)}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map((item, i) => (
          <li
            key={i}
            className="stagger-item"
            style={{
              padding: "1rem 1.5rem",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "1rem",
              fontWeight: 500,
              opacity: 0,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
