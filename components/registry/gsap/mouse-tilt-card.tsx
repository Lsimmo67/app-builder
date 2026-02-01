"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

export interface GsapMouseTiltCardProps {
  title?: string
  description?: string
  image?: string
  maxTilt?: number
  perspective?: number
  className?: string
}

export default function GsapMouseTiltCard({
  title = "Tilt Card",
  description = "Move your mouse over this card to see the 3D tilt effect. The card responds to your cursor position.",
  image = "https://picsum.photos/seed/tilt/400/250",
  maxTilt = 15,
  perspective = 1000,
  className,
}: GsapMouseTiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const rotateX = (0.5 - y) * maxTilt * 2
      const rotateY = (x - 0.5) * maxTilt * 2

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: perspective,
      })

      if (glareRef.current) {
        gsap.to(glareRef.current, {
          opacity: 0.15,
          background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          duration: 0.4,
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      })
      if (glareRef.current) {
        gsap.to(glareRef.current, { opacity: 0, duration: 0.4 })
      }
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [maxTilt, perspective])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "3rem" }}
    >
      <div
        ref={cardRef}
        style={{
          width: "380px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          position: "relative",
          willChange: "transform",
          transformStyle: "preserve-3d",
          cursor: "pointer",
        }}
      >
        <div
          ref={glareRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
        />
        <div style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h3>
          <p style={{ fontSize: "0.95rem", opacity: 0.7, lineHeight: 1.5 }}>{description}</p>
        </div>
      </div>
    </div>
  )
}
