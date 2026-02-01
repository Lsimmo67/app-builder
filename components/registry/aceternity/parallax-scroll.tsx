"use client"

import { useScroll, useTransform, motion } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[]
  className?: string
}) => {
  const gridRef = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  })

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200])
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200])

  const third = Math.ceil(images.length / 3)
  const firstPart = images.slice(0, third)
  const secondPart = images.slice(third, 2 * third)
  const thirdPart = images.slice(2 * third)

  return (
    <div className={cn("h-[40rem] items-start overflow-y-auto w-full", className)} ref={gridRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10" ref={gridRef}>
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
              <img src={el} className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0" height="400" width="400" alt="thumbnail" />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img src={el} className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0" height="400" width="400" alt="thumbnail" />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img src={el} className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0" height="400" width="400" alt="thumbnail" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Builder wrapper
export interface AceternityParallaxScrollProps {
  className?: string
}

const defaultImages = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=800",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
  "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=800",
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800",
]

export default function AceternityParallaxScrollWrapper({ className }: AceternityParallaxScrollProps) {
  return <ParallaxScroll images={defaultImages} className={className} />
}
