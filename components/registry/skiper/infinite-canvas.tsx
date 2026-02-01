"use client"

import React, { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface InfiniteCanvasItem {
  content: React.ReactNode
  position: { x: number; y: number }
}

export interface SkiperInfiniteCanvasProps {
  items?: InfiniteCanvasItem[]
  backgroundColor?: string
  className?: string
}

const defaultItems: InfiniteCanvasItem[] = [
  {
    content: (
      <div className="rounded-xl bg-white p-4 shadow-lg">
        <h3 className="font-bold text-gray-900">Design System</h3>
        <p className="text-sm text-gray-500">Colors, typography, spacing</p>
      </div>
    ),
    position: { x: 100, y: 100 },
  },
  {
    content: (
      <div className="rounded-xl bg-blue-500 p-4 text-white shadow-lg">
        <h3 className="font-bold">Components</h3>
        <p className="text-sm text-white/80">Buttons, cards, inputs</p>
      </div>
    ),
    position: { x: 400, y: 200 },
  },
  {
    content: (
      <div className="rounded-xl bg-purple-500 p-4 text-white shadow-lg">
        <h3 className="font-bold">Layout</h3>
        <p className="text-sm text-white/80">Grid, flex, container</p>
      </div>
    ),
    position: { x: 250, y: 350 },
  },
  {
    content: (
      <div className="rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 p-4 text-white shadow-lg">
        <h3 className="font-bold">Animation</h3>
        <p className="text-sm text-white/80">Transitions, keyframes</p>
      </div>
    ),
    position: { x: 600, y: 100 },
  },
]

export default function SkiperInfiniteCanvas({
  items = defaultItems,
  backgroundColor = "#0a0a0a",
  className,
}: SkiperInfiniteCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    },
    [offset]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    },
    [isDragging, dragStart]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale((prev) => Math.max(0.25, Math.min(3, prev - e.deltaY * 0.001)))
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[500px] w-full overflow-hidden rounded-xl border border-white/10",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      style={{ backgroundColor }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: `${30 * scale}px ${30 * scale}px`,
          backgroundPosition: `${offset.x}px ${offset.y}px`,
        }}
      />

      {/* Canvas items */}
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: "0 0",
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute"
            style={{
              left: item.position.x,
              top: item.position.y,
            }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-3 right-3 rounded-full bg-white/10 px-3 py-1 text-xs text-white/60 backdrop-blur-sm">
        {Math.round(scale * 100)}%
      </div>
    </div>
  )
}
