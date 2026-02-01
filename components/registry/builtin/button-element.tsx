'use client'

import { cn } from '@/lib/utils/cn'

interface ButtonElementProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  text?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles: Record<string, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function ButtonElement({
  children,
  className,
  style,
  text = 'Button',
  variant = 'primary',
  size = 'md',
  type = 'button',
}: ButtonElementProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={style}
    >
      {children || text}
    </button>
  )
}
