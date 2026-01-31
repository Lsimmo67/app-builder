'use client'

import { useState } from 'react'
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

export default function TestimonialsCarousel({
  headline = 'What our customers say',
  subheadline = 'Hear from the teams building amazing products with our platform.',
  testimonials = defaultTestimonials,
  className,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    )
  }

  const current = testimonials[currentIndex]

  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subheadline}
          </p>
        </div>
        <div className="mt-16">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
            {/* Stars */}
            {current.rating && (
              <div className="flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            {/* Quote */}
            <blockquote className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {current.avatarInitials ||
                  current.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
              </div>
              <div>
                <p className="font-semibold text-foreground">{current.name}</p>
                <p className="text-sm text-muted-foreground">
                  {current.title}
                </p>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-border hover:bg-muted-foreground/50',
                  )}
                  aria-label={"Go to testimonial " + (index + 1)}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next testimonial"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
