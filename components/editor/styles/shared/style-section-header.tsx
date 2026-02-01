'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StyleSectionHeaderProps {
  title: string
  defaultOpen?: boolean
  hasValues?: boolean
  onReset?: () => void
  children: React.ReactNode
}

export function StyleSectionHeader({
  title,
  defaultOpen = true,
  hasValues = false,
  onReset,
  children,
}: StyleSectionHeaderProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-2 hover:bg-muted/50 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={cn(
              'h-3 w-3 text-muted-foreground transition-transform',
              !open && '-rotate-90'
            )}
          />
          <span className="text-xs font-medium uppercase tracking-wider">{title}</span>
          {hasValues && (
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </div>
        {hasValues && onReset && (
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 opacity-0 hover:opacity-100 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              onReset()
            }}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        )}
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  )
}
