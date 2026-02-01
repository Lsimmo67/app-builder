'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface HeroGradientProps {
  className?: string
  headline?: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

const blobVariants = (i: number) => ({
  animate: {
    x: [0, 30 * (i % 2 === 0 ? 1 : -1), -20 * (i % 2 === 0 ? -1 : 1), 0],
    y: [0, -50 + i * 10, 20 - i * 5, 0],
    scale: [1, 1.1, 0.9, 1],
    transition: {
      duration: 7 + i * 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
})

export default function HeroGradient({
  className,
  headline = 'Build Beautiful Interfaces at Lightning Speed',
  subtitle = 'A modern design system that empowers you to create stunning, responsive web experiences with minimal effort.',
  ctaText = 'Start Building',
  onCtaClick,
}: HeroGradientProps) {
  const blobs = [
    { color: 'bg-violet-600', pos: 'left-1/4 top-1/4' },
    { color: 'bg-indigo-600', pos: 'right-1/4 top-1/3' },
    { color: 'bg-fuchsia-600', pos: 'bottom-1/4 left-1/3' },
  ]

  return (
    <section
      className={cn(
        'relative flex min-h-[600px] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Animated mesh gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className={cn(
              'absolute h-96 w-96 rounded-full opacity-30 mix-blend-multiply blur-3xl',
              blob.color,
              blob.pos
            )}
            animate={blobVariants(i).animate}
            transition={blobVariants(i).animate.transition}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60 backdrop-blur-sm"
        >
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
          >
            Introducing v2.0
          </motion.span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-xl text-lg text-zinc-400"
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={onCtaClick}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/25"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139,92,246,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            {/* Shine sweep on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' as const }}
            />
            <span className="relative z-10">{ctaText}</span>
          </motion.button>

          <motion.button
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
