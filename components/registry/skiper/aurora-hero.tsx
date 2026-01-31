'use client'

import { cn } from '@/lib/utils/cn'

interface AuroraHeroProps {
  className?: string
  headline?: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
}

export default function AuroraHero({
  className,
  headline = 'Experience the Aurora',
  subtitle = 'Immerse yourself in a breathtaking display of animated light, inspired by the beauty of the northern lights.',
  ctaText = 'Explore Now',
  onCtaClick,
}: AuroraHeroProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[600px] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Aurora layers */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="aurora-layer absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, transparent 30%, #22d3ee 50%, transparent 70%)',
            animation: 'auroraShift1 8s ease-in-out infinite',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="aurora-layer absolute inset-0 opacity-25"
          style={{
            background: 'linear-gradient(225deg, transparent 30%, #a78bfa 50%, transparent 70%)',
            animation: 'auroraShift2 10s ease-in-out infinite',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="aurora-layer absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(315deg, transparent 30%, #34d399 50%, transparent 70%)',
            animation: 'auroraShift3 12s ease-in-out infinite',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="aurora-layer absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(45deg, transparent 20%, #f472b6 50%, transparent 80%)',
            animation: 'auroraShift4 9s ease-in-out infinite',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-zinc-950/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-300">
          {subtitle}
        </p>
        <button
          onClick={onCtaClick}
          className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10"
        >
          {ctaText}
        </button>
      </div>

      <style jsx>{`
        @keyframes auroraShift1 {
          0%, 100% { transform: translateX(-20%) translateY(-10%) rotate(0deg); }
          50% { transform: translateX(20%) translateY(10%) rotate(10deg); }
        }
        @keyframes auroraShift2 {
          0%, 100% { transform: translateX(20%) translateY(10%) rotate(0deg); }
          50% { transform: translateX(-30%) translateY(-15%) rotate(-15deg); }
        }
        @keyframes auroraShift3 {
          0%, 100% { transform: translateX(10%) translateY(20%) rotate(5deg); }
          50% { transform: translateX(-20%) translateY(-20%) rotate(-10deg); }
        }
        @keyframes auroraShift4 {
          0%, 100% { transform: translateX(-15%) translateY(-20%) rotate(-5deg); }
          50% { transform: translateX(25%) translateY(15%) rotate(15deg); }
        }
      `}</style>
    </section>
  )
}
