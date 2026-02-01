"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollInfiniteMarqueeProps {
  items?: string[]
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
}

export default function GsapScrollInfiniteMarquee({
  items = ["Design", "Develop", "Deploy", "Iterate", "Scale", "Optimize"],
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className,
}: GsapScrollInfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const track = trackRef.current
    const ctx = gsap.context(() => {
      // Measure single set width
      const singleSet = track.querySelector(".marquee-set") as HTMLElement
      if (!singleSet) return
      const width = singleSet.offsetWidth

      const dur = width / speed
      const xFrom = direction === "left" ? 0 : -width
      const xTo = direction === "left" ? -width : 0

      tweenRef.current = gsap.fromTo(
        track,
        { x: xFrom },
        {
          x: xTo,
          duration: dur,
          ease: "none",
          repeat: -1,
        }
      )

      // Speed boost on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (tweenRef.current && !isPaused) {
            const velocity = Math.abs(self.getVelocity() / 1000)
            tweenRef.current.timeScale(1 + velocity * 0.5)
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.out", overwrite: true })
          }
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [items, speed, direction, isPaused])

  useEffect(() => {
    if (tweenRef.current) {
      isPaused ? tweenRef.current.pause() : tweenRef.current.resume()
    }
  }, [isPaused])

  const separator = <span style={{ margin: "0 2rem", opacity: 0.3, fontSize: "1.5rem" }}>&bull;</span>

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: "hidden", padding: "2rem 0" }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div ref={trackRef} style={{ display: "flex", whiteSpace: "nowrap", width: "fit-content" }}>
        {[0, 1, 2].map((setIndex) => (
          <div key={setIndex} className={setIndex === 0 ? "marquee-set" : undefined} style={{ display: "flex", alignItems: "center" }}>
            {items.map((item, i) => (
              <React.Fragment key={i}>
                <span
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item}
                </span>
                {separator}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
