'use client'

import { cn } from '@/lib/utils/cn'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, X } from 'lucide-react'

interface ShadcnFeatureComparisonProps {
  headline?: string
  description?: string
  headers?: string[]
  features?: { name: string; values: (boolean | string)[] }[]
  className?: string
}

export default function ShadcnFeatureComparison({
  headline = 'Compare features',
  description = 'See how we stack up against the competition.',
  headers = ['Feature', 'Our Product', 'Competitor A', 'Competitor B'],
  features = [
    { name: 'Unlimited Projects', values: [true, false, true] },
    { name: 'Custom Domains', values: [true, true, false] },
    { name: 'Analytics Dashboard', values: [true, false, false] },
    { name: 'Priority Support', values: [true, false, false] },
    { name: 'API Access', values: [true, true, false] },
    { name: 'Team Collaboration', values: [true, false, true] },
  ],
  className,
}: ShadcnFeatureComparisonProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {headers.map((header, i) => (
                  <TableHead key={i} className={i === 0 ? 'w-[200px]' : 'text-center'}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-foreground">{feature.name}</TableCell>
                  {feature.values.map((value, j) => (
                    <TableCell key={j} className="text-center">
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
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
