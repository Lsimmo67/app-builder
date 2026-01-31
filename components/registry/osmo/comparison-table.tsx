'use client'

import { cn } from '@/lib/utils/cn'

interface ComparisonFeature {
  feature: string
  us: boolean
  them: boolean
}

interface Props {
  headline?: string
  subheadline?: string
  ourName?: string
  theirName?: string
  features?: ComparisonFeature[]
  className?: string
}

const defaultFeatures: ComparisonFeature[] = [
  { feature: 'Unlimited projects', us: true, them: false },
  { feature: 'Real-time collaboration', us: true, them: true },
  { feature: 'Advanced analytics', us: true, them: false },
  { feature: 'Priority support', us: true, them: false },
  { feature: 'Custom domains', us: true, them: true },
  { feature: 'API access', us: true, them: true },
  { feature: 'SSO integration', us: true, them: false },
  { feature: 'Automated backups', us: true, them: false },
  { feature: '99.99% uptime SLA', us: true, them: false },
  { feature: 'No vendor lock-in', us: true, them: false },
]

export default function ComparisonTable({
  headline = 'See how we compare',
  subheadline = 'We built a better solution. Here is how we stack up against the competition.',
  ourName = 'Us',
  theirName = 'Them',
  features = defaultFeatures,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subheadline}
          </p>
        </div>
        <div className="mt-16 overflow-hidden rounded-xl border border-border">
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_100px] bg-muted/50 px-6 py-4 md:grid-cols-[1fr_120px_120px]">
            <div className="text-sm font-semibold text-foreground">Feature</div>
            <div className="text-center text-sm font-semibold text-primary">
              {ourName}
            </div>
            <div className="text-center text-sm font-semibold text-muted-foreground">
              {theirName}
            </div>
          </div>
          {/* Rows */}
          {features.map((item, index) => (
            <div
              key={index}
              className={cn(
                'grid grid-cols-[1fr_100px_100px] px-6 py-3.5 md:grid-cols-[1fr_120px_120px]',
                index % 2 === 0 ? 'bg-card' : 'bg-muted/20',
              )}
            >
              <div className="text-sm text-foreground">{item.feature}</div>
              <div className="flex justify-center">
                {item.us ? (
                  <svg
                    className="h-5 w-5 text-primary"
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
                ) : (
                  <svg
                    className="h-5 w-5 text-muted-foreground/40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <div className="flex justify-center">
                {item.them ? (
                  <svg
                    className="h-5 w-5 text-muted-foreground"
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
                ) : (
                  <svg
                    className="h-5 w-5 text-muted-foreground/40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
