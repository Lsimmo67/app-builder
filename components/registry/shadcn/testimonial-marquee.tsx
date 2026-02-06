'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface ShadcnTestimonialMarqueeProps {
  headline?: string
  testimonials?: { quote: string; author: string; role: string }[]
  speed?: number
  className?: string
}

export default function ShadcnTestimonialMarquee({
  headline = 'What people are saying',
  testimonials = [
    { quote: 'Incredible tool that changed how we build products.', author: 'Sarah C.', role: 'CTO' },
    { quote: 'Simple, powerful, and a joy to use every day.', author: 'Marcus J.', role: 'Developer' },
    { quote: 'The best developer experience I have ever had.', author: 'Emily R.', role: 'Engineer' },
    { quote: 'Our team productivity doubled after switching.', author: 'David K.', role: 'Tech Lead' },
    { quote: 'Outstanding support and rapid feature development.', author: 'Lisa T.', role: 'PM' },
    { quote: 'Worth every penny. Cannot recommend enough.', author: 'Alex R.', role: 'Founder' },
  ],
  speed = 30,
  className,
}: ShadcnTestimonialMarqueeProps) {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className={cn('py-16 px-4 md:py-24 overflow-hidden', className)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
          {headline}
        </h2>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee ${speed}s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative">
        <div className="marquee-track flex gap-6 w-max">
          {doubled.map((testimonial, index) => (
            <Card key={index} className="w-[350px] shrink-0 bg-background">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-3 border-t pt-3">
                  <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
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
