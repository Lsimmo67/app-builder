'use client'

import { cn } from '@/lib/utils/cn'

interface NeonTextProps {
  className?: string
  text?: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  pulse?: boolean
}

export default function NeonText({
  className,
  text = 'NEON GLOW',
  color = '#8b5cf6',
  size = 'xl',
  pulse = true,
}: NeonTextProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-7xl md:text-8xl',
  }

  return (
    <div className={cn('relative flex items-center justify-center py-12', className)}>
      <h2
        className={cn(
          'font-extrabold tracking-wider',
          sizeClasses[size],
          pulse && 'neon-pulse'
        )}
        style={{
          color: color,
          textShadow: `
            0 0 7px ${color},
            0 0 10px ${color},
            0 0 21px ${color},
            0 0 42px ${color},
            0 0 82px ${color}88,
            0 0 92px ${color}44,
            0 0 102px ${color}22,
            0 0 151px ${color}11
          `,
        }}
      >
        {text}
      </h2>

      {/* Reflected glow on surface */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 opacity-60"
        style={{
          background: `radial-gradient(ellipse at center, ${color}66, transparent 70%)`,
          boxShadow: `0 0 40px 20px ${color}22`,
        }}
      />

      {pulse && (
        <style jsx>{`
          @keyframes neonPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; }
          }
          .neon-pulse {
            animation: neonPulse 2s ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  )
}
