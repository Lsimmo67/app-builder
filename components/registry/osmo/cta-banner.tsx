'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  description?: string
  buttonText?: string
  secondaryButtonText?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const buttonGroupVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.2 },
  },
}

export default function CtaBanner({
  headline = 'Ready to accelerate your workflow?',
  description = 'Join thousands of teams already shipping faster. Start your free trial today.',
  buttonText = 'Get Started Free',
  secondaryButtonText = 'Talk to Sales',
  className,
}: Props) {
  return (
    <section className={cn('px-6 py-20 md:px-12 lg:px-24', className)}>
      <motion.div
        className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-8 py-12 md:px-16"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
      >
        <motion.div
          className="flex flex-col items-center justify-between gap-8 md:flex-row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div className="max-w-xl" variants={textVariants}>
            <h2 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
              {headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-primary-foreground/80">
              {description}
            </p>
          </motion.div>
          <motion.div
            className="flex shrink-0 flex-col gap-3 sm:flex-row"
            variants={buttonGroupVariants}
          >
            <motion.button
              className="inline-flex h-11 items-center justify-center rounded-lg bg-background px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {buttonText}
            </motion.button>
            {secondaryButtonText && (
              <motion.button
                className="inline-flex h-11 items-center justify-center rounded-lg border border-primary-foreground/25 bg-transparent px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {secondaryButtonText}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
