'use client'

import { cn } from '@/lib/utils/cn'

interface SectionProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  tag?: 'section' | 'div' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav'
}

export default function Section({ children, className, style, tag: Tag = 'section' }: SectionProps) {
  return (
    <Tag className={cn('relative w-full', className)} style={style}>
      {children}
    </Tag>
  )
}
