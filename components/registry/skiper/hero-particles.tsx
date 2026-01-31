'use client'

import { cn } from '@/lib/utils/cn'
import { useMemo } from 'react'

interface HeroParticlesProps {
  className?: string
  headline?: string
  subtitle?: string
  particleCount?: number
  particleColor?: string
}

export default function HeroParticles({
  className,
  headline = 'Particle Universe',
  subtitle = 'Floating particles drift gently across the background, creating an ethereal and immersive atmosphere.',
  particleCount = 50,
  particleColor = 'rgba(139, 92, 246, 0.5)',
}: HeroParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.5 + 0.2,
      drift: Math.random() * 100 - 50,
    }))
  }, [particleCount])

  return (
    <section
      className={cn(
        'relative flex min-h-[600px] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: particleColor,
              opacity: p.opacity,
              animation: `particleFloat${p.id % 3} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
          {subtitle}
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          Explore the cosmos
        </div>
      </div>

      <style jsx>{`
        @keyframes particleFloat0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.2); }
          50% { transform: translate(-20px, -80px) scale(0.8); }
          75% { transform: translate(40px, -40px) scale(1.1); }
        }
        @keyframes particleFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-40px, -30px) scale(0.9); }
          50% { transform: translate(30px, -70px) scale(1.3); }
          75% { transform: translate(-20px, -35px) scale(1); }
        }
        @keyframes particleFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-30px, -60px) scale(0.9); }
        }
      `}</style>
    </section>
  )
}
