'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

export interface Skiper3dFlipGalleryProps {
  items?: { title: string; subtitle: string; color: string }[]
  className?: string
}

const defaultItems = [
  { title: 'Architecture', subtitle: 'Modern design systems', color: '#6366f1' },
  { title: 'Nature', subtitle: 'Organic landscapes', color: '#22c55e' },
  { title: 'Abstract', subtitle: 'Creative expressions', color: '#ec4899' },
  { title: 'Portrait', subtitle: 'Human connections', color: '#f59e0b' },
]

export default function Skiper3dFlipGallery({
  items = defaultItems,
  className,
}: Skiper3dFlipGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const navigate = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1)
    setActiveIndex(newIndex)
  }

  const next = () => navigate((activeIndex + 1) % items.length)
  const prev = () => navigate((activeIndex - 1 + items.length) % items.length)

  const flipVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <div className={cn('flex h-[500px] w-full flex-col items-center justify-center', className)}>
      {/* Gallery viewport */}
      <div
        className="relative h-[350px] w-[400px] overflow-hidden rounded-2xl"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 p-8"
            style={{
              background: `linear-gradient(135deg, ${items[activeIndex].color}25 0%, ${items[activeIndex].color}08 100%)`,
              transformStyle: 'preserve-3d',
            }}
            custom={direction}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, type: 'spring', stiffness: 80, damping: 15 }}
          >
            <motion.div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl text-4xl"
              style={{ backgroundColor: `${items[activeIndex].color}30`, color: items[activeIndex].color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              &#9674;
            </motion.div>
            <motion.h3
              className="mb-2 text-2xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {items[activeIndex].title}
            </motion.h3>
            <motion.p
              className="text-sm text-white/50"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {items[activeIndex].subtitle}
            </motion.p>
            <motion.div
              className="mt-8 text-xs text-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {activeIndex + 1} / {items.length}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
        >
          &#8592;
        </button>
        <div className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={i}
              className="h-2 w-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === activeIndex ? item.color : 'rgba(255,255,255,0.2)',
                transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
              }}
              onClick={() => navigate(i)}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
        >
          &#8594;
        </button>
      </div>
    </div>
  )
}
