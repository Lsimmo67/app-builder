'use client'

import { cn } from '@/lib/utils/cn'

interface ShadcnFooterMinimalProps {
  brandName?: string
  links?: { label: string; href: string }[]
  copyright?: string
  className?: string
}

export default function ShadcnFooterMinimal({
  brandName = 'Acme Inc',
  links = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  copyright = '2024 Acme Inc. All rights reserved.',
  className,
}: ShadcnFooterMinimalProps) {
  return (
    <footer className={cn('bg-background border-t', className)}>
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-foreground">{brandName}</span>
          <span className="text-sm text-muted-foreground">{copyright}</span>
        </div>
        <nav className="flex items-center gap-4">
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
      </div>
    </footer>
  )
}
