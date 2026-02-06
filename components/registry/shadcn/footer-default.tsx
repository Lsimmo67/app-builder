'use client'

import { cn } from '@/lib/utils/cn'
import { Separator } from '@/components/ui/separator'

interface ShadcnFooterDefaultProps {
  brandName?: string
  description?: string
  columns?: { title: string; links: { label: string; href: string }[] }[]
  copyright?: string
  className?: string
}

export default function ShadcnFooterDefault({
  brandName = 'Acme Inc',
  description = 'Building the future of web development, one component at a time.',
  columns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Changelog', href: '#' },
        { label: 'Documentation', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Community', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Partners', href: '#' },
        { label: 'Status', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ],
  copyright = '2024 Acme Inc. All rights reserved.',
  className,
}: ShadcnFooterDefaultProps) {
  return (
    <footer className={cn('bg-background border-t', className)}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-foreground">{brandName}</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">{description}</p>
          </div>
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="text-sm font-semibold text-foreground">{column.title}</h4>
              <ul className="mt-3 space-y-2">
                {column.links.map((link, li) => (
                  <li key={li}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground text-center">{copyright}</p>
      </div>
    </footer>
  )
}
