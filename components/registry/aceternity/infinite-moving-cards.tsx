"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityInfiniteCardsProps {
  items?: { quote: string; name: string; title: string }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}

export default function AceternityInfiniteCards({
  items = [
    {
      quote: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ],
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: AceternityInfiniteCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (scrollerRef.current && containerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        scrollerRef.current?.appendChild(duplicatedItem)
      })

      const speedMap = { fast: "20s", normal: "40s", slow: "80s" }
      containerRef.current.style.setProperty("--animation-duration", speedMap[speed])
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      )
      setStart(true)
    }
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={
          start
            ? {
                animation: `scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite`,
              }
            : undefined
        }
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] bg-gradient-to-b from-slate-800 to-slate-900"
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.5rem));
          }
        }
      `}} />
    </div>
  )
}
