'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { CSSProperties, useRef, useState } from 'react'

const defaultItems = [
  { icon: '\u{1F3E0}', label: 'Home' },
  { icon: '\u{1F4C1}', label: 'Files' },
  { icon: '\u{1F4AC}', label: 'Chat' },
  { icon: '\u2699\uFE0F', label: 'Settings' },
  { icon: '\u{1F50D}', label: 'Search' },
]

function DockItem({
  icon,
  label,
  mouseX,
  index,
}: {
  icon: string
  label: string
  mouseX: ReturnType<typeof useMotionValue<number>>
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 })

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring' as const, stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute -top-10 text-[11px] text-white/90 px-2.5 py-1 rounded-lg bg-black/90 border border-white/10 whitespace-nowrap shadow-lg"
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div
        className="flex items-center justify-center rounded-xl bg-white/10 border border-white/5 text-xl cursor-pointer backdrop-blur-sm"
        style={{ width, height: width }}
        whileTap={{ scale: 0.85 }}
      >
        {icon}
      </motion.div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -bottom-2 w-1 h-1 rounded-full bg-white/60"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function DockMenu({
  className,
  style,
  items = defaultItems,
}: {
  className?: string
  style?: CSSProperties
  items?: { icon: string; label: string }[]
}) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      className={cn(
        'inline-flex items-end gap-2 px-4 py-3 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-2xl shadow-2xl',
        className
      )}
      style={style}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
    >
      {items.map((item, i) => (
        <DockItem key={i} icon={item.icon} label={item.label} mouseX={mouseX} index={i} />
      ))}
    </motion.div>
  )
}
