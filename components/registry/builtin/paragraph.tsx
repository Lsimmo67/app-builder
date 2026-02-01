'use client'

import { cn } from '@/lib/utils/cn'

interface ParagraphProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  text?: string
}

export default function Paragraph({
  children,
  className,
  style,
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}: ParagraphProps) {
  return (
    <p className={cn('', className)} style={style}>
      {children || text}
    </p>
  )
}
