"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface SkiperParallaxScrollProps {
  images?: string[]
  speed?: number
  gap?: number
  className?: string
}

const defaultImages = [
  "https://placehold.co/600x800/6366f1/ffffff?text=01",
  "https://placehold.co/600x800/ec4899/ffffff?text=02",
  "https://placehold.co/600x800/14b8a6/ffffff?text=03",
  "https://placehold.co/600x800/f97316/ffffff?text=04",
  "https://placehold.co/600x800/8b5cf6/ffffff?text=05",
  "https://placehold.co/600x800/06b6d4/ffffff?text=06",
  "https://placehold.co/600x800/ef4444/ffffff?text=07",
  "https://placehold.co/600x800/22c55e/ffffff?text=08",
  "https://placehold.co/600x800/eab308/ffffff?text=09",
]

export default function SkiperParallaxScroll({
  images = defaultImages,
  speed = 1,
  gap = 8,
  className,
}: SkiperParallaxScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Split images into 3 columns
  const columns = [
    images.filter((_, i) => i % 3 === 0),
    images.filter((_, i) => i % 3 === 1),
    images.filter((_, i) => i % 3 === 2),
  ]

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200 * speed])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200 * speed])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150 * speed])

  const yTransforms = [y1, y2, y3]

  return (
    <div
      ref={containerRef}
      className={cn("h-[150vh] w-full", className)}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="mx-auto flex w-full max-w-6xl justify-center px-6"
          style={{ gap: `${gap * 4}px` }}
        >
          {columns.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              className="flex flex-1 flex-col"
              style={{
                y: yTransforms[colIndex],
                gap: `${gap * 4}px`,
              }}
            >
              {column.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  className="relative overflow-hidden rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: imgIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={image}
                    alt={`Parallax image ${colIndex * column.length + imgIndex + 1}`}
                    className="h-auto w-full object-cover"
                    style={{ aspectRatio: "3/4" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
