'use client'

import { cn } from '@/lib/utils/cn'

interface MorphTextProps {
  className?: string
  style?: React.CSSProperties
}

const words = ['Innovate', 'Disrupt', 'Transform', 'Evolve']

export default function MorphText({ className, style }: MorphTextProps) {
  return (
    <div className={cn('w-full py-24 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-indigo-400">Morphing Text</p>
        <div className="relative h-28 flex items-center justify-center overflow-hidden">
          {words.map((word, i) => (
            <span
              key={i}
              className="absolute text-6xl sm:text-8xl font-black text-white animate-[morphCycle_12s_ease-in-out_infinite]"
              style={{ animationDelay: i * 3 + 's' }}
            >
              {word}
            </span>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes morphCycle {
            0%, 22% { opacity: 0; filter: blur(12px); transform: scale(0.9); }
            25%, 47% { opacity: 1; filter: blur(0px); transform: scale(1); }
            50%, 100% { opacity: 0; filter: blur(12px); transform: scale(1.1); }
          }
        ` }} />
        <p className="mt-8 text-neutral-400 max-w-lg mx-auto">
          Words dissolve and reform through blur-based morphing transitions, creating a fluid text transformation effect.
        </p>
        <div className="mt-10 inline-flex gap-2">
          {words.map((w, i) => (
            <span key={i} className="rounded-md bg-neutral-800/60 px-3 py-1 text-xs text-neutral-400">{w}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
