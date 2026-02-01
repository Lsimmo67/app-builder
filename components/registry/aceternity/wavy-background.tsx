"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"
import { createNoise3D } from "simplex-noise"

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
  [key: string]: unknown
}) => {
  const noise = createNoise3D()
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement | null
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001
      case "fast":
        return 0.002
      default:
        return 0.001
    }
  }

  const init = () => {
    canvas = canvasRef.current
    if (!canvas) return
    ctx = canvas.getContext("2d")
    w = ctx!.canvas.width = window.innerWidth
    h = ctx!.canvas.height = window.innerHeight
    ctx!.filter = `blur(${blur}px)`
    nt = 0
    window.onresize = function () {
      w = ctx!.canvas.width = window.innerWidth
      h = ctx!.canvas.height = window.innerHeight
      ctx!.filter = `blur(${blur}px)`
    }
    render()
  }

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ]

  const drawWave = (n: number) => {
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx!.beginPath()
      ctx!.lineWidth = waveWidth || 50
      ctx!.strokeStyle = waveColors[i % waveColors.length]
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100
        ctx!.lineTo(x, y + h * 0.5)
      }
      ctx!.stroke()
      ctx!.closePath()
    }
  }

  let animationId: number
  const render = () => {
    if (!ctx) return
    ctx.fillStyle = backgroundFill || "black"
    ctx.globalAlpha = waveOpacity || 0.5
    ctx.fillRect(0, 0, w, h)
    drawWave(5)
    animationId = requestAnimationFrame(render)
  }

  useEffect(() => {
    init()
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    )
  }, [])

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  )
}

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

export default function AceternityWavyBackgroundWrapper({
  title = "Wavy Background Effect",
  subtitle = "A beautiful canvas-based wave animation for your hero sections.",
  blur = 10,
  speed = "slow",
  waveWidth = 50,
  waveOpacity = 0.5,
  colors,
  className,
}: AceternityWavyBackgroundProps) {
  return (
    <WavyBackground
      blur={blur}
      speed={speed}
      waveWidth={waveWidth}
      waveOpacity={waveOpacity}
      colors={colors}
      className={className}
    >
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        {title}
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        {subtitle}
      </p>
    </WavyBackground>
  )
}
