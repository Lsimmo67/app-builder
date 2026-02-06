'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { X, ArrowRight } from 'lucide-react'

interface ShadcnAnnouncementBarProps {
  message?: string
  linkText?: string
  linkHref?: string
  dismissible?: boolean
  className?: string
}

export default function ShadcnAnnouncementBar({
  message = 'We just launched our new feature!',
  linkText = 'Learn more',
  linkHref = '#',
  dismissible = true,
  className,
}: ShadcnAnnouncementBarProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className={cn('bg-primary text-primary-foreground', className)}>
      <div className="mx-auto max-w-6xl flex items-center justify-center gap-2 px-4 py-2.5 text-sm">
        <span>{message}</span>
        {linkText && (
          <a href={linkHref} className="inline-flex items-center font-semibold underline underline-offset-4 hover:no-underline">
            {linkText}
            <ArrowRight className="ml-1 h-3 w-3" />
          </a>
        )}
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 h-6 w-6 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
            onClick={() => setVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
