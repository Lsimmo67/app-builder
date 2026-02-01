'use client'

import { cn } from '@/lib/utils/cn'

interface SplitScreenProps {
  className?: string
  style?: React.CSSProperties
}

export default function SplitScreen({ className, style }: SplitScreenProps) {
  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-white">Split Screen Reveal</h2>
        <div className="relative flex h-96 overflow-hidden rounded-2xl border border-neutral-800">
          <div className="w-1/2 bg-gradient-to-br from-indigo-950 to-neutral-950 flex items-center justify-center animate-[slideFromLeft_1s_ease-out_forwards]">
            <div className="p-10 text-left">
              <h3 className="text-3xl font-bold text-white">Left Panel</h3>
              <p className="mt-3 text-neutral-400">Content slides in from the left side with a smooth easing curve.</p>
              <div className="mt-6 h-1 w-16 rounded-full bg-indigo-500" />
            </div>
          </div>
          <div className="w-1/2 bg-gradient-to-bl from-purple-950 to-neutral-950 flex items-center justify-center animate-[slideFromRight_1s_ease-out_0.2s_both]">
            <div className="p-10 text-left">
              <h3 className="text-3xl font-bold text-white">Right Panel</h3>
              <p className="mt-3 text-neutral-400">The opposite panel follows with a slight delay for dramatic effect.</p>
              <div className="mt-6 h-1 w-16 rounded-full bg-purple-500" />
            </div>
          </div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-700" />
        </div>
        <style>{`
          @keyframes slideFromLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          @keyframes slideFromRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        `}</style>
      </div>
    </div>
  )
}
