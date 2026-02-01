'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  logos?: string[]
  className?: string
}

const defaultLogos = [
  'Vercel',
  'Stripe',
  'Shopify',
  'Notion',
  'Linear',
  'Figma',
  'GitHub',
  'Slack',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function LogoCloud({
  headline = 'Trusted by industry-leading companies',
  logos = defaultLogos,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-16 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          {headline}
        </motion.p>
        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />
          <motion.div
            className="flex w-max gap-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop' as const,
                duration: 25,
                ease: 'linear' as const,
              },
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex h-12 w-32 shrink-0 items-center justify-center rounded-lg bg-muted/50"
              >
                <span className="text-sm font-semibold text-muted-foreground/60">
                  {logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex h-12 items-center justify-center rounded-lg bg-muted/50"
              variants={itemVariants}
            >
              <span className="text-sm font-semibold text-muted-foreground/60">
                {logo}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
