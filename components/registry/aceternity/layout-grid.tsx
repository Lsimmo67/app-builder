"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type Card = { id: number; content: React.ReactNode | string; className: string; thumbnail: string }

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null)
  const [lastSelected, setLastSelected] = useState<Card | null>(null)
  const handleClick = (card: Card) => { setLastSelected(selected); setSelected(card) }
  const handleOutsideClick = () => { setLastSelected(selected); setSelected(null) }

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className)}>
          <motion.div onClick={() => handleClick(card)} className={cn(card.className, "relative overflow-hidden", selected?.id === card.id ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col" : lastSelected?.id === card.id ? "z-40 bg-white rounded-xl h-full w-full" : "bg-white rounded-xl h-full w-full")} layoutId={`card-${card.id}`}>
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div onClick={handleOutsideClick} className={cn("absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10", selected?.id ? "pointer-events-auto" : "pointer-events-none")} animate={{ opacity: selected?.id ? 0.3 : 0 }} />
    </div>
  )
}

const ImageComponent = ({ card }: { card: Card }) => <motion.img layoutId={`image-${card.id}-image`} src={card.thumbnail} height="500" width="500" className={cn("object-cover object-top absolute inset-0 h-full w-full transition duration-200")} alt="thumbnail" />

const SelectedCard = ({ selected }: { selected: Card | null }) => (
  <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="absolute inset-0 h-full w-full bg-black opacity-60 z-10" />
    <motion.div layoutId={`content-${selected?.id}`} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="relative px-8 pb-4 z-[70]">{selected?.content}</motion.div>
  </div>
)

export interface AceternityLayoutGridProps { className?: string }

const defaultCards = [
  { id: 1, content: <p className="font-bold md:text-4xl text-xl text-white">First Card</p>, className: "md:col-span-2", thumbnail: "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800" },
  { id: 2, content: <p className="font-bold md:text-4xl text-xl text-white">Second Card</p>, className: "col-span-1", thumbnail: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?w=800" },
  { id: 3, content: <p className="font-bold md:text-4xl text-xl text-white">Third Card</p>, className: "col-span-1", thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800" },
  { id: 4, content: <p className="font-bold md:text-4xl text-xl text-white">Fourth Card</p>, className: "md:col-span-2", thumbnail: "https://images.unsplash.com/photo-1475070929565-c985b2be3ef2?w=800" },
]

export default function AceternityLayoutGridWrapper({ className }: AceternityLayoutGridProps) {
  return <div className={cn("h-screen w-full", className)}><LayoutGrid cards={defaultCards} /></div>
}
