'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface ShadcnFeedbackFormProps {
  headline?: string
  description?: string
  submitText?: string
  className?: string
}

export default function ShadcnFeedbackForm({
  headline = 'Share your feedback',
  description = 'We value your input. Help us improve by sharing your experience.',
  submitText = 'Submit Feedback',
  className,
}: ShadcnFeedbackFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{headline}</CardTitle>
            <p className="text-muted-foreground mt-2">{description}</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label>How would you rate your experience?</Label>
                <div className="flex gap-1 justify-center py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1"
                    >
                      <Star
                        className={cn(
                          'h-8 w-8 transition-colors',
                          (hoveredRating || rating) >= star
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-muted-foreground/30'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-title">Title</Label>
                <input
                  id="feedback-title"
                  placeholder="Summarize your feedback"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-details">Details</Label>
                <textarea
                  id="feedback-details"
                  rows={4}
                  placeholder="Tell us more about your experience..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button type="submit" className="w-full">{submitText}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
