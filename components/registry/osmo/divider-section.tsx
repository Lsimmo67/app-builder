'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  pattern?: 'line' | 'dots' | 'wave'
  spacing?: 'sm' | 'md' | 'lg'
  className?: string
}

const spacingMap = {
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-16',
}

export default function DividerSection({
  pattern = 'line',
  spacing = 'md',
  className,
}: Props) {
  return (
    <section
      className={cn(
        'bg-background px-6 md:px-12 lg:px-24',
        spacingMap[spacing],
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        {pattern === 'line' && (
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        )}

        {pattern === 'dots' && (
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <div className="flex gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
        )}

        {pattern === 'wave' && (
          <div className="flex justify-center">
            <svg
              className="h-6 w-full max-w-lg text-border"
              viewBox="0 0 600 24"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 12C50 12 50 2 100 2C150 2 150 22 200 22C250 22 250 2 300 2C350 2 350 22 400 22C450 22 450 2 500 2C550 2 550 12 600 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
    </section>
  )
}
