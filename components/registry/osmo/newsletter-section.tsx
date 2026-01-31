'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  description?: string
  buttonText?: string
  placeholder?: string
  disclaimer?: string
  className?: string
}

export default function NewsletterSection({
  headline = 'Stay in the loop',
  description = 'Get the latest updates, articles, and resources delivered straight to your inbox every week.',
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  disclaimer = 'No spam, ever. Unsubscribe at any time.',
  className,
}: Props) {
  return (
    <section
      className={cn(
        'bg-muted/30 px-6 py-20 md:px-12 lg:px-24',
        className,
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder={placeholder}
            className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:max-w-sm"
          />
          <button className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto">
            {buttonText}
          </button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{disclaimer}</p>
      </div>
    </section>
  )
}
