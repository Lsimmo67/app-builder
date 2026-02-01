'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Feature {
  icon?: React.ReactNode
  title: string
  description: string
}

interface Props {
  headline?: string
  subheadline?: string
  features?: Feature[]
  columns?: 2 | 3 | 4
  className?: string
}

const defaultFeatures: Feature[] = [
  {
    title: 'Lightning Fast',
    description:
      'Optimized for speed with instant page loads and seamless transitions that keep users engaged.',
  },
  {
    title: 'Fully Responsive',
    description:
      'Looks beautiful on every device, from mobile phones to ultra-wide desktop monitors.',
  },
  {
    title: 'Developer Friendly',
    description:
      'Built with clean APIs and comprehensive documentation for a delightful developer experience.',
  },
  {
    title: 'Secure by Default',
    description:
      'Enterprise-grade security with end-to-end encryption and compliance certifications built in.',
  },
  {
    title: 'Scalable Infrastructure',
    description:
      'Effortlessly handle millions of requests with auto-scaling infrastructure and global CDN.',
  },
  {
    title: 'Analytics Built In',
    description:
      'Gain deep insights into user behavior with real-time analytics and customizable dashboards.',
  },
]

const iconPaths = [
  'M13 10V3L4 14h7v7l9-11h-7z',
  'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
]

const columnsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function FeaturesGrid({
  headline = 'Everything you need to ship faster',
  subheadline = 'A complete toolkit designed to streamline your workflow and help you build products users love.',
  features = defaultFeatures,
  columns = 3,
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

        <div className={cn('mt-16 grid gap-8', columnsMap[columns])}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
              }}
              className="group rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/20"
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
              >
                <svg
                  className="h-6 w-6 text-primary"
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
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
