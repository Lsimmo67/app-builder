'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

export interface Skiper3dCarouselProps {
  items?: { title: string; description: string; color: string }[]
  autoPlay?: boolean
  interval?: number
  className?: string
}

const defaultItems = [
  { title: 'Design', description: 'Beautiful interfaces', color: '#6366f1' },
  { title: 'Develop', description: 'Clean architecture', color: '#ec4899' },
  { title: 'Deploy', description: 'Ship with confidence', color: '#14b8a6' },
  { title: 'Iterate', description: 'Continuous improvement', color: '#f59e0b' },
  { title: 'Scale', description: 'Grow seamlessly', color: '#8b5cf6' },
]

export default function Skiper3dCarousel({
  items = defaultItems,
  autoPlay = true,
  interval = 3000,
  className,
}: Skiper3dCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = items.length

  React.useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count)
    }, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, count])

  const getCardStyle = (index: number) => {
    const diff = ((index - activeIndex) % count + count) % count
    const normalized = diff > count / 2 ? diff - count : diff

    const rotateY = normalized * 45
    const translateZ = Math.abs(normalized) === 0 ? 200 : 200 - Math.abs(normalized) * 80
    const translateX = normalized * 180
    const opacity = Math.abs(normalized) > 2 ? 0 : 1 - Math.abs(normalized) * 0.3
    const scale = 1 - Math.abs(normalized) * 0.15
    const zIndex = count - Math.abs(normalized)

    return {
      rotateY,
      translateZ,
      translateX,
      opacity,
      scale,
      zIndex,
    }
  }

  return (
    <div className={cn('flex h-[500px] w-full flex-col items-center justify-center overflow-hidden', className)} style={{ perspective: '1000px' }}>
      <div className="relative h-[320px] w-full" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence>
          {items.map((item, index) => {
            const style = getCardStyle(index)
            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 h-[280px] w-[220px] cursor-pointer rounded-2xl border border-white/10 p-6 shadow-2xl"
                style={{
                  marginLeft: -110,
                  marginTop: -140,
                  transformStyle: 'preserve-3d',
                  background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}05 100%)`,
                  zIndex: style.zIndex,
                }}
                animate={{
                  rotateY: style.rotateY,
                  z: style.translateZ,
                  x: style.translateX,
                  opacity: style.opacity,
                  scale: style.scale,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                  style={{ backgroundColor: `${item.color}30`, color: item.color }}
                >
                  &#9670;
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.description}</p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-6 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 24 : 8,
              backgroundColor: i === activeIndex ? items[activeIndex].color : 'rgba(255,255,255,0.2)',
            }}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
