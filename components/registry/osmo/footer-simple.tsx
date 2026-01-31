'use client'

import { cn } from '@/lib/utils/cn'

interface FooterLink {
  label: string
  href?: string
}

interface Props {
  copyright?: string
  links?: FooterLink[]
  className?: string
}

const defaultLinks: FooterLink[] = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Status', href: '#' },
]

export default function FooterSimple({
  copyright = `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
  links = defaultLinks,
  className,
}: Props) {
  return (
    <footer
      className={cn(
        'border-t border-border bg-background px-6 py-8 md:px-12 lg:px-24',
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">{copyright}</p>
        <nav className="flex flex-wrap items-center gap-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href || '#'}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
