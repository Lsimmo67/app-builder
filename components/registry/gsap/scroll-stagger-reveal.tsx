"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface StaggerItem {
  title: string
  description: string
}

export interface GsapScrollStaggerRevealProps {
  items?: StaggerItem[]
  stagger?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

const defaultItems: StaggerItem[] = [
  { title: "Design", description: "Crafting beautiful interfaces with attention to every detail." },
  { title: "Develop", description: "Building robust applications with modern web technologies." },
  { title: "Deploy", description: "Shipping products that scale and perform flawlessly." },
  { title: "Iterate", description: "Continuously improving based on user feedback and data." },
]

export default function GsapScrollStaggerReveal({
  items = defaultItems,
  stagger = 0.15,
  direction = "up",
  className,
}: GsapScrollStaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const dirMap = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { y: 0, x: 60 },
      right: { y: 0, x: -60 },
    }

    const { x, y } = dirMap[direction]

    const ctx = gsap.context(() => {
      const cards = containerRef.current!.querySelectorAll(".stagger-card")

      gsap.from(cards, {
        y,
        x,
        opacity: 0,
        stagger,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [items, stagger, direction])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
        padding: "2rem 0",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="stagger-card"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "2rem",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>{item.title}</h3>
          <p style={{ fontSize: "1rem", opacity: 0.7, lineHeight: 1.6 }}>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
