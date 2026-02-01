"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface StackCard {
  title: string
  description: string
  image: string
  color: string
}

export interface SkiperCardStackScrollProps {
  cards?: StackCard[]
  className?: string
}

const defaultCards: StackCard[] = [
  {
    title: "Design",
    description:
      "Create beautiful, intuitive interfaces that delight your users and bring your product vision to life.",
    image: "https://placehold.co/800x500/6366f1/ffffff?text=Design",
    color: "#6366f1",
  },
  {
    title: "Develop",
    description:
      "Write clean, maintainable code using modern frameworks and best practices for maximum performance.",
    image: "https://placehold.co/800x500/ec4899/ffffff?text=Develop",
    color: "#ec4899",
  },
  {
    title: "Deploy",
    description:
      "Ship with confidence using automated CI/CD pipelines, monitoring, and zero-downtime deployments.",
    image: "https://placehold.co/800x500/14b8a6/ffffff?text=Deploy",
    color: "#14b8a6",
  },
  {
    title: "Scale",
    description:
      "Grow your infrastructure seamlessly with auto-scaling, edge computing, and global CDN distribution.",
    image: "https://placehold.co/800x500/f97316/ffffff?text=Scale",
    color: "#f97316",
  },
]

function CardItem({
  card,
  index,
  totalCards,
  containerRef,
}: {
  card: StackCard
  index: number
  totalCards: number
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const cardStart = index / totalCards
  const cardEnd = (index + 1) / totalCards

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [1, 0.9]
  )

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [0, -40]
  )

  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd - 0.05, cardEnd],
    [1, 1, index === totalCards - 1 ? 1 : 0.6]
  )

  return (
    <motion.div
      className="sticky top-24 mx-auto w-full max-w-4xl px-6"
      style={{
        scale,
        y,
        opacity,
        zIndex: index,
      }}
    >
      <div
        className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{ backgroundColor: `${card.color}15` }}
      >
        <div className="grid gap-6 p-8 md:grid-cols-2 md:p-12">
          <div className="flex flex-col justify-center">
            <span
              className="mb-2 text-sm font-medium"
              style={{ color: card.color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              {card.title}
            </h3>
            <p className="mt-4 text-base text-white/60 leading-relaxed">
              {card.description}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SkiperCardStackScroll({
  cards = defaultCards,
  className,
}: SkiperCardStackScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="space-y-[-80vh]">
        {cards.map((card, index) => (
          <div key={index} className="h-screen pt-24">
            <CardItem
              card={card}
              index={index}
              totalCards={cards.length}
              containerRef={containerRef}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
