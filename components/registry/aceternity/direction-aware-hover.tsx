"use client"

import React, { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityDirectionAwareHoverProps {
  image?: string
  title?: string
  description?: string
  price?: string
  className?: string
}

function getDirection(
  ev: React.MouseEvent<HTMLDivElement>,
  ref: React.RefObject<HTMLDivElement>
): "top" | "bottom" | "left" | "right" {
  if (!ref.current) return "left"
  const rect = ref.current.getBoundingClientRect()
  const w = rect.width
  const h = rect.height
  const x = ev.clientX - rect.left - w / 2
  const y = ev.clientY - rect.top - h / 2
  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4
  const directions: ("top" | "right" | "bottom" | "left")[] = [
    "top",
    "right",
    "bottom",
    "left",
  ]
  return directions[d]
}

function getAnimationValues(direction: string) {
  switch (direction) {
    case "top":
      return { initial: { y: -30, opacity: 0 }, target: { y: 0, opacity: 1 } }
    case "bottom":
      return { initial: { y: 30, opacity: 0 }, target: { y: 0, opacity: 1 } }
    case "left":
      return { initial: { x: -30, opacity: 0 }, target: { x: 0, opacity: 1 } }
    case "right":
      return { initial: { x: 30, opacity: 0 }, target: { x: 0, opacity: 1 } }
    default:
      return { initial: { y: -30, opacity: 0 }, target: { y: 0, opacity: 1 } }
  }
}

export default function AceternityDirectionAwareHover({
  image = "https://placehold.co/600x600/1a1a2e/ffffff?text=Hover+Me",
  title = "Beautiful Product",
  description = "An amazing product crafted with care and attention to detail.",
  price = "$129.99",
  className,
}: AceternityDirectionAwareHoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState<string>("left")
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const dir = getDirection(e, ref as React.RefObject<HTMLDivElement>)
    setDirection(dir)
    setIsHovered(true)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const dir = getDirection(e, ref as React.RefObject<HTMLDivElement>)
    setDirection(dir)
    setIsHovered(false)
  }

  const { initial, target } = getAnimationValues(direction)

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-72 h-96 rounded-lg overflow-hidden bg-transparent cursor-pointer group",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={initial}
            animate={target}
            exit={initial}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-6"
          >
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-neutral-300 mt-1">{description}</p>
            {price && (
              <p className="text-lg font-semibold text-white mt-2">{price}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
