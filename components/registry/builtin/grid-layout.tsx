'use client'

import { cn } from '@/lib/utils/cn'

interface GridLayoutProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  columns?: string
  rows?: string
  gap?: string
}

export default function GridLayout({
  children,
  className,
  style,
  columns = 'repeat(2, 1fr)',
  rows = 'auto',
  gap = '16px',
}: GridLayoutProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
