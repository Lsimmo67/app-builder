"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollImageRevealProps {
  imageSrc?: string
  alt?: string
  direction?: "left" | "right" | "top" | "bottom"
  duration?: number
  className?: string
}

export default function GsapScrollImageReveal({
  imageSrc = "https://picsum.photos/seed/reveal/800/500",
  alt = "Revealed image",
  direction = "left",
  duration = 1.2,
  className,
}: GsapScrollImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const wrapper = containerRef.current!.querySelector(".reveal-wrapper") as HTMLElement
      const img = containerRef.current!.querySelector(".reveal-image") as HTMLElement
      if (!wrapper || !img) return

      const clipStart: Record<string, string> = {
        left: "inset(0 100% 0 0)",
        right: "inset(0 0 0 100%)",
        top: "inset(100% 0 0 0)",
        bottom: "inset(0 0 100% 0)",
      }

      gsap.set(wrapper, { clipPath: clipStart[direction] })
      gsap.set(img, { scale: 1.3 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      })

      tl.to(wrapper, {
        clipPath: "inset(0 0% 0 0%)",
        duration,
        ease: "power3.inOut",
      }).to(
        img,
        {
          scale: 1,
          duration: duration * 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
    }, containerRef)

    return () => ctx.revert()
  }, [imageSrc, direction, duration])

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center py-12", className)}
    >
      <div
        className="reveal-wrapper"
        style={{
          overflow: "hidden",
          borderRadius: "12px",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <img
          className="reveal-image"
          src={imageSrc}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  )
}
