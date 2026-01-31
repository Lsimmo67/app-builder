'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  planName?: string
  price?: string
  period?: string
  description?: string
  features?: string[]
  buttonText?: string
  badgeText?: string
  className?: string
}

const defaultFeatures = [
  'Unlimited projects',
  '50 GB storage',
  'Advanced analytics dashboard',
  'Priority email support',
  'Custom domain support',
  'Team collaboration tools',
  'API access',
  'Automated backups',
]

export default function PricingSimple({
  planName = 'Pro Plan',
  price = '$29',
  period = '/month',
  description = 'Everything you need to build and scale your next project. No hidden fees.',
  features = defaultFeatures,
  buttonText = 'Start Free Trial',
  badgeText = 'Most Popular',
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-lg">
        <div className="overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-xl shadow-primary/5">
          <div className="bg-primary/5 px-8 py-6 text-center">
            {badgeText && (
              <span className="mb-3 inline-block rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                {badgeText}
              </span>
            )}
            <h3 className="text-xl font-bold text-foreground">{planName}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="px-8 py-8">
            <div className="text-center">
              <span className="text-5xl font-bold tracking-tight text-foreground">
                {price}
              </span>
              {period && (
                <span className="text-lg text-muted-foreground">{period}</span>
              )}
            </div>
            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <svg
                    className="h-5 w-5 shrink-0 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {buttonText}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
