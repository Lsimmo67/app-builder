'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Props {
  headline?: string
  subheadline?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  badgeText?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function HeroGradient({
  headline = 'The future of building is here',
  subheadline = 'Leverage cutting-edge tools and frameworks to create exceptional digital experiences. Fast, reliable, and beautifully crafted.',
  primaryButtonText = 'Start Building',
  secondaryButtonText = 'See Examples',
  badgeText = 'Now available in beta',
  className,
}: Props) {
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
      {/* Static gradient base */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Animated gradient blob - primary */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
        }}
        animate={{
          x: ['-50%', '-45%', '-55%', '-50%'],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Secondary blob */}
      <motion.div
        className="pointer-events-none absolute -bottom-20 right-1/4 h-[400px] w-[500px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Tertiary accent blob */}
      <motion.div
        className="pointer-events-none absolute top-1/4 -left-20 h-[300px] w-[300px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div variants={scaleIn} className="mb-6 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
            {badgeText}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 8px 40px hsl(var(--primary) / 0.3)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {primaryButtonText}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background/80 px-8 text-sm font-medium text-foreground backdrop-blur-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {secondaryButtonText}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
