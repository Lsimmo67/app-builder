'use client'

import { cn } from '@/lib/utils/cn'

interface LinkElementProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  href?: string
  text?: string
  target?: '_self' | '_blank'
}

export default function LinkElement({
  children,
  className,
  style,
  href = '#',
  text = 'Link',
  target = '_self',
}: LinkElementProps) {
  return (
    <a
      href={href}
      target={target}
      className={cn('text-blue-600 underline hover:text-blue-800', className)}
      style={style}
    >
      {children || text}
    </a>
  )
}
