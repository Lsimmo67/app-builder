'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface ShadcnTestimonialCarouselProps {
  headline?: string
  testimonials?: { quote: string; author: string; role: string }[]
  className?: string
}

export default function ShadcnTestimonialCarousel({
  headline = 'What our customers say',
  testimonials = [
    { quote: 'An amazing product that has revolutionized our workflow. Cannot imagine going back to the old way.', author: 'Sarah Chen', role: 'CTO at TechCorp' },
    { quote: 'The best tool we have adopted this year. Our team productivity has doubled since we started using it.', author: 'Marcus Johnson', role: 'Lead Developer at StartupX' },
    { quote: 'Incredible value for the price. The features keep getting better with every update.', author: 'Emily Rodriguez', role: 'Product Manager at DesignCo' },
  ],
  className,
}: ShadcnTestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">{headline}</h2>
        <Card className="relative">
          <CardContent className="pt-8 pb-8 px-8 md:px-16">
            <Quote className="h-10 w-10 text-primary/20 mx-auto mb-4" />
            <blockquote className="text-xl leading-relaxed text-foreground md:text-2xl">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-foreground">{testimonials[current].author}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" onClick={prev} aria-label="Previous testimonial">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors',
                  index === current ? 'bg-primary' : 'bg-muted-foreground/30'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={next} aria-label="Next testimonial">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
