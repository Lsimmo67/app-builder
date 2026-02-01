'use client'

import { cn } from '@/lib/utils/cn'

interface TextBlockProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  text?: string
}

export default function TextBlock({
  children,
  className,
  style,
  text = 'Text block',
}: TextBlockProps) {
  return (
    <span className={cn('', className)} style={style}>
      {children || text}
    </span>
  )
}
