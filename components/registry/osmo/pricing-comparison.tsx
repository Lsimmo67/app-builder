'use client'

import { cn } from '@/lib/utils/cn'

interface ComparisonFeature {
  name: string
  basic: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

interface Props {
  headline?: string
  subheadline?: string
  plans?: string[]
  features?: ComparisonFeature[]
  className?: string
}

const defaultPlans = ['Basic', 'Pro', 'Enterprise']

const defaultFeatures: ComparisonFeature[] = [
  { name: 'Projects', basic: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Storage', basic: '1 GB', pro: '50 GB', enterprise: '500 GB' },
  { name: 'Team Members', basic: '1', pro: '10', enterprise: 'Unlimited' },
  { name: 'Analytics', basic: true, pro: true, enterprise: true },
  { name: 'Custom Domains', basic: false, pro: true, enterprise: true },
  { name: 'API Access', basic: false, pro: true, enterprise: true },
  { name: 'Priority Support', basic: false, pro: true, enterprise: true },
  { name: 'SSO / SAML', basic: false, pro: false, enterprise: true },
  { name: 'SLA Guarantee', basic: false, pro: false, enterprise: true },
  { name: 'Dedicated Account Manager', basic: false, pro: false, enterprise: true },
]

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm font-medium text-foreground">{value}</span>
  }
  if (value) {
    return (
      <svg
        className="mx-auto h-5 w-5 text-primary"
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
    )
  }
  return (
    <svg
      className="mx-auto h-5 w-5 text-muted-foreground/40"
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
  )
}

export default function PricingComparison({
  headline = 'Compare plans',
  subheadline = 'Find the right plan for your team. Every plan includes a 14-day free trial.',
  plans = defaultPlans,
  features = defaultFeatures,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subheadline}
          </p>
        </div>
        <div className="mt-16 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 pr-4 text-left text-sm font-medium text-muted-foreground">
                  Features
                </th>
                {plans.map((plan, index) => (
                  <th
                    key={index}
                    className="pb-4 text-center text-sm font-semibold text-foreground"
                  >
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={cn(
                    'border-b border-border',
                    index % 2 === 0 && 'bg-muted/20',
                  )}
                >
                  <td className="py-4 pr-4 text-sm text-foreground">
                    {feature.name}
                  </td>
                  <td className="py-4 text-center">
                    <CellValue value={feature.basic} />
                  </td>
                  <td className="py-4 text-center">
                    <CellValue value={feature.pro} />
                  </td>
                  <td className="py-4 text-center">
                    <CellValue value={feature.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
