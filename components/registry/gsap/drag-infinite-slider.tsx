"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable)
}

export interface SliderItem {
  content: string
  image: string
}

export interface GsapDragInfiniteSliderProps {
  items?: SliderItem[]
  direction?: "horizontal" | "vertical"
  className?: string
}

const defaultItems: SliderItem[] = [
  { content: "Project Alpha", image: "https://picsum.photos/seed/drag1/400/300" },
  { content: "Project Beta", image: "https://picsum.photos/seed/drag2/400/300" },
  { content: "Project Gamma", image: "https://picsum.photos/seed/drag3/400/300" },
  { content: "Project Delta", image: "https://picsum.photos/seed/drag4/400/300" },
  { content: "Project Epsilon", image: "https://picsum.photos/seed/drag5/400/300" },
]

export default function GsapDragInfiniteSlider({
  items = defaultItems,
  direction = "horizontal",
  className,
}: GsapDragInfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const track = trackRef.current
    const isHoriz = direction === "horizontal"
    const cards = track.querySelectorAll<HTMLElement>(".drag-slide")
    if (cards.length === 0) return

    const cardSize = isHoriz ? cards[0].offsetWidth + 24 : cards[0].offsetHeight + 24
    const totalSize = cardSize * items.length

    // Clone items for seamless loop
    const ctx = gsap.context(() => {
      const wrap = gsap.utils.wrap(-totalSize, 0)

      const draggable = Draggable.create(track, {
        type: isHoriz ? "x" : "y",
        inertia: true,
        onDrag: function () {
          const val = isHoriz ? this.x : this.y
          gsap.set(track, { [isHoriz ? "x" : "y"]: wrap(val) })
        },
        onThrowUpdate: function () {
          const val = isHoriz ? this.x : this.y
          gsap.set(track, { [isHoriz ? "x" : "y"]: wrap(val) })
        },
      })

      // Auto-slide animation
      const autoSlide = gsap.to(track, {
        [isHoriz ? "x" : "y"]: -totalSize,
        duration: items.length * 4,
        ease: "none",
        repeat: -1,
        modifiers: {
          [isHoriz ? "x" : "y"]: (val: string) => wrap(parseFloat(val)) + "px",
        },
      })

      // Pause auto on drag
      track.addEventListener("mousedown", () => autoSlide.pause())
      track.addEventListener("mouseup", () => autoSlide.resume())
    }, containerRef)

    return () => ctx.revert()
  }, [items, direction])

  const isHoriz = direction === "horizontal"

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: "hidden",
        padding: "2rem 0",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexDirection: isHoriz ? "row" : "column",
          gap: "24px",
          width: "fit-content",
        }}
      >
        {/* Render items twice for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="drag-slide"
            style={{
              flexShrink: 0,
              width: isHoriz ? "350px" : "100%",
              borderRadius: "16px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={item.image}
              alt={item.content}
              draggable={false}
              style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "1.25rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{item.content}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
