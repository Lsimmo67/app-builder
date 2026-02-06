"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface CounterItem {
  label: string
  value: number
  prefix?: string
  suffix?: string
}

export interface GsapNumberCounterScrollProps {
  counters?: CounterItem[]
  duration?: number
  className?: string
}

const defaultCounters: CounterItem[] = [
  { label: "Projects", value: 250, suffix: "+" },
  { label: "Clients", value: 120, suffix: "+" },
  { label: "Revenue", value: 5.2, prefix: "$", suffix: "M" },
  { label: "Awards", value: 18 },
]

export default function GsapNumberCounterScroll({
  counters = defaultCounters,
  duration = 2,
  className,
}: GsapNumberCounterScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const counterEls = containerRef.current!.querySelectorAll(".counter-value")

      counterEls.forEach((el, i) => {
        const item = counters[i]
        if (!item) return

        const obj = { val: 0 }
        const isDecimal = item.value % 1 !== 0
        const decimals = isDecimal ? 1 : 0

        gsap.to(obj, {
          val: item.value,
          duration,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            ;(el as HTMLElement).textContent =
              (item.prefix || "") + obj.val.toFixed(decimals) + (item.suffix || "")
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [counters, duration])

  return (
    <div
      ref={containerRef}
      className={cn("py-16 px-4", className)}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {counters.map((item, i) => (
          <div key={i} style={{ padding: "1.5rem" }}>
            <div
              className="counter-value"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              {item.prefix || ""}0{item.suffix || ""}
            </div>
            <div
              style={{
                fontSize: "0.95rem",
                opacity: 0.6,
                fontWeight: 500,
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
