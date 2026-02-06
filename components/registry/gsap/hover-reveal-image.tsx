"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface RevealImageItem {
  label: string
  imageSrc: string
}

export interface GsapHoverRevealImageProps {
  items?: RevealImageItem[]
  className?: string
}

const defaultItems: RevealImageItem[] = [
  { label: "Project Alpha", imageSrc: "https://picsum.photos/seed/alpha/400/300" },
  { label: "Project Beta", imageSrc: "https://picsum.photos/seed/beta/400/300" },
  { label: "Project Gamma", imageSrc: "https://picsum.photos/seed/gamma/400/300" },
  { label: "Project Delta", imageSrc: "https://picsum.photos/seed/delta/400/300" },
]

export default function GsapHoverRevealImage({
  items = defaultItems,
  className,
}: GsapHoverRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imgElRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    const imageBox = imageRef.current
    const imgEl = imgElRef.current
    const rows = containerRef.current.querySelectorAll(".reveal-row")

    gsap.set(imageBox, { opacity: 0, scale: 0.8 })

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const src = target.dataset.image || ""
      if (imgEl) imgEl.src = src

      gsap.to(imageBox, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(target, {
        paddingLeft: "2rem",
        color: "#667eea",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(imageBox, {
        x: e.clientX - containerRef.current!.getBoundingClientRect().left + 20,
        y: e.clientY - containerRef.current!.getBoundingClientRect().top - 100,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement

      gsap.to(imageBox, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      })

      gsap.to(target, {
        paddingLeft: "0rem",
        color: "inherit",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    rows.forEach((row) => {
      row.addEventListener("mouseenter", handleMouseEnter)
      row.addEventListener("mousemove", handleMouseMove as EventListener)
      row.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      rows.forEach((row) => {
        row.removeEventListener("mouseenter", handleMouseEnter)
        row.removeEventListener("mousemove", handleMouseMove as EventListener)
        row.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [items])

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto max-w-2xl py-12 px-4", className)}
      style={{ cursor: "pointer" }}
    >
      {/* Floating image preview */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          width: "280px",
          height: "200px",
          borderRadius: "12px",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 10,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <img
          ref={imgElRef}
          src=""
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* List rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="reveal-row"
            data-image={item.imageSrc}
            style={{
              padding: "1.25rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              fontSize: "clamp(1.25rem, 3vw, 2rem)",
              fontWeight: 600,
              transition: "none",
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
