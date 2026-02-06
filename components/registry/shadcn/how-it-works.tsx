'use client'

import { cn } from '@/lib/utils/cn'

interface ShadcnHowItWorksProps {
  headline?: string
  description?: string
  steps?: { title: string; description: string }[]
  className?: string
}

export default function ShadcnHowItWorks({
  headline = 'How it works',
  description = 'Get started in three simple steps.',
  steps = [
    { title: 'Create an account', description: 'Sign up for free in under 30 seconds. No credit card required.' },
    { title: 'Set up your project', description: 'Choose a template or start from scratch. Import your existing data with one click.' },
    { title: 'Launch and grow', description: 'Deploy to production instantly. Monitor performance and scale as you grow.' },
  ],
  className,
}: ShadcnHowItWorksProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold mx-auto mb-4">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-border" />
              )}
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
