'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface ComparisonFeature {
  feature: string
  us: boolean
  them: boolean
}

interface Props {
  headline?: string
  subheadline?: string
  ourName?: string
  theirName?: string
  features?: ComparisonFeature[]
  className?: string
}

const defaultFeatures: ComparisonFeature[] = [
  { feature: 'Unlimited projects', us: true, them: false },
  { feature: 'Real-time collaboration', us: true, them: true },
  { feature: 'Advanced analytics', us: true, them: false },
  { feature: 'Priority support', us: true, them: false },
  { feature: 'Custom domains', us: true, them: true },
  { feature: 'API access', us: true, them: true },
  { feature: 'SSO integration', us: true, them: false },
  { feature: 'Automated backups', us: true, them: false },
  { feature: '99.99% uptime SLA', us: true, them: false },
  { feature: 'No vendor lock-in', us: true, them: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

function CheckIcon({ positive }: { positive: boolean }) {
  if (positive) {
    return (
      <motion.svg
        className="h-5 w-5 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </motion.svg>
    )
  }
  return (
    <svg
      className="h-5 w-5 text-muted-foreground/40"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default function ComparisonTable({
  headline = 'See how we compare',
  subheadline = 'We built a better solution. Here is how we stack up against the competition.',
  ourName = 'Us',
  theirName = 'Them',
  features = defaultFeatures,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            variants={itemVariants}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            variants={itemVariants}
          >
            {subheadline}
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-16 overflow-hidden rounded-xl border border-border"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <div className="grid grid-cols-[1fr_100px_100px] bg-muted/50 px-6 py-4 md:grid-cols-[1fr_120px_120px]">
            <div className="text-sm font-semibold text-foreground">Feature</div>
            <div className="text-center text-sm font-semibold text-primary">{ourName}</div>
            <div className="text-center text-sm font-semibold text-muted-foreground">{theirName}</div>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  'grid grid-cols-[1fr_100px_100px] px-6 py-3.5 md:grid-cols-[1fr_120px_120px]',
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/20',
                )}
                variants={rowVariants}
              >
                <div className="text-sm text-foreground">{item.feature}</div>
                <div className="flex justify-center">
                  <CheckIcon positive={item.us} />
                </div>
                <div className="flex justify-center">
                  {item.them ? (
                    <svg
                      className="h-5 w-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-muted-foreground/40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
