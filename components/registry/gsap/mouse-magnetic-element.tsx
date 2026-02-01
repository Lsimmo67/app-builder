"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

export interface GsapMouseMagneticElementProps {
  children?: React.ReactNode
  strength?: number
  radius?: number
  className?: string
}

export default function GsapMouseMagneticElement({
  children,
  strength = 0.4,
  radius = 200,
  className,
}: GsapMouseMagneticElementProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !magnetRef.current) return

    const el = magnetRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < radius) {
        const factor = 1 - distance / radius
        gsap.to(el, {
          x: distX * strength * factor,
          y: distY * strength * factor,
          duration: 0.4,
          ease: "power2.out",
        })
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength, radius])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "3rem" }}
    >
      <div ref={magnetRef} style={{ willChange: "transform", cursor: "pointer" }}>
        {children || (
          <div
            style={{
              width: "180px",
              height: "60px",
              borderRadius: "30px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              userSelect: "none",
            }}
          >
            Hover me
          </div>
        )}
      </div>
    </div>
  )
}
