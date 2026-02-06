"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/dist/Draggable"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable)
}

export interface SliderItem {
  title: string
  image: string
}

export interface GsapDragSlider3dProps {
  items?: SliderItem[]
  perspective?: number
  className?: string
}

const defaultItems: SliderItem[] = [
  { title: "Slide One", image: "https://picsum.photos/seed/3d1/400/300" },
  { title: "Slide Two", image: "https://picsum.photos/seed/3d2/400/300" },
  { title: "Slide Three", image: "https://picsum.photos/seed/3d3/400/300" },
  { title: "Slide Four", image: "https://picsum.photos/seed/3d4/400/300" },
  { title: "Slide Five", image: "https://picsum.photos/seed/3d5/400/300" },
]

export default function GsapDragSlider3d({
  items = defaultItems,
  perspective = 800,
  className,
}: GsapDragSlider3dProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!
      const slides = track.querySelectorAll<HTMLElement>(".slide-3d")
      const slideWidth = 320
      const totalWidth = slideWidth * slides.length

      const updateSlides = () => {
        const trackX = gsap.getProperty(track, "x") as number

        slides.forEach((slide, i) => {
          const slideCenter = i * slideWidth + slideWidth / 2
          const viewCenter = -trackX + containerRef.current!.offsetWidth / 2
          const distance = slideCenter - viewCenter
          const normalizedDist = distance / (containerRef.current!.offsetWidth / 2)

          gsap.set(slide, {
            rotateY: normalizedDist * -30,
            z: -Math.abs(normalizedDist) * 100,
            opacity: 1 - Math.abs(normalizedDist) * 0.3,
            scale: 1 - Math.abs(normalizedDist) * 0.1,
          })
        })
      }

      Draggable.create(track, {
        type: "x",
        inertia: true,
        bounds: {
          minX: -(totalWidth - containerRef.current!.offsetWidth),
          maxX: 0,
        },
        onDrag: updateSlides,
        onThrowUpdate: updateSlides,
      })

      updateSlides()
    }, containerRef)

    return () => ctx.revert()
  }, [items, perspective])

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={{
        perspective: `${perspective}px`,
        padding: "3rem 0",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "0",
          cursor: "grab",
          willChange: "transform",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="slide-3d"
            style={{
              minWidth: "300px",
              margin: "0 10px",
              borderRadius: "16px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
              draggable={false}
            />
            <div style={{ padding: "1rem 1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
