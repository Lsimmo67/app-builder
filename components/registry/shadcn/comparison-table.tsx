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
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'

interface ShadcnComparisonTableProps {
  headline?: string
  description?: string
  products?: { name: string; highlighted?: boolean }[]
  features?: { name: string; category?: string; values: (boolean | string)[] }[]
  className?: string
}

export default function ShadcnComparisonTable({
  headline = 'Product comparison',
  description = 'See how different options stack up side by side.',
  products = [
    { name: 'Basic', highlighted: false },
    { name: 'Pro', highlighted: true },
    { name: 'Enterprise', highlighted: false },
  ],
  features = [
    { name: 'Users', values: ['Up to 5', 'Up to 50', 'Unlimited'] },
    { name: 'Storage', values: ['5 GB', '100 GB', 'Unlimited'] },
    { name: 'API Access', values: [false, true, true] },
    { name: 'Custom Branding', values: [false, true, true] },
    { name: 'Analytics', values: ['Basic', 'Advanced', 'Custom'] },
    { name: 'SSO', values: [false, false, true] },
    { name: 'Priority Support', values: [false, true, true] },
    { name: 'SLA', values: [false, false, true] },
  ],
  className,
}: ShadcnComparisonTableProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[200px]">Feature</TableHead>
                {products.map((product, i) => (
                  <TableHead key={i} className="text-center">
                    <span className="font-bold text-foreground">{product.name}</span>
                    {product.highlighted && (
                      <Badge className="ml-2" variant="default">Popular</Badge>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-foreground">{feature.name}</TableCell>
                  {feature.values.map((value, j) => (
                    <TableCell key={j} className={cn('text-center', products[j]?.highlighted && 'bg-primary/5')}>
                      {typeof value === 'boolean' ? (
                        value ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">{value}</span>
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
