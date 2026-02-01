'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Props {
  quote?: string
  authorName?: string
  authorTitle?: string
  authorInitials?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

const quoteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

const authorVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function TestimonialsQuote({
  quote = 'This is hands down the most transformative tool we have ever adopted. Our engineering velocity doubled within the first quarter, and our team morale has never been higher.',
  authorName = 'Alexandra Rivera',
  authorTitle = 'Chief Technology Officer at Lumina',
  authorInitials = 'AR',
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-24 md:px-12 lg:px-24', className)}
    >
      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.svg
          className="mx-auto h-10 w-10 text-primary/30"
          fill="currentColor"
          viewBox="0 0 24 24"
          variants={iconVariants}
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
        </motion.svg>
        <motion.blockquote className="mt-8" variants={quoteVariants}>
          <p className="text-2xl font-medium italic leading-relaxed text-foreground md:text-3xl lg:text-4xl">
            &ldquo;{quote}&rdquo;
          </p>
        </motion.blockquote>
        <motion.div
          className="mt-10 flex flex-col items-center gap-3"
          variants={authorVariants}
        >
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          >
            {authorInitials}
          </motion.div>
          <div>
            <p className="text-base font-semibold text-foreground">
              {authorName}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{authorTitle}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
