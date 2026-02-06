'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

interface ShadcnPricingThreeTierProps {
  headline?: string
  description?: string
  plans?: {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    cta: string
    highlighted: boolean
  }[]
  className?: string
}

export default function ShadcnPricingThreeTier({
  headline = 'Simple, transparent pricing',
  description = 'Choose the plan that works best for you and your team.',
  plans = [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for individuals and small projects.',
      features: ['5 Projects', '10GB Storage', 'Basic Analytics', 'Email Support'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'Ideal for growing teams and businesses.',
      features: ['Unlimited Projects', '100GB Storage', 'Advanced Analytics', 'Priority Support', 'Custom Domains', 'API Access'],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large organizations with custom needs.',
      features: ['Everything in Pro', 'Unlimited Storage', 'Dedicated Support', 'SLA Guarantee', 'SSO / SAML', 'Custom Integrations'],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ],
  className,
}: ShadcnPricingThreeTierProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={cn('relative flex flex-col', plan.highlighted && 'border-primary shadow-lg scale-105')}>
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
