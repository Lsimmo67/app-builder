"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollVideoScrubProps {
  videoSrc?: string
  poster?: string
  height?: string
  className?: string
}

export default function GsapScrollVideoScrub({
  videoSrc = "",
  poster = "",
  height = "300vh",
  className,
}: GsapScrollVideoScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return

    const video = videoRef.current

    const onLoadedMetadata = () => {
      const ctx = gsap.context(() => {
        gsap.to(video, {
          currentTime: video.duration || 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            pin: ".video-wrapper",
          },
        })
      }, containerRef)

      return () => ctx.revert()
    }

    if (video.readyState >= 1) {
      onLoadedMetadata()
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true })
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
    }
  }, [videoSrc])

  return (
    <div ref={containerRef} className={cn("relative", className)} style={{ height }}>
      <div
        className="video-wrapper"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            muted
            playsInline
            preload="auto"
            style={{
              width: "100%",
              maxWidth: "900px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "500px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1a1a2e, #16213e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span style={{ fontSize: "0.95rem" }}>Add a video source to scrub on scroll</span>
          </div>
        )}
      </div>
    </div>
  )
}
