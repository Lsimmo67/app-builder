"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapPageTransitionProps {
  overlayColor?: string
  duration?: number
  children?: React.ReactNode
  className?: string
}

export default function GsapPageTransition({
  overlayColor = "#667eea",
  duration = 0.8,
  children,
  className,
}: GsapPageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const triggerTransition = useCallback(() => {
    if (!overlayRef.current || !containerRef.current) return

    const overlay = overlayRef.current
    const content = containerRef.current.querySelector(".page-content") as HTMLElement

    const tl = gsap.timeline()

    // Slide overlay in
    tl.fromTo(
      overlay,
      { yPercent: 100 },
      { yPercent: 0, duration, ease: "power3.inOut" }
    )
      // Hide content
      .set(content, { opacity: 0 })
      // Slide overlay out
      .to(overlay, {
        yPercent: -100,
        duration,
        ease: "power3.inOut",
      })
      // Reveal content
      .fromTo(
        content,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      )
  }, [duration])

  useEffect(() => {
    if (!containerRef.current) return

    // Play entrance animation on mount
    const ctx = gsap.context(() => {
      const overlay = overlayRef.current!
      const content = containerRef.current!.querySelector(".page-content") as HTMLElement

      gsap.set(overlay, { yPercent: 0 })
      gsap.set(content, { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(overlay, {
        yPercent: -100,
        duration,
        ease: "power3.inOut",
      }).fromTo(
        content,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      )

      setIsVisible(true)
    }, containerRef)

    return () => ctx.revert()
  }, [duration])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight: "400px" }}
    >
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: overlayColor,
          zIndex: 50,
          pointerEvents: "none",
        }}
      />

      {/* Page content */}
      <div className="page-content" style={{ opacity: 0 }}>
        {children || (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              gap: "1.5rem",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: 700,
              }}
            >
              Page Transition
            </h2>
            <p style={{ fontSize: "1rem", opacity: 0.7, maxWidth: "400px" }}>
              This component provides a smooth page transition overlay effect.
            </p>
            <button
              onClick={triggerTransition}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                border: "none",
                background: overlayColor,
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Replay Transition
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
