'use client'

import { cn } from '@/lib/utils/cn'
import { Quote } from 'lucide-react'

interface ShadcnTestimonialSingleProps {
  quote?: string
  author?: string
  role?: string
  companyLogo?: string
  className?: string
}

export default function ShadcnTestimonialSingle({
  quote = 'This product has been a game-changer for our entire organization. The ease of use combined with powerful features means our team ships faster than ever. I cannot recommend it highly enough.',
  author = 'Sarah Chen',
  role = 'Chief Technology Officer at TechCorp',
  companyLogo = '',
  className,
}: ShadcnTestimonialSingleProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-4xl text-center">
        <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
        <blockquote className="text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-8">
          {companyLogo && (
            <img src={companyLogo} alt="Company logo" className="h-8 mx-auto mb-4 opacity-60" />
          )}
          <p className="text-lg font-semibold text-foreground">{author}</p>
          <p className="text-muted-foreground">{role}</p>
        </div>
      </div>
    </section>
  )
}
