'use client'

import { cn } from '@/lib/utils/cn'

interface FooterLink {
  label: string
  href?: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface Props {
  companyName?: string
  companyDescription?: string
  columns?: FooterColumn[]
  copyright?: string
  className?: string
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Integrations', href: '#' },
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
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
]

export default function FooterColumns({
  companyName = 'Acme Inc',
  companyDescription = 'Building the future of web development with modern tools and frameworks that empower teams to ship faster.',
  columns = defaultColumns,
  copyright = `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
  className,
}: Props) {
  return (
    <footer
      className={cn(
        'border-t border-border bg-background px-6 py-16 md:px-12 lg:px-24',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="text-lg font-bold text-foreground">
              {companyName}
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {companyDescription}
            </p>
          </div>

          {/* Link columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href || '#'}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
