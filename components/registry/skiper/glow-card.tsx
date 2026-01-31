'use client'

import { cn } from '@/lib/utils/cn'

interface GlowCardProps {
  className?: string
  glowColor?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function GlowCard({
  className,
  glowColor = 'rgba(139, 92, 246, 0.4)',
  title = 'Hover Glow',
  description = 'This card radiates a vibrant glow on hover. A subtle yet striking way to draw attention to important content.',
  children,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-2xl border border-white/10 bg-zinc-900 p-8 transition-all duration-500',
        'hover:-translate-y-1',
        className
      )}
      style={{
        boxShadow: '0 0 0 0 transparent',
        transition: 'box-shadow 0.5s ease, transform 0.5s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 40px 8px ${glowColor}, 0 0 80px 16px ${glowColor.replace(/[\d.]+\)$/, '0.15)')}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 0 transparent'
      }}
    >
      {children ?? (
        <>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition-colors duration-500 group-hover:bg-violet-500/20">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
        </>
      )}
    </div>
  )
}
