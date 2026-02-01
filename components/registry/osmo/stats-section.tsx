'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Stat {
  value: string
  label: string
}

interface Props {
  headline?: string
  subheadline?: string
  stats?: Stat[]
  className?: string
}

const defaultStats: Stat[] = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
  { value: '2M+', label: 'Projects Shipped' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!isInView) return
    const numMatch = value.match(/^([\d,.]+)/)
    if (!numMatch) {
      setDisplay(value)
      return
    }
    const target = parseFloat(numMatch[1].replace(/,/g, ''))
    const suffix = value.slice(numMatch[1].length)
    const duration = 1200
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(target * eased)
      const formatted = target >= 1000 ? current.toLocaleString() : String(current)
      setDisplay(formatted + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <p ref={ref} className="text-4xl font-bold tracking-tight text-foreground">
      {display}
    </p>
  )
}

export default function StatsSection({
  headline = 'Trusted by developers everywhere',
  subheadline = 'Our numbers speak for themselves. Join a growing community of builders.',
  stats = defaultStats,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            variants={itemVariants}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            variants={itemVariants}
          >
            {subheadline}
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-border bg-card p-8 text-center"
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <AnimatedValue value={stat.value} />
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
