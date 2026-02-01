'use client'

import { cn } from '@/lib/utils/cn'

interface LinkBlockProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  href?: string
  target?: '_self' | '_blank'
}

export default function LinkBlock({
  children,
  className,
  style,
  href = '#',
  target = '_self',
}: LinkBlockProps) {
  return (
    <a
      href={href}
      target={target}
      className={cn('block', className)}
      style={style}
    >
      {children || (
        <div className="p-4 border-2 border-dashed border-muted-foreground/20 rounded-lg text-center text-muted-foreground text-sm">
          Link Block - Drop content here
        </div>
      )}
    </a>
  )
}
