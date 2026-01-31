'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  description?: string
  buttonText?: string
  placeholder?: string
  promiseText?: string
  className?: string
}

export default function CtaNewsletter({
  headline = 'Stay ahead of the curve',
  description = 'Get the latest product updates, engineering insights, and industry news delivered straight to your inbox.',
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  promiseText = 'No spam, ever. Unsubscribe at any time.',
  className,
}: Props) {
  return (
    <section
      className={cn('bg-muted/30 px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <input
            type="email"
            placeholder={placeholder}
            className="h-12 flex-1 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:max-w-sm"
          />
          <button className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {buttonText}
          </button>
        </div>
        {promiseText && (
          <p className="mt-4 text-sm text-muted-foreground">{promiseText}</p>
        )}
      </div>
    </section>
  )
}
