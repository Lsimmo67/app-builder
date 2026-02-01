'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface MovingBorderProps {
  className?: string
  children?: React.ReactNode
  duration?: number
  borderColor?: string
  as?: 'button' | 'div' | 'a'
  containerClassName?: string
  borderRadius?: string
}

export default function MovingBorder({
  className,
  children,
  duration = 3,
  borderColor = 'from-cyan-500 via-purple-500 to-pink-500',
  as: Component = 'button',
  containerClassName,
  borderRadius = '1rem',
}: MovingBorderProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center p-8',
        containerClassName
      )}
    >
      <Component
        className={cn(
          'relative overflow-hidden text-sm font-medium text-white',
          className
        )}
        style={{ borderRadius }}
      >
        {/* Rotating border */}
        <div
          className="absolute inset-0"
          style={{ borderRadius, padding: '2px' }}
        >
          <motion.div
            className={cn(
              'absolute h-[200%] w-[200%] bg-gradient-to-r',
              borderColor
            )}
            style={{
              top: '-50%',
              left: '-50%',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear' as const,
            }}
          />
        </div>

        {/* Inner background that masks the center, revealing only the border */}
        <div
          className="relative z-10 bg-slate-950 px-8 py-3"
          style={{
            borderRadius: `calc(${borderRadius} - 2px)`,
          }}
        >
          {children || (
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              Moving Border Button
            </span>
          )}
        </div>
      </Component>
    </div>
  )
}
