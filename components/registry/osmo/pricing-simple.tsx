'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Props {
  planName?: string
  price?: string
  period?: string
  description?: string
  features?: string[]
  buttonText?: string
  badgeText?: string
  className?: string
}

const defaultFeatures = [
  'Unlimited projects',
  '50 GB storage',
  'Advanced analytics dashboard',
  'Priority email support',
  'Custom domain support',
  'Team collaboration tools',
  'API access',
  'Automated backups',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
}

export default function PricingSimple({
  planName = 'Pro Plan',
  price = '$29',
  period = '/month',
  description = 'Everything you need to build and scale your next project. No hidden fees.',
  features = defaultFeatures,
  buttonText = 'Start Free Trial',
  badgeText = 'Most Popular',
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <motion.div
        className="mx-auto max-w-lg"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
      >
        <div className="overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-xl shadow-primary/5">
          <motion.div
            className="bg-primary/5 px-8 py-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {badgeText && (
              <motion.span
                className="mb-3 inline-block rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' as const }}
              >
                {badgeText}
              </motion.span>
            )}
            <h3 className="text-xl font-bold text-foreground">{planName}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </motion.div>
          <div className="px-8 py-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' as const }}
            >
              <span className="text-5xl font-bold tracking-tight text-foreground">
                {price}
              </span>
              {period && (
                <span className="text-lg text-muted-foreground">{period}</span>
              )}
            </motion.div>
            <motion.ul
              className="mt-8 space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3 text-sm text-foreground"
                  variants={featureVariants}
                >
                  <svg
                    className="h-5 w-5 shrink-0 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
            <motion.button
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {buttonText}
            </motion.button>
            <motion.p
              className="mt-3 text-center text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              14-day free trial. No credit card required.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
