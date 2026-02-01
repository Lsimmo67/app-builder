"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityWobbleCardProps {
  items?: {
    title: string
    description: string
    image?: string
    colSpan?: 1 | 2 | 3
    bgColor?: string
  }[]
  className?: string
}

function WobbleCardItem({
  item,
}: {
  item: {
    title: string
    description: string
    image?: string
    colSpan?: 1 | 2 | 3
    bgColor?: string
  }
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    })
  }

  const colSpanClass =
    item.colSpan === 3
      ? "col-span-1 md:col-span-3"
      : item.colSpan === 2
      ? "col-span-1 md:col-span-2"
      : "col-span-1"

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl min-h-[300px] p-8 cursor-pointer",
        colSpanClass
      )}
      style={{ backgroundColor: item.bgColor || "#ec4899" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
      }}
      animate={{
        rotateX: isHovered ? mousePos.y : 0,
        rotateY: isHovered ? mousePos.x : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="relative z-10 max-w-xs">
        <h3 className="text-left text-balance text-xl md:text-2xl font-semibold tracking-[-0.015em] text-white">
          {item.title}
        </h3>
        <p className="mt-4 text-left text-base text-white/80">
          {item.description}
        </p>
      </div>
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="absolute -right-4 -bottom-10 w-64 h-64 object-contain rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-300 filter"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
    </motion.div>
  )
}

export default function AceternityWobbleCard({
  items = [
    {
      title: "Gippity AI powers the entire universe",
      description:
        "With over 100,000 monthly active bot users, Gippity AI is the most popular AI platform for developers.",
      colSpan: 2 as const,
      bgColor: "#ec4899",
    },
    {
      title: "No shirt, no shoes, no weapons.",
      description:
        "If someone yells at you, do not go back to them. Instead, go to the nearest exit.",
      colSpan: 1 as const,
      bgColor: "#8b5cf6",
    },
    {
      title: "Signup for blazing-fast cutting-edge state of the art Gippity AI wrapper today.",
      description:
        "With over 100,000 monthly active bot users, Gippity AI is the most popular AI platform for developers.",
      colSpan: 3 as const,
      bgColor: "#3b82f6",
    },
  ],
  className,
}: AceternityWobbleCardProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto w-full",
        className
      )}
    >
      {items.map((item, i) => (
        <WobbleCardItem key={i} item={item} />
      ))}
    </div>
  )
}
