'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Props {
  headline?: string
  subheadline?: string
  buttonText?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
}

const springUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
}

const subtleUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 20,
    },
  },
}

export default function HeroMinimal({
  headline = 'Less noise. More signal.',
  subheadline = 'A focused workspace that strips away distractions and lets you do your best work.',
  buttonText = 'Get Started',
  className,
}: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-32',
        className,
      )}
    >
      {/* Subtle animated gradient orb */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear' as const,
        }}
      />

      {/* Secondary orb */}
      <motion.div
        className="pointer-events-none absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full opacity-[0.04]"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          variants={springUp}
          className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={subtleUp}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          {subheadline}
        </motion.p>

        <motion.div variants={subtleUp} className="mt-12">
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 0 4px hsl(var(--primary) / 0.15)',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-10 text-sm font-medium text-primary-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {buttonText}
          </motion.button>
        </motion.div>

        <motion.div
          variants={subtleUp}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          {['No credit card', 'Free forever', 'Cancel anytime'].map((text) => (
            <span key={text} className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-primary/70"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
