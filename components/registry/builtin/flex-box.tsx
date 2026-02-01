'use client'

import { cn } from '@/lib/utils/cn'

interface FlexBoxProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justify?: string
  align?: string
  gap?: string
}

export default function FlexBox({
  children,
  className,
  style,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'flex-start',
  align = 'stretch',
  gap = '0px',
}: FlexBoxProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
