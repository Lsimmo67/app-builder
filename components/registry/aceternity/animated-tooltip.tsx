'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Person {
  id: number
  name: string
  role: string
  color: string
  initials: string
}

interface AnimatedTooltipProps {
  className?: string
  people?: Person[]
  avatarSize?: number
}

const defaultPeople: Person[] = [
  { id: 1, name: 'Sarah Chen', role: 'CEO & Founder', color: 'from-violet-500 to-purple-600', initials: 'SC' },
  { id: 2, name: 'Marcus Johnson', role: 'CTO', color: 'from-blue-500 to-cyan-600', initials: 'MJ' },
  { id: 3, name: 'Emily Parker', role: 'Lead Designer', color: 'from-pink-500 to-rose-600', initials: 'EP' },
  { id: 4, name: 'David Kim', role: 'Engineering Lead', color: 'from-amber-500 to-orange-600', initials: 'DK' },
  { id: 5, name: 'Lisa Wang', role: 'Product Manager', color: 'from-emerald-500 to-teal-600', initials: 'LW' },
  { id: 6, name: 'James Miller', role: 'DevOps Engineer', color: 'from-indigo-500 to-blue-600', initials: 'JM' },
]

export default function AnimatedTooltip({
  className,
  people = defaultPeople,
  avatarSize = 48,
}: AnimatedTooltipProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'flex items-center justify-center py-10',
        className
      )}
    >
      <div className="flex -space-x-3">
        {people.map((person) => (
          <div
            key={person.id}
            className="group relative"
            onMouseEnter={() => setHoveredId(person.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <AnimatePresence>
              {hoveredId === person.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                  className="absolute -top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap"
                >
                  <div className="rounded-xl border border-white/10 bg-black px-4 py-2 text-center shadow-2xl">
                    <p className="text-sm font-bold text-white">{person.name}</p>
                    <p className="text-xs text-neutral-400">{person.role}</p>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-black" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              whileHover={{ y: -4, scale: 1.1, zIndex: 30 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
              className={cn(
                'relative flex items-center justify-center rounded-full border-2 border-neutral-900 bg-gradient-to-br text-sm font-bold text-white shadow-lg',
                person.color
              )}
              style={{ width: avatarSize, height: avatarSize }}
            >
              {person.initials}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
