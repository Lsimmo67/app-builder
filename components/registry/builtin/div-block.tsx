'use client'

import { cn } from '@/lib/utils/cn'

interface DivBlockProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function DivBlock({ children, className, style }: DivBlockProps) {
  return (
    <div className={cn('relative', className)} style={style}>
      {children}
    </div>
  )
}
