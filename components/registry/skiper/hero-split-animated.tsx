'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface HeroSplitAnimatedProps {
  className?: string
  headline?: string
  gradientText?: string
  description?: string
  ctaText?: string
  secondaryCtaText?: string
  onCtaClick?: () => void
}

const leftVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const slideLeft = {
  hidden: { opacity: 0, x: -50, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

const slideRight = {
  hidden: { opacity: 0, x: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' as const },
  },
}

const cardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function HeroSplitAnimated({
  className,
  headline = 'Ship products that',
  gradientText = 'users love',
  description = 'An all-in-one platform for design, development, and deployment. Build beautiful interfaces in minutes, not months.',
  ctaText = 'Get Started Free',
  secondaryCtaText = 'Book a Demo',
  onCtaClick,
}: HeroSplitAnimatedProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-screen w-full items-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left column - Text */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={slideLeft}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm backdrop-blur"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
            />
            <span className="text-white/60">Version 3.0 is here</span>
          </motion.div>

          <motion.h1
            variants={slideLeft}
            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {headline}
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {gradientText}
            </span>
          </motion.h1>

          <motion.p
            variants={slideLeft}
            className="mt-6 max-w-md text-base text-neutral-400 md:text-lg"
          >
            {description}
          </motion.p>

          <motion.div variants={slideLeft} className="mt-8 flex flex-wrap gap-4">
            <motion.button
              onClick={onCtaClick}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139,92,246,0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            >
              {ctaText}
            </motion.button>
            <motion.button
              className="rounded-xl border border-white/10 px-8 py-3.5 text-sm font-semibold text-white"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            >
              {secondaryCtaText}
            </motion.button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={slideLeft}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {['from-violet-500 to-purple-600', 'from-blue-500 to-cyan-600', 'from-pink-500 to-rose-600', 'from-amber-500 to-orange-600'].map((grad, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-gradient-to-br text-[10px] font-bold text-white',
                    grad
                  )}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.08, type: 'spring' as const, stiffness: 300, damping: 15 }}
                >
                  {['SC', 'MJ', 'EP', 'DK'][i]}
                </motion.div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="h-3.5 w-3.5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.0 + i * 0.06, type: 'spring' as const, stiffness: 400, damping: 12 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <p className="text-xs text-neutral-500">Trusted by 10,000+ developers</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right column - Visual */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/50 p-1"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-zinc-900/80 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="ml-3 flex-1 rounded-md bg-zinc-800/50 px-3 py-1 text-xs text-neutral-500">
                app.example.com
              </div>
            </div>

            {/* Mock dashboard content */}
            <motion.div
              className="space-y-4 bg-zinc-950/50 p-6"
              variants={cardStagger}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-violet-500/20" />
                <div className="h-2.5 w-32 rounded-full bg-white/10" />
                <div className="ml-auto h-2.5 w-16 rounded-full bg-violet-500/20" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { color: 'from-violet-500/20 to-purple-500/20', label: '24.5K', sub: 'Total Users' },
                  { color: 'from-blue-500/20 to-cyan-500/20', label: '89%', sub: 'Conversion' },
                  { color: 'from-emerald-500/20 to-teal-500/20', label: '$12.4K', sub: 'Revenue' },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    variants={cardItem}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className={cn('rounded-lg bg-gradient-to-br p-4', card.color)}
                  >
                    <p className="text-lg font-bold text-white">{card.label}</p>
                    <p className="text-xs text-white/40">{card.sub}</p>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-2">
                {[80, 60, 45, 70].map((w, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.5, ease: 'easeOut' as const }}
                    style={{ transformOrigin: 'left' }}
                  >
                    <div className="h-2 w-2 rounded-full bg-white/10" />
                    <div className="h-2 rounded-full bg-white/[0.06]" style={{ width: `${w}%` }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Floating accent elements */}
          <motion.div
            className="absolute -right-4 -top-4 h-24 w-24 rounded-xl border border-white/[0.08] bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm"
            animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 h-16 w-16 rounded-xl border border-white/[0.08] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm"
            animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
          />
        </motion.div>
      </div>
    </section>
  )
}
