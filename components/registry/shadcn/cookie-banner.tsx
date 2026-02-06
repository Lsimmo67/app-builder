'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie } from 'lucide-react'

interface ShadcnCookieBannerProps {
  message?: string
  acceptText?: string
  declineText?: string
  learnMoreText?: string
  learnMoreHref?: string
  className?: string
}

export default function ShadcnCookieBanner({
  message = 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
  acceptText = 'Accept All',
  declineText = 'Decline',
  learnMoreText = 'Learn more',
  learnMoreHref = '#',
  className,
}: ShadcnCookieBannerProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className={cn('fixed bottom-0 left-0 right-0 z-50 p-4', className)}>
      <Card className="mx-auto max-w-2xl shadow-lg">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-foreground">{message}</p>
              {learnMoreText && (
                <a href={learnMoreHref} className="text-sm text-primary hover:underline mt-1 inline-block">
                  {learnMoreText}
                </a>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setVisible(false)}>
              {declineText}
            </Button>
            <Button size="sm" onClick={() => setVisible(false)}>
              {acceptText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
