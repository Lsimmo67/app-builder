'use client'

import { cn } from '@/lib/utils/cn'

interface Stat {
  value: string
  label: string
}

interface Props {
  headline?: string
  subheadline?: string
  stats?: Stat[]
  className?: string
}

const defaultStats: Stat[] = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
  { value: '2M+', label: 'Projects Shipped' },
]

export default function StatsSection({
  headline = 'Trusted by developers everywhere',
  subheadline = 'Our numbers speak for themselves. Join a growing community of builders.',
  stats = defaultStats,
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
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-8 text-center"
            >
              <p className="text-4xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
