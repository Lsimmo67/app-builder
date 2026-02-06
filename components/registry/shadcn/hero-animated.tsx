'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnHeroAnimatedProps {
  headline?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  className?: string
}

export default function ShadcnHeroAnimated({
  headline = 'Welcome to the future of design',
  description = 'Build stunning interfaces with ease. Our tools help you bring ideas to life faster than ever before.',
  primaryCta = 'Get Started',
  secondaryCta = 'Learn More',
  className,
}: ShadcnHeroAnimatedProps) {
  return (
    <section className={cn('py-20 px-4 md:py-32 overflow-hidden', className)}>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-animate-1 { animation: heroFadeUp 0.8s ease-out both; }
        .hero-animate-2 { animation: heroFadeUp 0.8s ease-out 0.2s both; }
        .hero-animate-3 { animation: heroFadeUp 0.8s ease-out 0.4s both; }
      `}</style>
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="hero-animate-1 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {headline}
        </h1>
        <p className="hero-animate-2 mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
        <div className="hero-animate-3 mt-10 flex items-center justify-center gap-4">
          <Button size="lg">{primaryCta}</Button>
          <Button variant="outline" size="lg">{secondaryCta}</Button>
        </div>
      </div>
    </section>
  )
}
