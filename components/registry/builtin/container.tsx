'use client'

import { cn } from '@/lib/utils/cn'

interface ContainerProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  maxWidth?: string
}

export default function Container({ children, className, style, maxWidth = '1200px' }: ContainerProps) {
  return (
    <div
      className={cn('relative mx-auto w-full', className)}
      style={{ maxWidth, ...style }}
    >
      {children}
    </div>
  )
}
