'use client'

import { cn } from '@/lib/utils/cn'

interface TextMaskProps {
  className?: string
  style?: React.CSSProperties
}

export default function TextMask({ className, style }: TextMaskProps) {
  return (
    <div className={cn('w-full py-24 px-6 overflow-hidden', className)} style={style}>
      <div className="mx-auto max-w-5xl text-center">
        <div className="relative">
          <h2
            className="text-7xl sm:text-9xl font-black uppercase tracking-tighter animate-[maskReveal_1.5s_ease-out_forwards]"
            style={{
              backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'maskReveal 1.5s ease-out forwards, gradientShift 4s ease-in-out infinite',
            }}
          >
            Masked
          </h2>
          <div
            className="absolute inset-0 bg-neutral-950 animate-[maskWipe_1.2s_ease-in-out_forwards]"
            style={{ transformOrigin: 'right center' }}
          />
        </div>
        <style>{`
          @keyframes maskWipe { from { transform: scaleX(1); } to { transform: scaleX(0); } }
          @keyframes maskReveal { from { opacity: 0; letter-spacing: 0.3em; } to { opacity: 1; letter-spacing: -0.05em; } }
          @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        `}</style>
        <p className="mt-8 text-lg text-neutral-400 max-w-2xl mx-auto">
          Text masked with gradient imagery, revealed through a cinematic wipe transition
          that draws attention to every letter.
        </p>
        <div className="mt-12 flex justify-center gap-8">
          {['Gradient Mask', 'Wipe Reveal', 'Letter Spacing'].map((feat) => (
            <div key={feat} className="text-center">
              <div className="h-1 w-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              <p className="text-xs text-neutral-500">{feat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
