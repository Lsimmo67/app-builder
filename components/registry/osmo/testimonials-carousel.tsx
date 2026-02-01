'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Testimonial {
  quote: string
  name: string
  title: string
  avatarInitials?: string
  rating?: number
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
      'This platform completely transformed how our team works. We shipped our product 3x faster than expected and the quality exceeded all expectations. I cannot recommend it enough.',
    name: 'Sarah Chen',
    title: 'CTO at TechFlow',
    avatarInitials: 'SC',
    rating: 5,
  },
  {
    quote:
      'The best developer experience I have encountered in 15 years of building software. The tooling is intuitive, fast, and incredibly well-documented. Our entire team was onboarded in a single day.',
    name: 'Marcus Rodriguez',
    title: 'Lead Engineer at Nexus',
    avatarInitials: 'MR',
    rating: 5,
  },
  {
    quote:
      'We migrated our entire platform in under a week. The support team was phenomenal and the result speaks for itself. Page loads are 40% faster and our customers love the new experience.',
    name: 'Emily Watson',
    title: 'VP of Engineering at Orbit',
    avatarInitials: 'EW',
    rating: 5,
  },
  {
    quote:
      'From day one, the platform felt like it was built for our exact use case. The flexibility and performance have been outstanding. It has become the foundation of everything we build.',
    name: 'David Kim',
    title: 'Founder at LaunchPad',
    avatarInitials: 'DK',
    rating: 5,
  },
]

const headerVariants = {
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  }),
}

export default function TestimonialsCarousel({
  headline = 'What our customers say',
  subheadline = 'Hear from the teams building amazing products with our platform.',
  testimonials = defaultTestimonials,
  className,
}: Props) {
  const [[currentIndex, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const nextIndex =
      newDirection > 0
        ? currentIndex === testimonials.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex === 0
          ? testimonials.length - 1
          : currentIndex - 1
    setPage([nextIndex, newDirection])
  }

  const current = testimonials[currentIndex]

  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={headerVariants}
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
        <div className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {current.rating && (
                  <div className="flex gap-1">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <motion.svg
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                )}
                <blockquote className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {current.avatarInitials ||
                      current.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {current.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {current.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              onClick={() => paginate(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-border hover:bg-muted-foreground/50',
                  )}
                  aria-label={'Go to testimonial ' + (index + 1)}
                  animate={{ width: index === currentIndex ? 24 : 8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                />
              ))}
            </div>
            <motion.button
              onClick={() => paginate(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
