"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapSmoothScrollProps {
  speed?: number
  smoothness?: number
  children?: React.ReactNode
  className?: string
}

export default function GsapSmoothScroll({
  speed = 1,
  smoothness = 0.1,
  children,
  className,
}: GsapSmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const container = containerRef.current
    const content = contentRef.current

    let currentY = 0
    let targetY = 0
    let rafId: number

    const updateHeight = () => {
      const contentHeight = content.scrollHeight
      container.style.height = `${contentHeight}px`
    }

    const smoothScroll = () => {
      targetY = window.scrollY * speed
      currentY += (targetY - currentY) * smoothness

      gsap.set(content, {
        y: -currentY,
      })

      rafId = requestAnimationFrame(smoothScroll)
    }

    updateHeight()

    gsap.set(content, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
    })

    rafId = requestAnimationFrame(smoothScroll)

    // Update ScrollTrigger on resize
    const handleResize = () => {
      updateHeight()
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", handleResize)
    }
  }, [speed, smoothness])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div ref={contentRef}>
        {children || (
          <div style={{ padding: "4rem 2rem" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  minHeight: "60vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  opacity: 0.6,
                }}
              >
                Smooth Scroll Section {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
