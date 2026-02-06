'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnHeaderTransparentProps {
  brandName?: string
  navLinks?: { label: string; href: string }[]
  ctaText?: string
  className?: string
}

export default function ShadcnHeaderTransparent({
  brandName = 'Acme Inc',
  navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaText = 'Get Started',
  className,
}: ShadcnHeaderTransparentProps) {
  return (
    <header className={cn('absolute top-0 left-0 right-0 z-50', className)}>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
        <a href="/" className="text-xl font-bold text-foreground">
          {brandName}
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button size="sm" variant="outline">{ctaText}</Button>
      </div>
    </header>
  )
}
