"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityAnimatedTooltipProps {
  items?: { id: number; name: string; designation: string; image: string }[]
  className?: string
}

function TooltipItem({
  item,
}: {
  item: { id: number; name: string; designation: string; image: string }
}) {
  const [isHovered, setIsHovered] = useState(false)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0)
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  )
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = (event.target as HTMLElement).offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth)
  }

  return (
    <div
      className="relative group -mr-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 260, damping: 10 },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{ translateX, rotate }}
            className="absolute -top-16 -left-1/2 translate-x-1/2 flex flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
          >
            <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
            <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
            <p className="text-white font-bold text-sm relative z-30 whitespace-nowrap">
              {item.name}
            </p>
            <p className="text-white/60 text-xs whitespace-nowrap">
              {item.designation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <img
        onMouseMove={handleMouseMove}
        src={item.image}
        alt={item.name}
        className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 border-white group-hover:scale-105 group-hover:z-30 relative transition duration-500 cursor-pointer"
      />
    </div>
  )
}

export default function AceternityAnimatedTooltip({
  items = [
    { id: 1, name: "John Doe", designation: "Software Engineer", image: "https://placehold.co/100x100/3b82f6/ffffff?text=JD" },
    { id: 2, name: "Robert Johnson", designation: "Product Manager", image: "https://placehold.co/100x100/8b5cf6/ffffff?text=RJ" },
    { id: 3, name: "Jane Smith", designation: "Data Scientist", image: "https://placehold.co/100x100/ec4899/ffffff?text=JS" },
    { id: 4, name: "Emily Davis", designation: "UX Designer", image: "https://placehold.co/100x100/f59e0b/ffffff?text=ED" },
    { id: 5, name: "Tyler Durden", designation: "Creative Director", image: "https://placehold.co/100x100/10b981/ffffff?text=TD" },
    { id: 6, name: "Dora Explorer", designation: "Frontend Dev", image: "https://placehold.co/100x100/ef4444/ffffff?text=DE" },
  ],
  className,
}: AceternityAnimatedTooltipProps) {
  return (
    <div className={cn("flex flex-row items-center justify-center w-full", className)}>
      {items.map((item) => (
        <TooltipItem key={item.id} item={item} />
      ))}
    </div>
  )
}
