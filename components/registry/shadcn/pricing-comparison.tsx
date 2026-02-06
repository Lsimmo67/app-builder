'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, X } from 'lucide-react'

interface ShadcnPricingComparisonProps {
  headline?: string
  description?: string
  plans?: { name: string; price: string; cta: string }[]
  features?: { category: string; items: { name: string; values: (boolean | string)[] }[] }[]
  className?: string
}

export default function ShadcnPricingComparison({
  headline = 'Compare all plans',
  description = 'Find the perfect plan for your needs.',
  plans = [
    { name: 'Free', price: '$0/mo', cta: 'Get Started' },
    { name: 'Pro', price: '$29/mo', cta: 'Start Trial' },
    { name: 'Enterprise', price: 'Custom', cta: 'Contact Us' },
  ],
  features = [
    {
      category: 'Core Features',
      items: [
        { name: 'Projects', values: ['3', 'Unlimited', 'Unlimited'] },
        { name: 'Storage', values: ['1GB', '100GB', 'Unlimited'] },
        { name: 'Custom Domain', values: [false, true, true] },
      ],
    },
    {
      category: 'Support',
      items: [
        { name: 'Email Support', values: [true, true, true] },
        { name: 'Priority Support', values: [false, true, true] },
        { name: 'Dedicated Manager', values: [false, false, true] },
      ],
    },
  ],
  className,
}: ShadcnPricingComparisonProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[200px]">Features</TableHead>
                {plans.map((plan, i) => (
                  <TableHead key={i} className="text-center">
                    <div className="font-bold text-foreground">{plan.name}</div>
                    <div className="text-sm text-muted-foreground">{plan.price}</div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((category, ci) => (
                <>
                  <TableRow key={`cat-${ci}`} className="bg-muted/30">
                    <TableCell colSpan={plans.length + 1} className="font-semibold text-foreground">
                      {category.category}
                    </TableCell>
                  </TableRow>
                  {category.items.map((item, ii) => (
                    <TableRow key={`${ci}-${ii}`}>
                      <TableCell className="text-foreground">{item.name}</TableCell>
                      {item.values.map((value, vi) => (
                        <TableCell key={vi} className="text-center">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-muted-foreground">{value}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ))}
              <TableRow>
                <TableCell />
                {plans.map((plan, i) => (
                  <TableCell key={i} className="text-center py-4">
                    <Button variant={i === 1 ? 'default' : 'outline'} size="sm">{plan.cta}</Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
