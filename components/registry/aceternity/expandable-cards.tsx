"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityExpandableCardsProps {
  cards?: {
    title: string
    description: string
    src: string
    content: string
    ctaText?: string
    ctaLink?: string
  }[]
  className?: string
}

function CloseIcon() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

export default function AceternityExpandableCards({
  cards = [
    {
      title: "Lana Del Rey",
      description: "Summertime Sadness",
      src: "https://placehold.co/600x400/1a1a2e/ffffff?text=Lana+Del+Rey",
      content:
        "Lana Del Rey, born Elizabeth Woolridge Grant, is an American singer-songwriter known for her cinematic music style featuring themes of sadness, glamour, and melancholia.",
      ctaText: "Listen Now",
      ctaLink: "#",
    },
    {
      title: "Babbu Maan",
      description: "Mitran Di Chatri",
      src: "https://placehold.co/600x400/16213e/ffffff?text=Babbu+Maan",
      content:
        "Babbu Maan is a renowned Punjabi singer and actor known for his unique blend of folk, rock, and pop music styles in the Punjabi music industry.",
      ctaText: "Listen Now",
      ctaLink: "#",
    },
    {
      title: "Metallica",
      description: "For Whom The Bell Tolls",
      src: "https://placehold.co/600x400/0f3460/ffffff?text=Metallica",
      content:
        "Metallica is an American heavy metal band formed in 1981. They are known as one of the 'Big Four' of thrash metal and have sold over 125 million albums worldwide.",
      ctaText: "Listen Now",
      ctaLink: "#",
    },
    {
      title: "Led Zeppelin",
      description: "Stairway to Heaven",
      src: "https://placehold.co/600x400/533483/ffffff?text=Led+Zeppelin",
      content:
        "Led Zeppelin was a British rock band formed in London in 1968. They are widely considered one of the most influential bands of all time.",
      ctaText: "Listen Now",
      ctaLink: "#",
    },
  ],
  className,
}: AceternityExpandableCardsProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCard(null)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (activeCard !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [activeCard])

  return (
    <>
      <AnimatePresence>
        {activeCard !== null && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCard(null)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              layoutId={`card-${activeCard}`}
              className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div layoutId={`image-${activeCard}`}>
                <img
                  src={cards[activeCard].src}
                  alt={cards[activeCard].title}
                  className="w-full h-60 object-cover"
                />
              </motion.div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`title-${activeCard}`}
                      className="text-xl font-bold text-neutral-800 dark:text-neutral-200"
                    >
                      {cards[activeCard].title}
                    </motion.h3>
                    <motion.p
                      layoutId={`desc-${activeCard}`}
                      className="text-sm text-neutral-600 dark:text-neutral-400 mt-1"
                    >
                      {cards[activeCard].description}
                    </motion.p>
                  </div>
                  <div className="flex gap-2">
                    {cards[activeCard].ctaText && (
                      <a
                        href={cards[activeCard].ctaLink || "#"}
                        className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >
                        {cards[activeCard].ctaText}
                      </a>
                    )}
                    <button
                      onClick={() => setActiveCard(null)}
                      className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed"
                >
                  {cards[activeCard].content}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ul
        className={cn(
          "max-w-2xl mx-auto w-full flex flex-col gap-4",
          className
        )}
      >
        {cards.map((card, i) => (
          <motion.li
            key={i}
            layoutId={`card-${i}`}
            onClick={() => setActiveCard(i)}
            className="p-4 flex flex-row items-center gap-4 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer border border-neutral-200 dark:border-neutral-800 transition-colors"
          >
            <motion.div layoutId={`image-${i}`} className="flex-shrink-0">
              <img
                src={card.src}
                alt={card.title}
                className="h-14 w-14 rounded-lg object-cover"
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h3
                layoutId={`title-${i}`}
                className="font-medium text-neutral-800 dark:text-neutral-200 text-sm"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`desc-${i}`}
                className="text-neutral-600 dark:text-neutral-400 text-xs mt-0.5"
              >
                {card.description}
              </motion.p>
            </div>
            {card.ctaText && (
              <span className="px-3 py-1.5 text-xs rounded-full font-bold bg-gray-100 dark:bg-neutral-800 text-black dark:text-white hover:bg-green-500 hover:text-white transition-colors flex-shrink-0">
                {card.ctaText}
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </>
  )
}
