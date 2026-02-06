"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollClipPathProps {
  shape?: "circle" | "diamond" | "triangle" | "inset"
  bgColor?: string
  children?: React.ReactNode
  className?: string
}

export default function GsapScrollClipPath({
  shape = "circle",
  bgColor = "#667eea",
  children,
  className,
}: GsapScrollClipPathProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const reveal = containerRef.current!.querySelector(".clip-reveal") as HTMLElement
      if (!reveal) return

      const clipPaths: Record<string, { from: string; to: string }> = {
        circle: {
          from: "circle(0% at 50% 50%)",
          to: "circle(75% at 50% 50%)",
        },
        diamond: {
          from: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          to: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        },
        triangle: {
          from: "polygon(50% 50%, 50% 50%, 50% 50%)",
          to: "polygon(50% 0%, 100% 100%, 0% 100%)",
        },
        inset: {
          from: "inset(50% 50% 50% 50%)",
          to: "inset(0% 0% 0% 0%)",
        },
      }

      const clip = clipPaths[shape] || clipPaths.circle

      gsap.fromTo(
        reveal,
        { clipPath: clip.from },
        {
          clipPath: clip.to,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [shape, bgColor])

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center", className)}
      style={{ minHeight: "80vh", padding: "2rem" }}
    >
      <div
        className="clip-reveal"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children || (
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Revealed Content
          </h2>
        )}
      </div>
    </div>
  )
}
