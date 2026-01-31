'use client'

import { cn } from '@/lib/utils/cn'

interface PricingPlan {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  highlighted?: boolean
}

interface Props {
  headline?: string
  subheadline?: string
  plans?: PricingPlan[]
  className?: string
}

const defaultPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '$9',
    period: '/month',
    description: 'Perfect for individuals and small projects getting started.',
    features: [
      'Up to 3 projects',
      '1 GB storage',
      'Basic analytics',
      'Email support',
      'Community access',
    ],
    buttonText: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Ideal for growing teams that need more power and flexibility.',
    features: [
      'Unlimited projects',
      '50 GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom domains',
      'Team collaboration',
      'API access',
    ],
    buttonText: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For organizations that need enterprise-grade features and scale.',
    features: [
      'Unlimited everything',
      '500 GB storage',
      'Real-time analytics',
      'Dedicated support',
      'Custom integrations',
      'SSO & SAML',
      'SLA guarantee',
      'Audit logs',
    ],
    buttonText: 'Contact Sales',
  },
]

export default function PricingCards({
  headline = 'Simple, transparent pricing',
  subheadline = 'Choose the plan that fits your needs. No hidden fees, no surprises.',
  plans = defaultPlans,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subheadline}
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'relative flex flex-col rounded-xl border border-border bg-card p-8',
                plan.highlighted && 'ring-2 ring-primary',
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <div className="mt-6">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-primary"
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
              <button
                className={cn(
                  'mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90'
                    : 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
