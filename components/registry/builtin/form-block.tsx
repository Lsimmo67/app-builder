'use client'

import { cn } from '@/lib/utils/cn'

interface FormBlockProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  action?: string
  method?: 'get' | 'post'
}

export default function FormBlock({
  children,
  className,
  style,
  action = '#',
  method = 'post',
}: FormBlockProps) {
  return (
    <form
      action={action}
      method={method}
      className={cn('space-y-4', className)}
      style={style}
      onSubmit={(e) => e.preventDefault()}
    >
      {children || (
        <div className="p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg text-center text-muted-foreground text-sm">
          Drop form elements here
        </div>
      )}
    </form>
  )
}
