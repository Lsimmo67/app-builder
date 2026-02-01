'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Testimonial {
  quote: string
  name: string
  title: string
  avatarInitials?: string
}

interface Props {
  headline?: string
  subheadline?: string
  testimonials?: Testimonial[]
  className?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      'This platform completely transformed how our team works. We shipped our product 3x faster than expected and the quality exceeded all expectations.',
    name: 'Sarah Chen',
    title: 'CTO at TechFlow',
    avatarInitials: 'SC',
  },
  {
    quote:
      'The best developer experience I have encountered in 15 years of building software. The tooling is intuitive, fast, and incredibly well-documented.',
    name: 'Marcus Rodriguez',
    title: 'Lead Engineer at Nexus',
    avatarInitials: 'MR',
  },
  {
    quote:
      'We migrated our entire platform in under a week. The support team was phenomenal and the result speaks for itself — 40% faster page loads.',
    name: 'Emily Watson',
    title: 'VP of Engineering at Orbit',
    avatarInitials: 'EW',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function TestimonialsCards({
  headline = 'Loved by teams worldwide',
  subheadline = 'See what our customers have to say about their experience.',
  testimonials = defaultTestimonials,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
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
            {subheadline}
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-border bg-muted/30 p-8"
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <svg
                className="h-8 w-8 text-primary/40"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                {testimonial.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: 'easeInOut' as const,
                  }}
                >
                  {testimonial.avatarInitials ||
                    testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
