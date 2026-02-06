'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnHeaderDefaultProps {
  brandName?: string
  navLinks?: { label: string; href: string }[]
  ctaText?: string
  className?: string
}

export default function ShadcnHeaderDefault({
  brandName = 'Acme Inc',
  navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
  ],
  ctaText = 'Get Started',
  className,
}: ShadcnHeaderDefaultProps) {
  return (
    <header className={cn('border-b bg-background', className)}>
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
        <Button size="sm">{ctaText}</Button>
      </div>
    </header>
  )
}
