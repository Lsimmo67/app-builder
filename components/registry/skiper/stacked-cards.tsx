'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSProperties, useState } from 'react'

const defaultCards = [
  { title: 'First Card', color: 'from-violet-600 to-purple-800' },
  { title: 'Second Card', color: 'from-fuchsia-600 to-pink-800' },
  { title: 'Third Card', color: 'from-cyan-600 to-blue-800' },
]

export default function StackedCards({
  className,
  style,
  cards = defaultCards,
}: {
  className?: string
  style?: CSSProperties
  cards?: { title: string; color: string }[]
}) {
  const [active, setActive] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    setActive((prev) => (prev + 1) % cards.length)
  }

  return (
    <motion.div
      className={cn('relative w-80 h-52', className)}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
    >
      {cards.map((card, i) => {
        const offset = (i - active + cards.length) % cards.length
        const fanOffset = isHovered ? offset * 18 : offset * 12
        const fanRotation = isHovered ? (offset - 1) * 4 : 0
        return (
          <motion.div
            key={i}
            className={cn(
              'absolute inset-0 rounded-2xl border border-white/10 p-6 cursor-pointer bg-gradient-to-br overflow-hidden',
              card.color
            )}
            animate={{
              y: -fanOffset,
              x: isHovered ? (offset - 1) * 15 : 0,
              scale: 1 - offset * 0.05,
              rotate: fanRotation,
              zIndex: cards.length - offset,
              opacity: offset > 2 ? 0 : 1,
            }}
            transition={{
              type: 'spring' as const,
              stiffness: 300,
              damping: 25,
            }}
            onClick={handleClick}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">
              <h3 className="text-white font-bold text-lg">{card.title}</h3>
              <p className="text-white/60 text-sm mt-2">Click to cycle through cards</p>
            </div>
            {offset === 0 && (
              <motion.div
                className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' as const }}
              >
                <span className="text-white/40 text-xs">*</span>
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
