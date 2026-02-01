"use client"

import React from "react"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { cn } from "@/lib/utils/cn"
import { useEffect } from "react"

export interface AceternityTextGenerateProps {
  text?: string
  speed?: number
  className?: string
}

export default function AceternityTextGenerate({
  text = "Generating text effects has never been this smooth. Watch each word fade in with perfect timing and beautiful animations.",
  speed = 0.05,
  className,
}: AceternityTextGenerateProps) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  const words = text.split(" ")

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { opacity: 1, filter: "blur(0px)" },
        { duration: 0.5, delay: stagger(speed) }
      )
    }
  }, [isInView, animate, speed])

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-2xl md:text-4xl lg:text-6xl leading-snug tracking-wide text-black dark:text-white">
          <motion.div ref={scope}>
            {words.map((word, idx) => (
              <motion.span
                key={`${word}-${idx}`}
                className="opacity-0 inline-block mr-[0.3em]"
                style={{ filter: "blur(10px)" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
