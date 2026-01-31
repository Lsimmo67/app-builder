'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  subheadline?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  className?: string
}

export default function HeroCentered({
  headline = 'Build something extraordinary today',
  subheadline = 'Create stunning websites with modern tools and frameworks. Ship faster, iterate often, and delight your users with beautiful experiences.',
  primaryButtonText = 'Get Started',
  secondaryButtonText = 'Learn More',
  className,
}: Props) {
  return (
    <section
      className={cn(
        'flex min-h-[80vh] items-center justify-center bg-background px-6 py-24 md:px-12 lg:px-24',
        className,
      )}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {subheadline}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {primaryButtonText}
          </button>
          <button className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </section>
  )
}
