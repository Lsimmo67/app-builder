'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  description?: string
  buttonText?: string
  placeholder?: string
  disclaimer?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const formVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.2 },
  },
}

export default function NewsletterSection({
  headline = 'Stay in the loop',
  description = 'Get the latest updates, articles, and resources delivered straight to your inbox every week.',
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  disclaimer = 'No spam, ever. Unsubscribe at any time.',
  className,
}: Props) {
  return (
    <section
      className={cn('bg-muted/30 px-6 py-20 md:px-12 lg:px-24', className)}
    >
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
          {description}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          variants={formVariants}
        >
          <motion.input
            type="email"
            placeholder={placeholder}
            className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:max-w-sm"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
          />
          <motion.button
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.button>
        </motion.div>
        <motion.p
          className="mt-4 text-xs text-muted-foreground"
          variants={itemVariants}
        >
          {disclaimer}
        </motion.p>
      </motion.div>
    </section>
  )
}
