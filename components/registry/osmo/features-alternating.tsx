'use client'

import { cn } from '@/lib/utils/cn'

interface Feature {
  title: string
  description: string
  bullets?: string[]
}

interface Props {
  headline?: string
  subheadline?: string
  features?: Feature[]
  className?: string
}

const defaultFeatures: Feature[] = [
  {
    title: 'Intuitive drag-and-drop editor',
    description:
      'Build pages visually with our powerful editor. No coding required — just drag, drop, and customize to create pixel-perfect layouts in minutes.',
    bullets: [
      'Visual editing canvas',
      'Pre-built component library',
      'Real-time preview',
    ],
  },
  {
    title: 'Collaborate in real time',
    description:
      'Work together with your team seamlessly. See changes as they happen, leave comments, and manage versions all in one place.',
    bullets: [
      'Multiplayer editing',
      'Inline comments and feedback',
      'Version history and rollbacks',
    ],
  },
  {
    title: 'Deploy with confidence',
    description:
      'Ship to production with one click. Our platform handles hosting, SSL, CDN, and scaling so you can focus on building great products.',
    bullets: [
      'One-click deployments',
      'Automatic SSL certificates',
      'Global CDN distribution',
    ],
  },
]

export default function FeaturesAlternating({
  headline = 'Built for modern teams',
  subheadline = 'Every feature is designed to help you move faster and build better.',
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

        <div className="mt-20 space-y-24">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={cn(
                  'grid items-center gap-12 lg:grid-cols-2 lg:gap-20',
                  !isEven && 'lg:[&>*:first-child]:order-2',
                )}
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.bullets && (
                    <ul className="mt-6 space-y-3">
                      {feature.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="flex items-center gap-3 text-sm text-foreground"
                        >
                          <svg
                            className="h-5 w-5 shrink-0 text-primary"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                  <div className="flex h-full w-full items-center justify-center">
                    <svg
                      className="h-16 w-16 text-muted-foreground/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
