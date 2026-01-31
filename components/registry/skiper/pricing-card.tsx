'use client'

import { cn } from '@/lib/utils/cn'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  className?: string
  plan?: string
  price?: string
  period?: string
  description?: string
  features?: PricingFeature[]
  ctaText?: string
  popular?: boolean
  onCtaClick?: () => void
}

const defaultFeatures: PricingFeature[] = [
  { text: 'Unlimited projects', included: true },
  { text: 'Advanced analytics', included: true },
  { text: 'Priority support', included: true },
  { text: 'Custom integrations', included: true },
  { text: 'Team collaboration', included: false },
  { text: 'Enterprise SSO', included: false },
]

export default function PricingCard({
  className,
  plan = 'Pro',
  price = '$29',
  period = '/month',
  description = 'Perfect for growing teams that need more power and flexibility.',
  features = defaultFeatures,
  ctaText = 'Get Started',
  popular = true,
  onCtaClick,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'group relative w-full max-w-sm overflow-hidden rounded-2xl',
        popular && 'scale-105',
        className
      )}
    >
      {/* Animated gradient border */}
      {popular && (
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 opacity-80" />
      )}

      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border bg-zinc-950/80 p-8 backdrop-blur-xl',
          popular ? 'border-transparent' : 'border-white/10'
        )}
      >
        {/* Glassmorphism highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-white/[0.03]" />

        {/* Accent glow */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl transition-all duration-700 group-hover:bg-violet-500/20" />

        <div className="relative z-10">
          {/* Badge */}
          {popular && (
            <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 px-3 py-1 text-xs font-semibold text-violet-300">
              Most Popular
            </div>
          )}

          {/* Plan name */}
          <h3 className="text-lg font-semibold text-white">{plan}</h3>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-1">
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-bold text-transparent">
              {price}
            </span>
            <span className="text-sm text-neutral-500">{period}</span>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-neutral-400">{description}</p>

          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                    feature.included
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'bg-neutral-800 text-neutral-600'
                  )}
                >
                  {feature.included ? (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <span
                  className={cn(
                    'text-sm',
                    feature.included ? 'text-neutral-300' : 'text-neutral-600'
                  )}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={onCtaClick}
            className={cn(
              'mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-all',
              popular
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30'
                : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
            )}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  )
}
