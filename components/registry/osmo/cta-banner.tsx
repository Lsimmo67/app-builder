'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  description?: string
  buttonText?: string
  secondaryButtonText?: string
  className?: string
}

export default function CtaBanner({
  headline = 'Ready to accelerate your workflow?',
  description = 'Join thousands of teams already shipping faster. Start your free trial today.',
  buttonText = 'Get Started Free',
  secondaryButtonText = 'Talk to Sales',
  className,
}: Props) {
  return (
    <section className={cn('px-6 py-20 md:px-12 lg:px-24', className)}>
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-8 py-12 md:px-16">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
              {headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-primary-foreground/80">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <button className="inline-flex h-11 items-center justify-center rounded-lg bg-background px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button className="inline-flex h-11 items-center justify-center rounded-lg border border-primary-foreground/25 bg-transparent px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
