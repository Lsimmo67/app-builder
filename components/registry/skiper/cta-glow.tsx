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
        <div className="h-[400px] w-[600px] rounded-full bg-violet-600/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white md:text-5xl"
        >
          {headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-6 text-base text-neutral-400 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Glowing CTA button */}
          <button
            onClick={onCtaClick}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white transition-all"
          >
            {/* Glow effect behind button */}
            <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-50 blur-lg transition-all group-hover:opacity-75 group-hover:blur-xl" />
            {/* Shine sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">{ctaText}</span>
          </button>

          <button className="rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/[0.06]">
            {secondaryCtaText}
          </button>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  )
}
