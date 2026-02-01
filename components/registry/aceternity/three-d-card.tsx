"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface Aceternity3DCardProps {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  link?: string
  linkText?: string
  tags?: string[]
  className?: string
}

function CardContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = e.clientX - centerX
    const y = e.clientY - centerY
    setRotateX(-y / 10)
    setRotateY(x / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative group/card", className)}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  )
}

function CardItem({
  children,
  className,
  translateZ = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  translateZ?: number
  as?: React.ElementType
}) {
  return (
    <Tag
      className={cn(className)}
      style={{
        transform: `translateZ(${translateZ}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </Tag>
  )
}

export default function Aceternity3DCard({
  title = "Make things float in air",
  description = "Hover over this card to unleash the power of CSS perspective. Create stunning 3D effects with ease.",
  image = "https://placehold.co/600x400/1a1a2e/ffffff?text=3D+Card",
  imageAlt = "3D Card thumbnail",
  link = "#",
  linkText = "Try now →",
  tags = ["Next.js", "Tailwind", "Framer Motion"],
  className,
}: Aceternity3DCardProps) {
  return (
    <CardContainer className={cn("inter-var w-full max-w-sm", className)}>
      <div className="relative rounded-xl p-6 bg-gray-50 dark:bg-black dark:border dark:border-white/[0.2] border border-black/[0.1] group-hover/card:shadow-2xl transition-shadow duration-300">
        <CardItem translateZ={50}>
          <h3 className="text-xl font-bold text-neutral-600 dark:text-white">
            {title}
          </h3>
        </CardItem>
        <CardItem translateZ={60} className="mt-2">
          <p className="text-sm text-neutral-500 dark:text-neutral-300 max-w-sm">
            {description}
          </p>
        </CardItem>
        <CardItem translateZ={100} className="mt-4 w-full">
          <img
            src={image}
            alt={imageAlt}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-shadow duration-300"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem translateZ={20}>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardItem>
          <CardItem translateZ={20}>
            <a
              href={link}
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:opacity-80 transition-opacity"
            >
              {linkText}
            </a>
          </CardItem>
        </div>
      </div>
    </CardContainer>
  )
}
