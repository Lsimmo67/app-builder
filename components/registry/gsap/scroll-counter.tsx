"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollCounterProps {
  endValue?: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export default function GsapScrollCounter({
  endValue = 1234,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: GsapScrollCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)

  useEffect(() => {
    if (!containerRef.current || !numberRef.current) return

    const obj = { value: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: endValue,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          const formatted = obj.value.toFixed(decimals)
          setDisplay(`${prefix}${Number(formatted).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`)
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [endValue, duration, prefix, suffix, decimals])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
      }}
    >
      <span
        ref={numberRef}
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 900,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {display}
      </span>
    </div>
  )
}
