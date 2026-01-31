'use client'

import { cn } from '@/lib/utils/cn'

interface NumberedFeature {
  title: string
  description: string
}

interface Props {
  headline?: string
  subheadline?: string
  features?: NumberedFeature[]
  className?: string
}

const defaultFeatures: NumberedFeature[] = [
  {
    title: 'Design with Precision',
    description:
      'Start with our intuitive design tools that give you pixel-perfect control over every element. Use pre-built components or create custom ones from scratch.',
  },
  {
    title: 'Build with Confidence',
    description:
      'Our type-safe framework catches errors before they reach production. Enjoy instant hot reload, intelligent autocomplete, and comprehensive testing tools.',
  },
  {
    title: 'Deploy in Seconds',
    description:
      'Push to production with zero-config deployments. Automatic SSL, global CDN, and edge functions ensure your application is fast everywhere.',
  },
  {
    title: 'Scale without Limits',
    description:
      'From prototype to enterprise, our infrastructure scales automatically. Handle millions of requests with built-in load balancing and auto-scaling.',
  },
]

export default function FeaturesNumbered({
  headline = 'How it works',
  subheadline = 'Four simple steps to go from idea to production-ready application.',
  features = defaultFeatures,
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
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="relative flex gap-6">
              <div className="flex-shrink-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 text-lg font-bold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
