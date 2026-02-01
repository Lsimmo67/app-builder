'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface TimelineEvent {
  year: string
  title: string
  desc: string
}

interface TimelineSectionProps {
  className?: string
  events?: TimelineEvent[]
}

const defaultEvents: TimelineEvent[] = [
  { year: '2023', title: 'Project Started', desc: 'Initial concept and planning phase.' },
  { year: '2024', title: 'Beta Launch', desc: 'First beta release to early adopters.' },
  { year: '2025', title: 'Public Release', desc: 'Full public launch with all features.' },
  { year: '2026', title: 'Scale Up', desc: 'Expanding to new markets and verticals.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const eventVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 },
  },
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
}

export default function TimelineSection({
  className,
  events = defaultEvents,
}: TimelineSectionProps) {
  return (
    <motion.div
      className={cn('mx-auto w-full max-w-2xl py-8', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="relative">
        {/* Animated line */}
        <motion.div
          className="absolute left-4 top-0 bottom-0 w-px origin-top md:left-1/2"
          style={{
            background: 'linear-gradient(to bottom, #8b5cf6, #d946ef, #06b6d4)',
          }}
          variants={lineVariants}
        />

        {events.map((ev, i) => (
          <motion.div
            key={i}
            variants={eventVariants}
            className={cn(
              'relative mb-10 flex items-start',
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            )}
          >
            <div className="hidden w-1/2 md:block" />

            {/* Animated dot */}
            <motion.div
              className="absolute left-4 z-10 mt-1.5 -translate-x-1/2 md:left-1/2"
              variants={dotVariants}
            >
              <motion.div
                className="h-3 w-3 rounded-full border-2 border-black bg-violet-500"
                style={{ boxShadow: '0 0 12px 4px rgba(139,92,246,0.4)' }}
                animate={{
                  boxShadow: [
                    '0 0 12px 4px rgba(139,92,246,0.4)',
                    '0 0 20px 6px rgba(139,92,246,0.6)',
                    '0 0 12px 4px rgba(139,92,246,0.4)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut' as const,
                }}
              />
            </motion.div>

            {/* Content card */}
            <motion.div
              className="ml-10 md:ml-0 md:w-1/2 md:px-8"
              whileHover={{ x: i % 2 === 0 ? 4 : -4 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
            >
              <motion.span
                className="text-xs font-mono text-violet-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.3, ease: 'easeOut' as const }}
                viewport={{ once: true }}
              >
                {ev.year}
              </motion.span>
              <h3 className="mt-1 font-bold text-white">{ev.title}</h3>
              <p className="mt-1 text-sm text-white/50">{ev.desc}</p>

              {/* Decorative connector line on hover */}
              <motion.div
                className="mt-3 h-px w-12 bg-gradient-to-r from-violet-500/40 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: 'easeOut' as const }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
