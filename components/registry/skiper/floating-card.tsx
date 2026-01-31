'use client'

import { cn } from '@/lib/utils/cn'

interface FloatingCardProps {
  className?: string
  title?: string
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode
}

export default function FloatingCard({
  className,
  title = 'Floating Card',
  description = 'Hover over this card to see it gently lift off the surface with an enhanced shadow, creating a sense of depth and interactivity.',
  icon,
  children,
}: FloatingCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-8',
        'shadow-lg shadow-black/20',
        'transition-all duration-500 ease-out',
        'hover:-translate-y-2 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/40',
        className
      )}
    >
      {children ?? (
        <>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-400 transition-transform duration-500 group-hover:scale-110">
            {icon ?? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            )}
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-zinc-400">{description}</p>
          <div className="flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors group-hover:text-violet-300">
            <span>Learn more</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}
