'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Feature {
  title: string
  description: string
}

interface Props {
  headline?: string
  subheadline?: string
  features?: Feature[]
  className?: string
}

const defaultFeatures: Feature[] = [
  {
    title: 'Fast Performance',
    description:
      'Optimized rendering engine delivers sub-second load times across all devices.',
  },
  {
    title: 'Secure Storage',
    description:
      'Bank-level encryption protects your data at rest and in transit.',
  },
  {
    title: 'Smart Analytics',
    description:
      'AI-powered insights help you understand user behavior and optimize conversions.',
  },
  {
    title: '24/7 Support',
    description:
      'Expert support team available around the clock to help you succeed.',
  },
]

const iconPaths = [
  'M13 10V3L4 14h7v7l9-11h-7z',
  'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const iconAnimations = [
  // Lightning bolt - bounce
  {
    animate: { y: [0, -6, 0] },
    transition: { duration: 0.6, ease: 'easeInOut' as const },
  },
  // Lock - rotate wiggle
  {
    animate: { rotate: [0, -10, 10, -5, 0] },
    transition: { duration: 0.5, ease: 'easeInOut' as const },
  },
  // Chart - scale pulse
  {
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 0.5, ease: 'easeInOut' as const },
  },
  // Support - rotate full
  {
    animate: { rotate: [0, 360] },
    transition: { duration: 0.6, ease: 'easeInOut' as const },
  },
]

export default function FeaturesIcons({
  headline = 'Why teams choose us',
  subheadline = 'Four pillars that make our platform the best choice for growing businesses.',
  features = defaultFeatures,
  className,
}: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionVariants}
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            variants={headingVariants}
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {headline}
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            {subheadline}
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const iconAnim = iconAnimations[index % iconAnimations.length]

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group text-center"
              >
                <motion.div
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
                  whileHover={iconAnim.animate}
                  transition={iconAnim.transition}
                >
                  <svg
                    className="h-8 w-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={iconPaths[index % iconPaths.length]}
                    />
                  </svg>
                </motion.div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                {/* Hover reveal line */}
                <motion.div
                  className="mx-auto mt-4 h-0.5 w-0 bg-primary/40 rounded-full"
                  whileHover={{ width: 48 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
