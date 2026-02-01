'use client'

import { cn } from '@/lib/utils/cn'

interface RichTextProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  content?: string
}

export default function RichText({
  children,
  className,
  style,
  content = '<p>Rich text content. You can add <strong>bold</strong>, <em>italic</em>, and other formatting.</p>',
}: RichTextProps) {
  return (
    <div
      className={cn('prose max-w-none', className)}
      style={style}
      dangerouslySetInnerHTML={children ? undefined : { __html: content }}
    >
      {children}
    </div>
  )
}
