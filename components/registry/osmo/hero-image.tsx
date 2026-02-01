'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Props {
  headline?: string
  subheadline?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  overlayOpacity?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
}

const slideFromBottom = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const revealOverlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' as const },
  },
}

const gridReveal = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 0.2,
    scale: 1,
    transition: { duration: 1.5, ease: 'easeOut' as const },
  },
}

export default function HeroImage({
  headline = 'Craft experiences that inspire',
  subheadline = 'Build pixel-perfect products with confidence. Our platform gives you everything you need to turn your vision into reality.',
  primaryButtonText = 'Get Started Free',
  secondaryButtonText = 'Watch Demo',
  overlayOpacity = 'bg-black/60',
  className,
}: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className={cn(
        'relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-24 md:px-12 lg:px-24',
        className,
      )}
    >
      {/* Background with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        <motion.div variants={gridReveal} className="absolute inset-0">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </motion.div>
      </div>

      {/* Overlay */}
      <motion.div
        variants={revealOverlay}
        className={cn('absolute inset-0', overlayOpacity)}
      />

      {/* Animated light streak */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute right-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
          animate={{ opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          variants={slideFromBottom}
          className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={slideFromBottom}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={slideFromBottom}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 8px 30px rgba(255,255,255,0.15)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-medium text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {primaryButtonText}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {secondaryButtonText}
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={slideFromBottom}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5"
          >
            <motion.div className="h-2 w-1 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
