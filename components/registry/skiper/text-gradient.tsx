'use client'

import { cn } from '@/lib/utils/cn'

interface TextGradientProps {
  className?: string
  text?: string
  from?: string
  to?: string
  via?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
}

export default function TextGradient({
  className,
  text = 'Stunning Gradient Text',
  from = '#8b5cf6',
  to = '#06b6d4',
  via = '#ec4899',
  size = 'xl',
  animate = true,
}: TextGradientProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-7xl md:text-8xl',
  }

  return (
    <div className={cn('relative', className)}>
      <h2
        className={cn(
          'font-extrabold leading-tight tracking-tight',
          sizeClasses[size],
          animate && 'animate-textGradient'
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, ${from}, ${via}, ${to}, ${from})`,
          backgroundSize: animate ? '300% 300%' : '100% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {text}
      </h2>

      {animate && (
        <style jsx>{`
          @keyframes textGradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-textGradient {
            animation: textGradientShift 5s ease infinite;
          }
        `}</style>
      )}
    </div>
  )
}
