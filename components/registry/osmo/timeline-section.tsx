'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface Props {
  headline?: string
  subheadline?: string
  items?: TimelineItem[]
  className?: string
}

const defaultItems: TimelineItem[] = [
  {
    year: '2020',
    title: 'The Beginning',
    description:
      'Founded with a mission to simplify software development. Our small team of three started building the core platform from a garage.',
  },
  {
    year: '2021',
    title: 'First 1,000 Users',
    description:
      'Reached our first thousand users and secured seed funding. Launched the plugin ecosystem and opened our first office.',
  },
  {
    year: '2022',
    title: 'Series A & Growth',
    description:
      'Raised $15M in Series A funding. Grew the team to 40 people and expanded to serve enterprise customers across 20 countries.',
  },
  {
    year: '2023',
    title: 'Platform 2.0',
    description:
      'Launched a completely rebuilt platform with AI-powered features, real-time collaboration, and a new design system.',
  },
  {
    year: '2024',
    title: '10K Customers Milestone',
    description:
      'Surpassed 10,000 paying customers. Opened offices in London and Tokyo. Named a leader in the Gartner Magic Quadrant.',
  },
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

const timelineItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 15 },
  },
}

export default function TimelineSection({
  headline = 'Our journey',
  subheadline = 'From humble beginnings to serving thousands of teams worldwide.',
  items = defaultItems,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-4xl">
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
        <div className="relative mt-16">
          <motion.div
            className="absolute left-8 top-0 hidden h-full w-px bg-border md:left-1/2 md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: 'easeOut' as const }}
            style={{ transformOrigin: 'top' }}
          />
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {items.map((item, index) => {
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  className={cn(
                    'relative flex flex-col md:flex-row md:items-center',
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse',
                  )}
                  variants={timelineItemVariants}
                >
                  <div className={cn('flex-1', isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12')}>
                    <motion.div
                      className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent/50"
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                      <span className="text-xs font-semibold text-primary">
                        {item.year}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute left-8 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:static md:left-auto md:top-auto md:block md:translate-x-0 md:shrink-0"
                    variants={dotVariants}
                  />
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
