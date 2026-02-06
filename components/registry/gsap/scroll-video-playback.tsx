"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { cn } from "@/lib/utils/cn"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollVideoPlaybackProps {
  videoSrc?: string
  poster?: string
  overlayText?: string
  scrubSmooth?: number
  className?: string
}

export default function GsapScrollVideoPlayback({
  videoSrc = "",
  poster = "",
  overlayText = "Scroll to play",
  scrubSmooth = 0.5,
  className,
}: GsapScrollVideoPlaybackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return

    const video = videoRef.current

    const setupAnimation = () => {
      const ctx = gsap.context(() => {
        // Fade out overlay text as scroll begins
        if (overlayRef.current) {
          gsap.to(overlayRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "top -10%",
              scrub: true,
            },
          })
        }

        // Scrub video playback
        const videoDuration = video.duration || 10

        gsap.to(video, {
          currentTime: videoDuration,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: scrubSmooth,
            pin: ".video-playback-wrapper",
          },
        })
      }, containerRef)

      return () => ctx.revert()
    }

    if (video.readyState >= 1) {
      setupAnimation()
    } else {
      video.addEventListener("loadedmetadata", setupAnimation, { once: true })
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupAnimation)
    }
  }, [videoSrc, scrubSmooth])

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: "400vh" }}
    >
      <div
        className="video-playback-wrapper"
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
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
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
              <line x1="17" y1="17" x2="22" y2="17" />
            </svg>
            <span style={{ fontSize: "1rem" }}>Add a video source for scroll-synced playback</span>
          </div>
        )}

        {/* Overlay text */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#fff",
              opacity: 0.7,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {overlayText}
          </span>
        </div>
      </div>
    </div>
  )
}
