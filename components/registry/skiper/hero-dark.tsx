'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface HeroDarkProps {
  className?: string
  headline?: string
  gradientText?: string
  description?: string
  ctaText?: string
  secondaryCtaText?: string
  accentColor?: string
  onCtaClick?: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

export default function HeroDark({
  className,
  headline = 'Build the Future of',
  gradientText = 'Digital Experience',
  description = 'A cutting-edge platform that combines stunning visuals with powerful functionality. Ship faster, scale bigger, and delight your users.',
  ctaText = 'Start Free Trial',
  secondaryCtaText = 'View Demo',
  accentColor = 'cyan',
  onCtaClick,
}: HeroDarkProps) {
  const neonGlow =
    accentColor === 'cyan'
      ? 'shadow-cyan-500/20 hover:shadow-cyan-500/30 from-cyan-500 to-blue-600'
      : accentColor === 'violet'
        ? 'shadow-violet-500/20 hover:shadow-violet-500/30 from-violet-500 to-purple-600'
        : 'shadow-emerald-500/20 hover:shadow-emerald-500/30 from-emerald-500 to-teal-600'

  const textGradient =
    accentColor === 'cyan'
      ? 'from-cyan-400 to-blue-500'
      : accentColor === 'violet'
        ? 'from-violet-400 to-purple-500'
        : 'from-emerald-400 to-teal-500'

  const dotColor =
    accentColor === 'cyan' ? 'bg-cyan-400' : accentColor === 'violet' ? 'bg-violet-400' : 'bg-emerald-400'

  const dots = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 3,
      })),
    []
  )

  return (
    <section
      className={cn(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 py-24',
        className
      )}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particle dots */}
      <div className="pointer-events-none absolute inset-0">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className={cn('absolute rounded-full opacity-40', dotColor)}
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
            }}
            animate={{
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 5, 0],
              opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
              ease: 'easeInOut' as const,
            }}
          />
        ))}
      </div>

      {/* Radial accent glow */}
      <motion.div
        className={cn(
          'absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]',
          accentColor === 'cyan' && 'bg-cyan-500/8',
          accentColor === 'violet' && 'bg-violet-500/8',
          accentColor === 'emerald' && 'bg-emerald-500/8'
        )}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      {/* Neon line accents */}
      <motion.div
        className="absolute left-0 top-1/4 h-px w-32 bg-gradient-to-r from-transparent to-cyan-500/30"
        animate={{ scaleX: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' as const }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-px w-32 bg-gradient-to-l from-transparent to-cyan-500/30"
        animate={{ scaleX: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' as const }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <motion.span
              className={cn('absolute inline-flex h-full w-full rounded-full opacity-75', dotColor)}
              animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
            />
            <span
              className={cn(
                'relative inline-flex h-2 w-2 rounded-full',
                accentColor === 'cyan' ? 'bg-cyan-500' : accentColor === 'violet' ? 'bg-violet-500' : 'bg-emerald-500'
              )}
            />
          </span>
          <span className="text-white/60">Now in Public Beta</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {headline}
          <br />
          <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', textGradient)}>
            {gradientText}
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-xl text-base text-neutral-400 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={onCtaClick}
            className={cn(
              'rounded-xl bg-gradient-to-r px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-shadow',
              neonGlow
            )}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            {ctaText}
          </motion.button>
          <motion.button
            className="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 text-sm font-semibold text-white"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {secondaryCtaText}
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center justify-center gap-8"
        >
          {['10K+', '99.9%', '4.9/5'].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
            >
              <div className="text-lg font-bold text-white">{stat}</div>
              <div className="text-xs text-neutral-500">
                {['Active Users', 'Uptime', 'Rating'][i]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
