"use client"

import React from "react"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { cn } from "@/lib/utils/cn"
import { useEffect } from "react"

export interface AceternityTypewriterProps {
  words?: { text: string; className?: string }[]
  className?: string
  cursorClassName?: string
}

export default function AceternityTypewriter({
  words = [
    { text: "Build" },
    { text: "awesome" },
    { text: "apps" },
    { text: "with" },
    { text: "Aceternity.", className: "text-blue-500 dark:text-blue-500" },
  ],
  className,
  cursorClassName,
}: AceternityTypewriterProps) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1 },
        { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" }
      )
    }
  }, [isInView, animate])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, i) => (
          <div key={`word-${i}`} className="inline-block">
            {word.text.split("").map((char, j) => (
              <motion.span
                key={`char-${j}`}
                initial={{ opacity: 0, display: "none" }}
                className={cn("text-black dark:text-white", word.className)}
              >
                {char}
              </motion.span>
            ))}
            {i < words.length - 1 && <span>&nbsp;</span>}
          </div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center", className)}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500 ml-1",
          cursorClassName
        )}
      />
    </div>
  )
}
