"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: { title: string; src: string }
    index: number
    hovered: number | null
    setHovered: React.Dispatch<React.SetStateAction<number | null>>
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
)

Card.displayName = "Card"

export function FocusCards({ cards }: { cards: { title: string; src: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  )
}

export interface AceternityFocusCardsProps {
  cards?: { title: string; src: string }[]
  className?: string
}

const defaultCards = [
  { title: "Forest Adventure", src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop" },
  { title: "Valley of life", src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop" },
  { title: "Sala Behnam", src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop" },
  { title: "Camping is life", src: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?q=80&w=3456&auto=format&fit=crop" },
  { title: "The road ahead", src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop" },
  { title: "Mountain peak", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=3540&auto=format&fit=crop" },
]

export default function AceternityFocusCardsWrapper({
  cards = defaultCards,
  className,
}: AceternityFocusCardsProps) {
  return (
    <div className={cn("p-8", className)}>
      <FocusCards cards={cards} />
    </div>
  )
}
