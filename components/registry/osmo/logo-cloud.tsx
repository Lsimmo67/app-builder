'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  logos?: string[]
  className?: string
}

const defaultLogos = [
  'Vercel',
  'Stripe',
  'Shopify',
  'Notion',
  'Linear',
  'Figma',
  'GitHub',
  'Slack',
]

export default function LogoCloud({
  headline = 'Trusted by industry-leading companies',
  logos = defaultLogos,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-16 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {headline}
        </p>
        <div className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex h-12 items-center justify-center rounded-lg bg-muted/50"
            >
              <span className="text-sm font-semibold text-muted-foreground/60">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
