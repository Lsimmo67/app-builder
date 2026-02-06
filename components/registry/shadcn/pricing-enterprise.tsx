'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Building2 } from 'lucide-react'

interface ShadcnPricingEnterpriseProps {
  headline?: string
  description?: string
  features?: string[]
  ctaText?: string
  contactEmail?: string
  className?: string
}

export default function ShadcnPricingEnterprise({
  headline = 'Enterprise-grade solutions',
  description = 'Custom pricing tailored to your organization\'s needs. Get dedicated support, advanced security, and unlimited scale.',
  features = [
    'Custom contract and SLA',
    'Dedicated account manager',
    'SSO / SAML authentication',
    'Advanced audit logs',
    'Custom integrations',
    'On-premise deployment option',
    'Priority 24/7 support',
    '99.99% uptime guarantee',
  ],
  ctaText = 'Contact Sales',
  contactEmail = 'sales@example.com',
  className,
}: ShadcnPricingEnterpriseProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CardHeader className="bg-primary/5 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">{headline}</CardTitle>
              <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
              <div className="mt-8 space-y-3">
                <Button size="lg" className="w-full">{ctaText}</Button>
                <p className="text-center text-sm text-muted-foreground">
                  Or email us at{' '}
                  <a href={`mailto:${contactEmail}`} className="text-primary underline">
                    {contactEmail}
                  </a>
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <h3 className="text-lg font-semibold text-foreground mb-6">Everything you get:</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
