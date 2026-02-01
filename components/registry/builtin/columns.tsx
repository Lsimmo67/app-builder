'use client'

import { cn } from '@/lib/utils/cn'

interface ColumnsProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  count?: 2 | 3 | 4
  gap?: string
}

export default function Columns({
  children,
  className,
  style,
  count = 2,
  gap = '24px',
}: ColumnsProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${count}, 1fr)`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
