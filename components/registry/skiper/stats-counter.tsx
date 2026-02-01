'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface StatItem {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

interface StatsCounterProps {
  className?: string
  stats?: StatItem[]
  duration?: number
  title?: string
}

const defaultStats: StatItem[] = [
  { value: 10000, suffix: '+', label: 'Active Users' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA' },
  { value: 50, suffix: 'M+', label: 'API Requests / Day' },
  { value: 4.9, prefix: '', suffix: '/5', label: 'Customer Rating' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

function AnimatedNumber({
  value,
  duration,
  isInView,
}: {
  value: number
  duration: number
  isInView: boolean
}) {
  const motionValue = useMotionValue(0)
  const isDecimal = value % 1 !== 0
  const decimals = isDecimal ? (value.toString().split('.')[1]?.length || 1) : 0
  const rounded = useTransform(motionValue, (latest) =>
    Number(latest.toFixed(decimals))
  )

  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut' as const,
    })

    const unsubscribe = rounded.on('change', (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = String(v)
      }
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [isInView, value, duration, motionValue, rounded])

  return <span ref={displayRef}>0</span>
}

function StatCard({
  stat,
  duration,
  isInView,
}: {
  stat: StatItem
  duration: number
  isInView: boolean
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.1)' }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950 p-8 text-center"
    >
      {/* Hover gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10">
        <p className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-bold tabular-nums text-transparent md:text-5xl">
          {stat.prefix}
          <AnimatedNumber value={stat.value} duration={duration} isInView={isInView} />
          {stat.suffix}
        </p>
        <motion.p
          className="mt-2 text-sm text-neutral-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' as const }}
        >
          {stat.label}
        </motion.p>
      </div>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  )
}

export default function StatsCounter({
  className,
  stats = defaultStats,
  duration = 2,
  title = 'Trusted by thousands of teams worldwide',
}: StatsCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <div
      ref={containerRef}
      className={cn('w-full bg-black px-4 py-20', className)}
    >
      <div className="mx-auto max-w-5xl">
        {title && (
          <motion.h2
            className="mb-12 text-center text-2xl font-bold text-white md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          >
            {title}
          </motion.h2>
        )}

        <motion.div
          className={cn(
            'grid grid-cols-2 gap-4 md:grid-cols-4',
            stats.length === 3 && 'md:grid-cols-3'
          )}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              duration={duration}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
