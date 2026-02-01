'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Props {
  headline?: string
  subheadline?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  badge?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function HeroCentered({
  headline = 'Build something extraordinary today',
  subheadline = 'Create stunning websites with modern tools and frameworks. Ship faster, iterate often, and delight your users with beautiful experiences.',
  primaryButtonText = 'Get Started',
  secondaryButtonText = 'Learn More',
  badge = 'Now in public beta',
  className,
}: Props) {
  const words = headline.split(' ')

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className={cn(
        'relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-6 py-24 md:px-12 lg:px-24',
        className,
      )}
    >
      <div className="mx-auto max-w-4xl text-center" style={{ perspective: '800px' }}>
        {badge && (
          <motion.div variants={badgeVariants} className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {badge}
            </span>
          </motion.div>
        )}

        <h1 className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block"
              style={{ transformOrigin: 'bottom center' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={fadeUpVariants}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {primaryButtonText}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {secondaryButtonText}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
