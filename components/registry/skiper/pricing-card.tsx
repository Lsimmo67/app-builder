'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  className?: string
  plan?: string
  price?: string
  period?: string
  description?: string
  features?: PricingFeature[]
  ctaText?: string
  popular?: boolean
  onCtaClick?: () => void
}

const defaultFeatures: PricingFeature[] = [
  { text: 'Unlimited projects', included: true },
  { text: 'Advanced analytics', included: true },
  { text: 'Priority support', included: true },
  { text: 'Custom integrations', included: true },
  { text: 'Team collaboration', included: false },
  { text: 'Enterprise SSO', included: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
}

export default function PricingCard({
  className,
  plan = 'Pro',
  price = '$29',
  period = '/month',
  description = 'Perfect for growing teams that need more power and flexibility.',
  features = defaultFeatures,
  ctaText = 'Get Started',
  popular = true,
  onCtaClick,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={cn(
        'group relative w-full max-w-sm overflow-hidden rounded-2xl',
        popular && 'scale-105',
        className
      )}
    >
      {/* Animated gradient border */}
      {popular && (
        <motion.div
          className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          style={{ backgroundSize: '200% 200%' }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' as const }}
        />
      )}

      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border bg-zinc-950/80 p-8 backdrop-blur-xl',
          popular ? 'border-transparent' : 'border-white/10'
        )}
      >
        {/* Glassmorphism highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-white/[0.03]" />

        {/* Accent glow */}
        <motion.div
          className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
        />

        <motion.div
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Badge */}
          {popular && (
            <motion.div
              className="mb-4 inline-flex rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 px-3 py-1 text-xs font-semibold text-violet-300"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 15, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
              >
                Most Popular
              </motion.span>
            </motion.div>
          )}

          {/* Plan name */}
          <h3 className="text-lg font-semibold text-white">{plan}</h3>

          {/* Price */}
          <motion.div
            className="mt-4 flex items-baseline gap-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' as const }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-bold text-transparent">
              {price}
            </span>
            <span className="text-sm text-neutral-500">{period}</span>
          </motion.div>

          {/* Description */}
          <p className="mt-3 text-sm text-neutral-400">{description}</p>

          {/* Divider */}
          <motion.div
            className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' as const }}
            viewport={{ once: true }}
          />

          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                variants={featureVariants}
                className="flex items-center gap-3"
              >
                <motion.div
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                    feature.included
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'bg-neutral-800 text-neutral-600'
                  )}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, type: 'spring' as const, stiffness: 400, damping: 15 }}
                  viewport={{ once: true }}
                >
                  {feature.included ? (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </motion.div>
                <span
                  className={cn(
                    'text-sm',
                    feature.included ? 'text-neutral-300' : 'text-neutral-600'
                  )}
                >
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            onClick={onCtaClick}
            className={cn(
              'mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-shadow',
              popular
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                : 'border border-white/10 bg-white/5 text-white'
            )}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            {ctaText}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
