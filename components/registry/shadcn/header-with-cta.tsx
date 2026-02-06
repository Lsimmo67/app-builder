'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnHeaderWithCtaProps {
  brandName?: string
  navLinks?: { label: string; href: string }[]
  loginText?: string
  ctaText?: string
  className?: string
}

export default function ShadcnHeaderWithCta({
  brandName = 'Acme Inc',
  navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ],
  loginText = 'Log In',
  ctaText = 'Start Free Trial',
  className,
}: ShadcnHeaderWithCtaProps) {
  return (
    <header className={cn('border-b bg-background', className)}>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
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
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">{loginText}</Button>
          <Button size="sm">{ctaText}</Button>
        </div>
      </div>
    </header>
  )
}
