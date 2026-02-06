"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapLoadingSequenceProps {
  text?: string
  barColor?: string
  duration?: number
  className?: string
}

export default function GsapLoadingSequence({
  text = "Loading",
  barColor = "#667eea",
  duration = 2.5,
  className,
}: GsapLoadingSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const overlay = containerRef.current!.querySelector(".loading-overlay") as HTMLElement
      const bar = containerRef.current!.querySelector(".loading-bar-fill") as HTMLElement
      const counter = containerRef.current!.querySelector(".loading-counter") as HTMLElement
      const letters = containerRef.current!.querySelectorAll(".loading-letter")
      const content = containerRef.current!.querySelector(".loaded-content") as HTMLElement

      const tl = gsap.timeline({
        onComplete: () => setIsComplete(true),
      })

      // Stagger letters in
      tl.fromTo(
        letters,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }
      )

      // Animate progress bar
      const obj = { val: 0 }
      tl.to(
        bar,
        {
          scaleX: 1,
          duration: duration * 0.7,
          ease: "power1.inOut",
        },
        0.3
      ).to(
        obj,
        {
          val: 100,
          duration: duration * 0.7,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = `${Math.round(obj.val)}%`
          },
        },
        0.3
      )

      // Fade out loader, reveal content
      tl.to(overlay, {
        yPercent: -100,
        duration: 0.6,
        ease: "power3.inOut",
      }).fromTo(
        content,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      )
    }, containerRef)

    return () => ctx.revert()
  }, [text, barColor, duration])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight: "400px" }}
    >
      {/* Loading overlay */}
      <div
        className="loading-overlay"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0f172a",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.05em" }}>
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="loading-letter"
              style={{
                display: "inline-block",
                fontSize: "2rem",
                fontWeight: 700,
                opacity: 0,
                color: "#fff",
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <div
          style={{
            width: "200px",
            height: "3px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            className="loading-bar-fill"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: barColor,
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>

        <span
          className="loading-counter"
          style={{
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.5)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          0%
        </span>
      </div>

      {/* Loaded content */}
      <div
        className="loaded-content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          opacity: 0,
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Content Loaded</h2>
      </div>
    </div>
  )
}
