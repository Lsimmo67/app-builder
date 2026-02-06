'use client'

import { cn } from '@/lib/utils/cn'
import { Separator } from '@/components/ui/separator'

interface ShadcnFooterCenteredProps {
  brandName?: string
  links?: { label: string; href: string }[]
  copyright?: string
  className?: string
}

export default function ShadcnFooterCentered({
  brandName = 'Acme Inc',
  links = [
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  copyright = '2024 Acme Inc. All rights reserved.',
  className,
}: ShadcnFooterCenteredProps) {
  return (
    <footer className={cn('bg-background border-t', className)}>
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <h3 className="text-lg font-bold text-foreground">{brandName}</h3>
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground">{copyright}</p>
      </div>
    </footer>
  )
}
