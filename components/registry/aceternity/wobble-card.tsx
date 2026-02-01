"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - (rect.left + rect.width / 2)) / 20
    const y = (clientY - (rect.top + rect.height / 2)) / 20
    setMousePosition({ x, y })
  }
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "mx-auto w-full bg-indigo-800 relative rounded-2xl overflow-hidden",
        containerClassName
      )}
    >
      <div
        className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={cn("h-full px-4 py-20 sm:px-10", className)}
        >
          <Noise />
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%",
      }}
    ></div>
  )
}

export interface AceternityWobbleCardProps {
  items?: {
    title: string
    description: string
    image?: string
    colSpan?: number
    bgColor?: string
  }[]
  className?: string
}

export default function AceternityWobbleCardWrapper({
  items = [
    {
      title: "Gippity AI powers the entire universe",
      description: "With over 100,000 monthly active bot users, Gippity AI is the most popular AI platform for developers.",
      colSpan: 2,
      bgColor: "bg-pink-800",
    },
    {
      title: "No shirt, no shoes, no weapons.",
      description: "If someone asks you to do something sketchy, just say no.",
      bgColor: "bg-indigo-800",
    },
    {
      title: "Signup for blazing-fast cutting-edge state of the art Gippity AI wrapper today!",
      description: "With over 100,000 monthly active bot users.",
      bgColor: "bg-blue-900",
    },
  ],
  className,
}: AceternityWobbleCardProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full", className)}>
      {items.map((item, i) => (
        <WobbleCard
          key={i}
          containerClassName={cn(
            item.bgColor || "bg-indigo-800",
            item.colSpan === 2 ? "col-span-1 lg:col-span-2" : "col-span-1",
            "min-h-[300px]"
          )}
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              {item.title}
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              {item.description}
            </p>
          </div>
          {item.image && (
            <img
              src={item.image}
              width={500}
              height={500}
              alt="wobble card image"
              className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          )}
        </WobbleCard>
      ))}
    </div>
  )
}
