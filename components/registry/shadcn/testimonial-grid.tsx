'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface ShadcnTestimonialGridProps {
  headline?: string
  description?: string
  testimonials?: { quote: string; author: string; role: string; rating: number }[]
  className?: string
}

export default function ShadcnTestimonialGrid({
  headline = 'Loved by thousands',
  description = 'See what our customers have to say about their experience.',
  testimonials = [
    { quote: 'This platform completely transformed how our team works. The productivity gains have been incredible.', author: 'Sarah Chen', role: 'CTO at TechCorp', rating: 5 },
    { quote: 'Simple, powerful, and beautifully designed. Exactly what we were looking for in a development tool.', author: 'Marcus Johnson', role: 'Lead Developer', rating: 5 },
    { quote: 'The customer support alone is worth the price. They go above and beyond every time.', author: 'Emily Rodriguez', role: 'Product Manager', rating: 5 },
    { quote: 'We migrated our entire stack in a weekend. The documentation is outstanding.', author: 'David Kim', role: 'Engineering Lead', rating: 4 },
    { quote: 'Best decision we made this year. Our deployment time went from hours to minutes.', author: 'Lisa Thompson', role: 'DevOps Engineer', rating: 5 },
    { quote: 'The component library saved us months of development time. Highly recommended.', author: 'Alex Rivera', role: 'Frontend Developer', rating: 5 },
  ],
  className,
}: ShadcnTestimonialGridProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn('h-4 w-4', i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30')}
                    />
                  ))}
                </div>
                <blockquote className="text-foreground leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-4 border-t pt-4">
                  <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
