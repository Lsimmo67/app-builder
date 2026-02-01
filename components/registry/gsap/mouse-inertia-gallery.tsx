"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

export interface InertiaImage {
  src: string
  alt: string
}

export interface GsapMouseInertiaGalleryProps {
  images?: InertiaImage[]
  columns?: number
  imageSize?: number
  velocity?: number
  className?: string
}

const defaultImages: InertiaImage[] = [
  { src: "https://picsum.photos/seed/inertia1/300/300", alt: "Gallery 1" },
  { src: "https://picsum.photos/seed/inertia2/300/300", alt: "Gallery 2" },
  { src: "https://picsum.photos/seed/inertia3/300/300", alt: "Gallery 3" },
  { src: "https://picsum.photos/seed/inertia4/300/300", alt: "Gallery 4" },
  { src: "https://picsum.photos/seed/inertia5/300/300", alt: "Gallery 5" },
  { src: "https://picsum.photos/seed/inertia6/300/300", alt: "Gallery 6" },
  { src: "https://picsum.photos/seed/inertia7/300/300", alt: "Gallery 7" },
  { src: "https://picsum.photos/seed/inertia8/300/300", alt: "Gallery 8" },
  { src: "https://picsum.photos/seed/inertia9/300/300", alt: "Gallery 9" },
]

export default function GsapMouseInertiaGallery({
  images = defaultImages,
  columns = 3,
  imageSize = 200,
  velocity = 0.15,
  className,
}: GsapMouseInertiaGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const galleryItems = container.querySelectorAll<HTMLElement>(".inertia-item")

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }

    container.addEventListener("mousemove", handleMouseMove)

    const ctx = gsap.context(() => {
      gsap.ticker.add(() => {
        currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.05
        currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.05

        galleryItems.forEach((item, i) => {
          const depth = (i % 3) * 0.3 + 0.5
          const moveX = currentPos.current.x * velocity * 100 * depth
          const moveY = currentPos.current.y * velocity * 100 * depth

          gsap.set(item, {
            x: moveX,
            y: moveY,
          })
        })
      })
    }, container)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      ctx.revert()
    }
  }, [images, velocity])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, ${imageSize}px)`,
        gap: "16px",
        justifyContent: "center",
        padding: "3rem",
        minHeight: "400px",
        alignItems: "center",
      }}
    >
      {images.map((image, i) => (
        <div
          key={i}
          className="inertia-item"
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            borderRadius: "12px",
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  )
}
