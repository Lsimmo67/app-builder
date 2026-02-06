'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnHeaderCenteredProps {
  brandName?: string
  navLinks?: { label: string; href: string }[]
  ctaText?: string
  className?: string
}

export default function ShadcnHeaderCentered({
  brandName = 'Acme Inc',
  navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaText = 'Sign Up',
  className,
}: ShadcnHeaderCenteredProps) {
  return (
    <header className={cn('border-b bg-background', className)}>
      <div className="mx-auto max-w-6xl flex flex-col items-center px-4 py-4 gap-4 md:flex-row md:justify-between">
        <a href="/" className="text-xl font-bold text-foreground">
          {brandName}
        </a>
        <nav className="flex items-center gap-6">
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
        <Button size="sm">{ctaText}</Button>
      </div>
    </header>
  )
}
