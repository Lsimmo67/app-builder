'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Play } from 'lucide-react'

interface ShadcnTestimonialVideoProps {
  headline?: string
  description?: string
  testimonials?: { name: string; role: string; thumbnailSrc?: string; videoUrl?: string; quote: string }[]
  className?: string
}

export default function ShadcnTestimonialVideo({
  headline = 'Hear from our customers',
  description = 'Watch real stories from teams who transformed their workflow.',
  testimonials = [
    { name: 'Sarah Chen', role: 'CTO at TechCorp', thumbnailSrc: '', videoUrl: '', quote: 'This tool transformed how we build products.' },
    { name: 'Marcus Johnson', role: 'Lead Developer', thumbnailSrc: '', videoUrl: '', quote: 'Our deployment time went from hours to minutes.' },
    { name: 'Emily Rodriguez', role: 'Product Manager', thumbnailSrc: '', videoUrl: '', quote: 'The team collaboration features are unmatched.' },
  ],
  className,
}: ShadcnTestimonialVideoProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden bg-background">
              <div className="relative aspect-video bg-muted flex items-center justify-center cursor-pointer group">
                {testimonial.thumbnailSrc ? (
                  <img src={testimonial.thumbnailSrc} alt={testimonial.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white group-hover:bg-primary transition-colors">
                    <Play className="h-6 w-6 ml-1" />
                  </div>
                )}
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-3">
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
