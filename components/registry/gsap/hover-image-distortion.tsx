"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapHoverImageDistortionProps {
  imageSrc?: string
  alt?: string
  scaleAmount?: number
  duration?: number
  className?: string
}

export default function GsapHoverImageDistortion({
  imageSrc = "https://picsum.photos/seed/distort/500/400",
  alt = "Distortion image",
  scaleAmount = 1.15,
  duration = 0.5,
  className,
}: GsapHoverImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const wrapper = containerRef.current.querySelector(".distortion-wrapper") as HTMLElement
    const img = containerRef.current.querySelector(".distortion-image") as HTMLElement
    if (!wrapper || !img) return

    const handleMouseEnter = () => {
      gsap.to(img, {
        scale: scaleAmount,
        skewX: 2,
        skewY: 1,
        duration,
        ease: "power2.out",
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(img, {
        x: x * 20,
        y: y * 20,
        skewX: x * 5,
        skewY: y * 3,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(img, {
        scale: 1,
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      })
    }

    wrapper.addEventListener("mouseenter", handleMouseEnter)
    wrapper.addEventListener("mousemove", handleMouseMove)
    wrapper.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      wrapper.removeEventListener("mouseenter", handleMouseEnter)
      wrapper.removeEventListener("mousemove", handleMouseMove)
      wrapper.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [imageSrc, scaleAmount, duration])

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-12", className)}
    >
      <div
        className="distortion-wrapper"
        style={{
          overflow: "hidden",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "500px",
          cursor: "pointer",
        }}
      >
        <img
          className="distortion-image"
          src={imageSrc}
          alt={alt}
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            display: "block",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  )
}
