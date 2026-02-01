"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface SkiperDrawingCursorEffectProps {
  strokeColor?: string
  strokeWidth?: number
  fadeSpeed?: number
  className?: string
}

interface Point {
  x: number
  y: number
}

interface Stroke {
  id: number
  points: Point[]
  createdAt: number
}

export default function SkiperDrawingCursorEffect({
  strokeColor = "#6366f1",
  strokeWidth = 3,
  fadeSpeed = 2,
  className,
}: SkiperDrawingCursorEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const currentStrokeRef = useRef<Point[]>([])
  const strokeIdRef = useRef(0)

  const getPoint = useCallback(
    (e: React.MouseEvent): Point | null => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return null
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    },
    []
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const point = getPoint(e)
      if (!point) return
      setIsDrawing(true)
      currentStrokeRef.current = [point]
    },
    [getPoint]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawing) return
      const point = getPoint(e)
      if (!point) return

      currentStrokeRef.current.push(point)

      setStrokes((prev) => {
        const updated = prev.filter(
          (s) => s.id !== strokeIdRef.current
        )
        return [
          ...updated,
          {
            id: strokeIdRef.current,
            points: [...currentStrokeRef.current],
            createdAt: Date.now(),
          },
        ]
      })
    },
    [isDrawing, getPoint]
  )

  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
      strokeIdRef.current++
      currentStrokeRef.current = []
    }
    setIsDrawing(false)
  }, [isDrawing])

  // Fade out old strokes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setStrokes((prev) =>
        prev.filter(
          (stroke) => now - stroke.createdAt < fadeSpeed * 1000
        )
      )
    }, 100)
    return () => clearInterval(interval)
  }, [fadeSpeed])

  const pointsToPath = (points: Point[]): string => {
    if (points.length < 2) return ""
    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const mid = {
        x: (points[i - 1].x + points[i].x) / 2,
        y: (points[i - 1].y + points[i].y) / 2,
      }
      path += ` Q ${points[i - 1].x} ${points[i - 1].y}, ${mid.x} ${mid.y}`
    }
    return path
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[400px] w-full cursor-crosshair overflow-hidden rounded-xl border border-white/10 bg-black/50",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Helper text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-lg text-white/20">Click and drag to draw</p>
      </div>

      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: "none" }}
      >
        {strokes.map((stroke) => {
          const age = (Date.now() - stroke.createdAt) / (fadeSpeed * 1000)
          const opacity = Math.max(0, 1 - age)
          return (
            <motion.path
              key={stroke.id}
              d={pointsToPath(stroke.points)}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity }}
              transition={{ pathLength: { duration: 0 } }}
            />
          )
        })}
      </svg>
    </div>
  )
}
