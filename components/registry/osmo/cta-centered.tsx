'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  description?: string
  buttonText?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function CtaCentered({
  headline = 'Ready to get started?',
  description = 'Join thousands of teams who are already building better products faster. Start your free trial today — no credit card required.',
  buttonText = 'Start Free Trial',
  className,
}: Props) {
  return (
    <section className={cn('px-6 py-20 md:px-12 lg:px-24', className)}>
      <motion.div
        className="mx-auto max-w-4xl rounded-2xl bg-primary px-8 py-16 text-center md:px-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h2
          className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl"
          variants={itemVariants}
        >
          {headline}
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80"
          variants={itemVariants}
        >
          {description}
        </motion.p>
        <motion.div className="mt-8" variants={buttonVariants}>
          <motion.button
            className="inline-flex h-12 items-center justify-center rounded-lg bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
