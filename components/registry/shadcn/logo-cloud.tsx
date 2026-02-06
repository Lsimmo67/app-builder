'use client'

import { cn } from '@/lib/utils/cn'

interface ShadcnLogoCloudProps {
  headline?: string
  logos?: { name: string; src?: string }[]
  className?: string
}

export default function ShadcnLogoCloud({
  headline = 'Trusted by leading companies',
  logos = [
    { name: 'Acme Corp', src: '' },
    { name: 'TechFlow', src: '' },
    { name: 'Quantum', src: '' },
    { name: 'Vertex', src: '' },
    { name: 'Pinnacle', src: '' },
    { name: 'Nexus', src: '' },
  ],
  className,
}: ShadcnLogoCloudProps) {
  return (
    <section className={cn('py-12 px-4 md:py-16', className)}>
      <div className="mx-auto max-w-6xl">
        {headline && (
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">{headline}</p>
        )}
        <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              {logo.src ? (
                <img src={logo.src} alt={logo.name} className="h-8 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
              ) : (
                <div className="flex h-12 items-center justify-center rounded-lg bg-muted px-6 text-sm font-semibold text-muted-foreground">
                  {logo.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
