"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface ParallaxImage {
  src: string
  alt: string
  speed: number
}

export interface GsapScrollParallaxImagesProps {
  images?: ParallaxImage[]
  gap?: number
  className?: string
}

const defaultImages: ParallaxImage[] = [
  { src: "https://picsum.photos/seed/parallax1/600/400", alt: "Parallax image 1", speed: 0.5 },
  { src: "https://picsum.photos/seed/parallax2/600/400", alt: "Parallax image 2", speed: 1.0 },
  { src: "https://picsum.photos/seed/parallax3/600/400", alt: "Parallax image 3", speed: 0.3 },
  { src: "https://picsum.photos/seed/parallax4/600/400", alt: "Parallax image 4", speed: 0.8 },
]

export default function GsapScrollParallaxImages({
  images = defaultImages,
  gap = 24,
  className,
}: GsapScrollParallaxImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const imageEls = containerRef.current!.querySelectorAll(".parallax-image-wrapper")

      imageEls.forEach((el, i) => {
        const speed = images[i]?.speed ?? 0.5
        const img = el.querySelector("img")
        if (!img) return

        gsap.to(img, {
          yPercent: -30 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [images])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: `${gap}px`,
        padding: "2rem 0",
      }}
    >
      {images.map((image, i) => (
        <div
          key={i}
          className="parallax-image-wrapper"
          style={{
            overflow: "hidden",
            borderRadius: "12px",
            height: "350px",
            position: "relative",
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{
              width: "100%",
              height: "130%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              willChange: "transform",
            }}
          />
        </div>
      ))}
    </div>
  )
}
