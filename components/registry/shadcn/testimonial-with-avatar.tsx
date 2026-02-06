'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

interface ShadcnTestimonialWithAvatarProps {
  headline?: string
  testimonials?: { quote: string; author: string; role: string; avatar: string; initials: string; rating: number }[]
  className?: string
}

export default function ShadcnTestimonialWithAvatar({
  headline = 'Trusted by industry leaders',
  testimonials = [
    { quote: 'Absolutely phenomenal product. It has saved our team countless hours.', author: 'Sarah Chen', role: 'CTO at TechCorp', avatar: '', initials: 'SC', rating: 5 },
    { quote: 'The best investment we have made in our development toolchain.', author: 'Marcus Johnson', role: 'Lead Developer', avatar: '', initials: 'MJ', rating: 5 },
    { quote: 'Outstanding support and an incredible product. Five stars all the way.', author: 'Emily Rodriguez', role: 'Product Manager', avatar: '', initials: 'ER', rating: 5 },
  ],
  className,
}: ShadcnTestimonialWithAvatarProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
          {headline}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-4">
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
                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
