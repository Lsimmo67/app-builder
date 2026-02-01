'use client'

import { cn } from '@/lib/utils/cn'

interface ListElementProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  type?: 'ul' | 'ol'
  items?: string[]
}

export default function ListElement({
  children,
  className,
  style,
  type = 'ul',
  items = ['Item 1', 'Item 2', 'Item 3'],
}: ListElementProps) {
  const Tag = type
  return (
    <Tag
      className={cn(type === 'ul' ? 'list-disc' : 'list-decimal', 'pl-6', className)}
      style={style}
    >
      {children || items.map((item, i) => <li key={i}>{item}</li>)}
    </Tag>
  )
}
