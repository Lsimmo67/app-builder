'use client'

import { cn } from '@/lib/utils/cn'

interface ShadcnStatsSectionProps {
  headline?: string
  description?: string
  stats?: { value: string; label: string }[]
  className?: string
}

export default function ShadcnStatsSection({
  headline = 'Trusted by teams everywhere',
  description = 'Our numbers speak for themselves.',
  stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '150+', label: 'Countries' },
    { value: '4.9/5', label: 'User Rating' },
  ],
  className,
}: ShadcnStatsSectionProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-foreground md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
