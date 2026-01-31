'use client'

import { cn } from '@/lib/utils/cn'

interface Logo {
  name: string
  width?: string
}

interface LogoMarqueeProps {
  className?: string
  logos?: Logo[]
  speed?: number
  direction?: 'left' | 'right'
  label?: string
}

const defaultLogos: Logo[] = [
  { name: 'Acme Corp' },
  { name: 'Globex' },
  { name: 'Initech' },
  { name: 'Hooli' },
  { name: 'Pied Piper' },
  { name: 'Stark Ind.' },
  { name: 'Wayne Ent.' },
  { name: 'Umbrella' },
  { name: 'Cyberdyne' },
  { name: 'Soylent' },
]

export default function LogoMarquee({
  className,
  logos = defaultLogos,
  speed = 30,
  direction = 'left',
  label = 'Trusted by industry leaders',
}: LogoMarqueeProps) {
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div
      className={cn(
        'w-full overflow-hidden bg-zinc-950 py-12',
        className
      )}
    >
      {/* Label */}
      {label && (
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-neutral-500">
          {label}
        </p>
      )}

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-zinc-950 to-transparent" />

        {/* Scrolling track */}
        <div
          className="flex w-max items-center gap-12"
          style={{
            animation: `marquee-scroll ${speed}s linear infinite`,
            animationDirection: direction === 'right' ? 'reverse' : 'normal',
          }}
        >
          {duplicatedLogos.map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-6 py-3 text-sm font-semibold text-neutral-400 transition-colors hover:border-white/10 hover:text-neutral-300"
            >
              {/* Abstract logo icon */}
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-white/10 to-white/5">
                <span className="text-xs font-bold text-white/40">
                  {logo.name.charAt(0)}
                </span>
              </div>
              {logo.name}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
