'use client'

import { cn } from '@/lib/utils/cn'

interface StaggerRevealProps {
  className?: string
  style?: React.CSSProperties
}

const items = [
  { label: 'Strategy', desc: 'Define the vision and roadmap' },
  { label: 'Design', desc: 'Craft beautiful interfaces' },
  { label: 'Develop', desc: 'Build with modern tools' },
  { label: 'Test', desc: 'Ensure quality at every step' },
  { label: 'Deploy', desc: 'Ship to production seamlessly' },
  { label: 'Iterate', desc: 'Improve based on feedback' },
]

export default function StaggerReveal({ className, style }: StaggerRevealProps) {
  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">Staggered Reveal</h2>
        <p className="mb-12 text-center text-neutral-400">Elements appear in sequence with cascading timing</p>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 animate-[staggerFadeUp_0.6s_ease-out_both]"
              style={{ animationDelay: i * 0.12 + 's' }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-sm font-bold text-indigo-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes staggerFadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        ` }} />
      </div>
    </div>
  )
}
