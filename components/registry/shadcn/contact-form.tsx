'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send } from 'lucide-react'

interface ShadcnContactFormProps {
  headline?: string
  description?: string
  submitText?: string
  className?: string
}

export default function ShadcnContactForm({
  headline = 'Get in touch',
  description = 'Fill out the form below and we will get back to you within 24 hours.',
  submitText = 'Send Message',
  className,
}: ShadcnContactFormProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{headline}</CardTitle>
            <p className="text-muted-foreground mt-2">{description}</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-first-name">First name</Label>
                  <Input id="contact-first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-last-name">Last name</Label>
                  <Input id="contact-last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input id="contact-subject" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us more about your project..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                {submitText}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
