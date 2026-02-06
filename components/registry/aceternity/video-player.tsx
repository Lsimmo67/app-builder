"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityVideoPlayerProps {
  src?: string
  poster?: string
  title?: string
  className?: string
}

export default function AceternityVideoPlayer({
  src = "",
  poster = "",
  title = "Video Title",
  className,
}: AceternityVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cn(
        "relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 group",
        className
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video element */}
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full aspect-video object-cover"
          onEnded={() => setIsPlaying(false)}
        />
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mb-4"
            >
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
            <p className="text-neutral-400 text-sm">{title}</p>
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"
          >
            {/* Title bar */}
            <div className="absolute top-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-medium">{title}</p>
            </div>

            {/* Center play button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            {/* Bottom controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-4">
              {/* Progress bar */}
              <div className="flex-1 h-1 bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: 30, ease: "linear" }}
                />
              </div>

              {/* Volume icon */}
              <button className="text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
                </svg>
              </button>

              {/* Fullscreen icon */}
              <button className="text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
