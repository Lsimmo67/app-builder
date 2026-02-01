'use client'

import { cn } from '@/lib/utils/cn'

interface KineticTypographyProps {
  className?: string
  style?: React.CSSProperties
}

export default function KineticTypography({ className, style }: KineticTypographyProps) {
  const words = ['Create', 'Design', 'Animate', 'Inspire']
  const tags = ['Bold', 'Fluid', 'Expressive']

  return (
    <div className={cn('w-full py-24 px-6 overflow-hidden', className)} style={style}>
      <div className="mx-auto max-w-5xl text-center">
        <div className="relative h-64 flex flex-col items-center justify-center gap-2">
          {words.map((word, i) => (
            <span
              key={i}
              className="absolute text-6xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-[kineticCycle_8s_ease-in-out_infinite]"
              style={{ animationDelay: i * 2 + 's' }}
            >
              {word}
            </span>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes kineticCycle {
            0%, 20% { opacity: 0; transform: translateY(40px) scale(0.8) rotate(-3deg); }
            25%, 45% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
            50%, 100% { opacity: 0; transform: translateY(-40px) scale(0.8) rotate(3deg); }
          }
        ` }} />
        <p className="mt-8 text-lg text-neutral-400 max-w-xl mx-auto">
          Kinetic typography brings words to life through motion, scale, and rhythm.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-neutral-700 bg-neutral-900/60 px-4 py-1.5 text-xs text-neutral-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
