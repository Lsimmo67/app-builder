'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  description?: string
  buttonText?: string
  className?: string
}

export default function CtaCentered({
  headline = 'Ready to get started?',
  description = 'Join thousands of teams who are already building better products faster. Start your free trial today — no credit card required.',
  buttonText = 'Start Free Trial',
  className,
}: Props) {
  return (
    <section className={cn('px-6 py-20 md:px-12 lg:px-24', className)}>
      <div className="mx-auto max-w-4xl rounded-2xl bg-primary px-8 py-16 text-center md:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
          {headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
          {description}
        </p>
        <div className="mt-8">
          <button className="inline-flex h-12 items-center justify-center rounded-lg bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}
