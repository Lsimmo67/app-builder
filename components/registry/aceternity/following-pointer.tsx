"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence, useMotionValue } from "motion/react"
import { cn } from "@/lib/utils"

export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title?: string | React.ReactNode
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [isInside, setIsInside] = useState<boolean>(false)

  useEffect(() => {
    if (ref.current) setRect(ref.current.getBoundingClientRect())
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rect) {
      const scrollX = window.scrollX
      const scrollY = window.scrollY
      x.set(e.clientX - rect.left + scrollX)
      y.set(e.clientY - rect.top + scrollY)
    }
  }

  return (
    <div
      onMouseLeave={() => setIsInside(false)}
      onMouseEnter={() => setIsInside(true)}
      onMouseMove={handleMouseMove}
      style={{ cursor: "none" }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>{isInside && <FollowPointer x={x} y={y} title={title} />}</AnimatePresence>
      {children}
    </div>
  )
}

export const FollowPointer = ({ x, y, title }: { x: any; y: any; title?: string | React.ReactNode }) => {
  const colors = ["#0ea5e9", "#737373", "#14b8a6", "#22c55e", "#3b82f6", "#ef4444", "#eab308"]
  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full"
      style={{ top: y, left: x, pointerEvents: "none" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 16 16" className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-sky-600 text-sky-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="min-w-max rounded-full bg-neutral-200 px-2 py-2 text-xs whitespace-nowrap text-white"
      >
        {title || "William Shakespeare"}
      </motion.div>
    </motion.div>
  )
}

// Builder wrapper
export interface AceternityFollowingPointerProps {
  title?: string
  className?: string
}

export default function AceternityFollowingPointerWrapper({
  title = "Follow me",
  className,
}: AceternityFollowingPointerProps) {
  return (
    <FollowerPointerCard title={title} className={cn("w-full max-w-sm mx-auto", className)}>
      <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
        <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden relative">
          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600" />
        </div>
        <div className="p-4">
          <h2 className="font-bold my-4 text-lg text-zinc-700">Following Pointer Card</h2>
          <p className="font-normal my-4 text-sm text-zinc-500">Hover over this card to see the following pointer effect</p>
        </div>
      </div>
    </FollowerPointerCard>
  )
}
