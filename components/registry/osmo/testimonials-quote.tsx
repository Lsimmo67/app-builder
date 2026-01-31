'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  quote?: string
  authorName?: string
  authorTitle?: string
  authorInitials?: string
  className?: string
}

export default function TestimonialsQuote({
  quote = 'This is hands down the most transformative tool we have ever adopted. Our engineering velocity doubled within the first quarter, and our team morale has never been higher.',
  authorName = 'Alexandra Rivera',
  authorTitle = 'Chief Technology Officer at Lumina',
  authorInitials = 'AR',
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-24 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-4xl text-center">
        <svg
          className="mx-auto h-10 w-10 text-primary/30"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
        </svg>
        <blockquote className="mt-8">
          <p className="text-2xl font-medium italic leading-relaxed text-foreground md:text-3xl lg:text-4xl">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {authorInitials}
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              {authorName}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{authorTitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
