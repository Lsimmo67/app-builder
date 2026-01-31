'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

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

      {/* Radial accent glow */}
      <div
        className={cn(
          'absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]',
          accentColor === 'cyan' && 'bg-cyan-500/8',
          accentColor === 'violet' && 'bg-violet-500/8',
          accentColor === 'emerald' && 'bg-emerald-500/8'
        )}
      />

      {/* Neon line accents */}
      <div className="absolute left-0 top-1/4 h-px w-32 bg-gradient-to-r from-transparent to-cyan-500/30" />
      <div className="absolute right-0 top-1/3 h-px w-32 bg-gradient-to-l from-transparent to-cyan-500/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                accentColor === 'cyan' && 'bg-cyan-400',
                accentColor === 'violet' && 'bg-violet-400',
                accentColor === 'emerald' && 'bg-emerald-400'
              )}
            />
            <span
              className={cn(
                'relative inline-flex h-2 w-2 rounded-full',
                accentColor === 'cyan' && 'bg-cyan-500',
                accentColor === 'violet' && 'bg-violet-500',
                accentColor === 'emerald' && 'bg-emerald-500'
              )}
            />
          </span>
          <span className="text-white/60">Now in Public Beta</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {headline}
          <br />
          <span
            className={cn(
              'bg-gradient-to-r bg-clip-text text-transparent',
              textGradient
            )}
          >
            {gradientText}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 max-w-xl text-base text-neutral-400 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onCtaClick}
            className={cn(
              'rounded-xl bg-gradient-to-r px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl',
              neonGlow
            )}
          >
            {ctaText}
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/5">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {secondaryCtaText}
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8"
        >
          {['10K+', '99.9%', '4.9/5'].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-lg font-bold text-white">{stat}</div>
              <div className="text-xs text-neutral-500">
                {['Active Users', 'Uptime', 'Rating'][i]}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
