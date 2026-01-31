'use client'

import { cn } from '@/lib/utils/cn'

interface BentoFeature {
  title: string
  description: string
  iconPath?: string
  size?: 'large' | 'small'
}

interface Props {
  headline?: string
  subheadline?: string
  features?: BentoFeature[]
  className?: string
}

const defaultFeatures: BentoFeature[] = [
  {
    title: 'AI-Powered Workflows',
    description:
      'Automate repetitive tasks with intelligent workflows that learn from your patterns and optimize over time. Reduce manual work by up to 80%.',
    iconPath: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z',
    size: 'large',
  },
  {
    title: 'Real-time Collaboration',
    description:
      'Work together seamlessly with live cursors, instant syncing, and built-in commenting.',
    iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    size: 'small',
  },
  {
    title: 'Advanced Analytics',
    description:
      'Track every metric that matters with customizable dashboards and automated reports.',
    iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    size: 'small',
  },
  {
    title: 'One-Click Deploy',
    description:
      'Ship to production in seconds with zero-config deployments and automatic rollbacks.',
    iconPath: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
    size: 'small',
  },
]

export default function FeaturesBento({
  headline = 'Built for the way you work',
  subheadline = 'Powerful features designed to streamline every part of your workflow.',
  features = defaultFeatures,
  className,
}: Props) {
  const largeFeature = features.find((f) => f.size === 'large') || features[0]
  const smallFeatures = features.filter((f) => f !== largeFeature)

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
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Large featured card */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8 md:col-span-2 lg:row-span-2">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <svg
                  className="h-7 w-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={largeFeature.iconPath || 'M13 10V3L4 14h7v7l9-11h-7z'}
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground">
                {largeFeature.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                {largeFeature.description}
              </p>
            </div>
            <div className="mt-8 flex h-48 items-center justify-center rounded-xl bg-muted/50">
              <div className="text-sm text-muted-foreground">
                Feature preview
              </div>
            </div>
          </div>
          {/* Smaller cards */}
          {smallFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={feature.iconPath || 'M13 10V3L4 14h7v7l9-11h-7z'}
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
