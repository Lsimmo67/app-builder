"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export const MaskContainer = ({
  children, revealText, size = 10, revealSize = 600, className,
}: {
  children?: string | React.ReactNode; revealText?: string | React.ReactNode; size?: number; revealSize?: number; className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null })
  const containerRef = useRef<any>(null)

  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  useEffect(() => {
    containerRef.current.addEventListener("mousemove", updateMousePosition)
    return () => { if (containerRef.current) containerRef.current.removeEventListener("mousemove", updateMousePosition) }
  }, [])

  const maskSize = isHovered ? revealSize : size

  return (
    <motion.div ref={containerRef} className={cn("relative h-screen", className)} animate={{ backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)" }} transition={{ backgroundColor: { duration: 0.3 } }}>
      <motion.div
        className="absolute flex h-full w-full items-center justify-center bg-black text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] dark:bg-white"
        animate={{ maskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`, maskSize: `${maskSize}px` }}
        transition={{ maskSize: { duration: 0.3, ease: "easeInOut" }, maskPosition: { duration: 0.15, ease: "linear" } }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold">{children}</div>
      </motion.div>
      <div className="flex h-full w-full items-center justify-center">{revealText}</div>
    </motion.div>
  )
}

export interface AceternitySvgMaskEffectProps { className?: string }

export default function AceternitySvgMaskEffectWrapper({ className }: AceternitySvgMaskEffectProps) {
  return (
    <MaskContainer className={cn("h-[40rem] border rounded-md", className)} revealText={<p className="max-w-4xl mx-auto text-slate-800 text-center text-4xl font-bold">The mask reveals hidden content on hover</p>}>
      The first rule of <span className="text-red-500">MaskContainer</span> is that you do not talk about MaskContainer.
    </MaskContainer>
  )
}
