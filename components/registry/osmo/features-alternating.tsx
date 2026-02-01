'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Feature {
  title: string
  description: string
  bullets?: string[]
}

interface Props {
  headline?: string
  subheadline?: string
  features?: Feature[]
  className?: string
}

const defaultFeatures: Feature[] = [
  {
    title: 'Intuitive drag-and-drop editor',
    description:
      'Build pages visually with our powerful editor. No coding required — just drag, drop, and customize to create pixel-perfect layouts in minutes.',
    bullets: [
      'Visual editing canvas',
      'Pre-built component library',
      'Real-time preview',
    ],
  },
  {
    title: 'Collaborate in real time',
    description:
      'Work together with your team seamlessly. See changes as they happen, leave comments, and manage versions all in one place.',
    bullets: [
      'Multiplayer editing',
      'Inline comments and feedback',
      'Version history and rollbacks',
    ],
  },
  {
    title: 'Deploy with confidence',
    description:
      'Ship to production with one click. Our platform handles hosting, SSL, CDN, and scaling so you can focus on building great products.',
    bullets: [
      'One-click deployments',
      'Automatic SSL certificates',
      'Global CDN distribution',
    ],
  },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const bulletVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function FeaturesAlternating({
  headline = 'Built for modern teams',
  subheadline = 'Every feature is designed to help you move faster and build better.',
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

        <div className="mt-20 space-y-24">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                  },
                }}
                className={cn(
                  'grid items-center gap-12 lg:grid-cols-2 lg:gap-20',
                  !isEven && 'lg:[&>*:first-child]:order-2',
                )}
              >
                <motion.div variants={isEven ? slideFromLeft : slideFromRight}>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.bullets && (
                    <motion.ul
                      className="mt-6 space-y-3"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.08, delayChildren: 0.3 },
                        },
                      }}
                    >
                      {feature.bullets.map((bullet, bulletIndex) => (
                        <motion.li
                          key={bulletIndex}
                          variants={bulletVariants}
                          className="flex items-center gap-3 text-sm text-foreground"
                        >
                          <svg
                            className="h-5 w-5 shrink-0 text-primary"
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
                          {bullet}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>

                <motion.div
                  variants={isEven ? slideFromRight : slideFromLeft}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
                  className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-muted to-muted/50 border border-border"
                >
                  <div className="flex h-full w-full flex-col">
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
                    </div>
                    <div className="flex flex-1 items-center justify-center p-6">
                      <div className="space-y-3 w-full max-w-xs">
                        <div className="h-3 w-2/3 rounded bg-muted-foreground/10" />
                        <div className="h-3 w-full rounded bg-muted-foreground/8" />
                        <div className="h-3 w-4/5 rounded bg-muted-foreground/8" />
                        <div className="mt-4 h-8 w-28 rounded-md bg-primary/15" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
