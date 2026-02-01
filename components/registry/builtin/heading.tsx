'use client'

import { cn } from '@/lib/utils/cn'

interface HeadingProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  level?: 1 | 2 | 3 | 4 | 5 | 6
  text?: string
}

export default function Heading({
  children,
  className,
  style,
  level = 2,
  text = 'Heading',
}: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements
  const defaultSizes: Record<number, string> = {
    1: '2.5rem',
    2: '2rem',
    3: '1.75rem',
    4: '1.5rem',
    5: '1.25rem',
    6: '1rem',
  }
  return (
    <Tag
      className={cn('font-bold', className)}
      style={{ fontSize: defaultSizes[level], ...style }}
    >
      {children || text}
    </Tag>
  )
}
