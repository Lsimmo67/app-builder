"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityWavyBackgroundProps {
  title?: string
  subtitle?: string
  blur?: number
  speed?: "slow" | "fast"
  waveWidth?: number
  waveOpacity?: number
  colors?: string[]
  className?: string
}

export default function AceternityWavyBackground({
  title = "Wavy Background Effect",
  subtitle = "A beautiful canvas-based wave animation that creates depth and motion in your backgrounds.",
  blur = 10,
  speed = "slow",
  waveWidth = 50,
  waveOpacity = 0.5,
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  className,
}: AceternityWavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let nt = 0
    const speedVal = speed === "fast" ? 0.002 : 0.001

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      ctx.filter = `blur(${blur}px)`
    }

    window.addEventListener("resize", handleResize)
    ctx.filter = `blur(${blur}px)`

    const drawWave = (n: number) => {
      nt += speedVal
      for (let i = 0; i < n; i++) {
        ctx.beginPath()
        ctx.lineWidth = waveWidth
        ctx.strokeStyle = colors[i % colors.length]
        ctx.globalAlpha = waveOpacity
        for (let x = 0; x < w; x += 5) {
          const y =
            Math.sin(x / 200 + i * 0.5 + nt) * 100 +
            Math.sin(x / 100 + i * 0.3 + nt * 0.5) * 50 +
            h * 0.5
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
        ctx.closePath()
      }
    }

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)"
      ctx.globalAlpha = 1
      ctx.fillRect(0, 0, w, h)
      drawWave(5)
      animationId.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [blur, speed, waveWidth, waveOpacity, colors])

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center min-h-[500px] overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-5xl lg:text-7xl text-white font-bold inter-var"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg mt-4 text-white/70 font-normal inter-var max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
