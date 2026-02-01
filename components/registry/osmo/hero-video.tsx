'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Props {
  headline?: string
  subheadline?: string
  buttonText?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const scaleReveal = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const pulseRing = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.8, 2.5],
    opacity: [0.4, 0.15, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeOut' as const },
  },
}

export default function HeroVideo({
  headline = 'See the future in motion',
  subheadline = 'Watch how we are transforming the way teams build and ship digital products at scale.',
  buttonText = 'Watch Demo',
  className,
}: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className={cn(
        'relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className,
      )}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-950/60 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Animated scan lines effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
        animate={{ backgroundPositionY: ['0px', '4px'] }}
        transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' as const }}
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.5)_100%)]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          {subheadline}
        </motion.p>

        <motion.div variants={scaleReveal} className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            className="group relative inline-flex items-center gap-3 rounded-full bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {/* Pulse rings behind play button */}
            <span className="relative flex h-10 w-10 items-center justify-center">
              <motion.span
                className="absolute inset-0 rounded-full bg-primary/40"
                initial={pulseRing.initial}
                animate={pulseRing.animate}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-primary/30"
                initial={pulseRing.initial}
                animate={{
                  ...pulseRing.animate,
                  transition: {
                    ...pulseRing.animate.transition,
                    delay: 0.6,
                  },
                }}
              />
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                <svg
                  className="ml-0.5 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
            {buttonText}
          </motion.button>
        </motion.div>

        {/* Duration indicator */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center justify-center gap-4 text-sm text-zinc-500"
        >
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            2 min watch
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span>No sign-up required</span>
        </motion.div>
      </div>
    </motion.section>
  )
}
