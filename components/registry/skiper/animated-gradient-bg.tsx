'use client'

import { cn } from '@/lib/utils/cn'

interface AnimatedGradientBgProps {
  className?: string
  headline?: string
  subtitle?: string
  children?: React.ReactNode
}

export default function AnimatedGradientBg({
  className,
  headline = 'Living Gradient',
  subtitle = 'A slowly morphing gradient background that breathes life into any section. The seamless color transitions create a mesmerizing, ever-changing canvas.',
  children,
}: AnimatedGradientBgProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[500px] items-center justify-center overflow-hidden px-6 py-24',
        className
      )}
      style={{
        background: 'linear-gradient(-45deg, #0f172a, #581c87, #1e1b4b, #164e63, #0f172a)',
        backgroundSize: '400% 400%',
        animation: 'morphGradient 15s ease infinite',
      }}
    >
      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px',
      }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {children ?? (
          <>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              {headline}
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg text-white/60">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="rounded-xl bg-white px-8 py-3.5 font-semibold text-zinc-900 transition-all hover:bg-white/90 hover:shadow-lg">
                Get Started
              </button>
              <button className="rounded-xl border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/10">
                Documentation
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes morphGradient {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
