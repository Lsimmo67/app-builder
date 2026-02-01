'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface CtaGlowProps {
  className?: string
  headline?: string
  description?: string
  ctaText?: string
  secondaryCtaText?: string
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
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export default function CtaGlow({
  className,
  headline = 'Ready to get started?',
  description = 'Join thousands of teams already building faster. Start your free trial today with no credit card required.',
  ctaText = 'Start Free Trial',
  secondaryCtaText = 'Talk to Sales',
  onCtaClick,
}: CtaGlowProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-black px-6 py-24',
        className
      )}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-[400px] w-[600px] rounded-full bg-violet-600/15 blur-[120px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-white md:text-5xl"
        >
          {headline}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-base text-neutral-400 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Glowing CTA button */}
          <motion.button
            onClick={onCtaClick}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            {/* Glow effect behind button */}
            <motion.div
              className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 blur-lg"
              animate={{ opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
            />
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' as const }}
            />
            <span className="relative z-10">{ctaText}</span>
          </motion.button>

          <motion.button
            className="rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white backdrop-blur"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.06)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            {secondaryCtaText}
          </motion.button>
        </motion.div>

        {/* Trust note */}
        <motion.p
          variants={itemVariants}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-600"
        >
          <motion.svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </motion.svg>
          No credit card required. Cancel anytime.
        </motion.p>
      </motion.div>
    </section>
  )
}
