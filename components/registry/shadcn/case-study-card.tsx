'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface ShadcnCaseStudyCardProps {
  headline?: string
  description?: string
  caseStudies?: {
    company: string
    industry: string
    result: string
    quote: string
    imageSrc?: string
  }[]
  className?: string
}

export default function ShadcnCaseStudyCard({
  headline = 'Customer success stories',
  description = 'See how teams use our platform to achieve incredible results.',
  caseStudies = [
    { company: 'TechCorp', industry: 'SaaS', result: '3x faster deployment', quote: 'We reduced our deployment pipeline from 45 minutes to under 15 minutes.', imageSrc: '' },
    { company: 'DesignStudio', industry: 'Agency', result: '60% cost reduction', quote: 'The platform eliminated the need for three separate tools we were paying for.', imageSrc: '' },
    { company: 'StartupX', industry: 'Fintech', result: '10x user growth', quote: 'Scaling from 1K to 10K users was seamless with the infrastructure provided.', imageSrc: '' },
  ],
  className,
}: ShadcnCaseStudyCardProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden bg-background">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {study.imageSrc ? (
                  <img src={study.imageSrc} alt={study.company} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground/30">{study.company}</span>
                )}
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{study.industry}</Badge>
                  <span className="text-sm font-semibold text-primary">{study.result}</span>
                </div>
                <h3 className="font-semibold text-foreground">{study.company}</h3>
                <p className="mt-2 text-sm text-muted-foreground italic">&ldquo;{study.quote}&rdquo;</p>
                <Button variant="link" className="mt-3 p-0 h-auto text-sm">
                  Read case study <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
