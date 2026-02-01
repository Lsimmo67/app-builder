'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface NumberedFeature {
  title: string
  description: string
}

interface Props {
  headline?: string
  subheadline?: string
  features?: NumberedFeature[]
  className?: string
}

const defaultFeatures: NumberedFeature[] = [
  {
    title: 'Design with Precision',
    description:
      'Start with our intuitive design tools that give you pixel-perfect control over every element. Use pre-built components or create custom ones from scratch.',
  },
  {
    title: 'Build with Confidence',
    description:
      'Our type-safe framework catches errors before they reach production. Enjoy instant hot reload, intelligent autocomplete, and comprehensive testing tools.',
  },
  {
    title: 'Deploy in Seconds',
    description:
      'Push to production with zero-config deployments. Automatic SSL, global CDN, and edge functions ensure your application is fast everywhere.',
  },
  {
    title: 'Scale without Limits',
    description:
      'From prototype to enterprise, our infrastructure scales automatically. Handle millions of requests with built-in load balancing and auto-scaling.',
  },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

function AnimatedNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(2, '0'))

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      })
      return controls.stop
    }
  }, [isInView, target, count])

  return (
    <motion.span ref={ref}>
      {rounded}
    </motion.span>
  )
}

export default function FeaturesNumbered({
  headline = 'How it works',
  subheadline = 'Four simple steps to go from idea to production-ready application.',
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

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
              className="group relative flex gap-6"
            >
              {/* Connecting line for visual flow */}
              {index < features.length - 1 && (
                <div className="absolute left-6 top-14 hidden h-[calc(100%+1rem)] w-px bg-gradient-to-b from-primary/20 to-transparent md:block" />
              )}

              <div className="flex-shrink-0">
                <motion.span
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 text-lg font-bold text-primary transition-colors group-hover:border-primary/50 group-hover:bg-primary/5"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                >
                  <AnimatedNumber target={index + 1} />
                </motion.span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <motion.div
                  className="mt-3 h-0.5 w-0 rounded-full bg-primary/30"
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.6, ease: 'easeOut' as const }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
