'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface ShadcnFooterWithNewsletterProps {
  brandName?: string
  description?: string
  columns?: { title: string; links: { label: string; href: string }[] }[]
  newsletterHeadline?: string
  newsletterDescription?: string
  placeholder?: string
  buttonText?: string
  copyright?: string
  className?: string
}

export default function ShadcnFooterWithNewsletter({
  brandName = 'Acme Inc',
  description = 'Making the web a better place.',
  columns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
  ],
  newsletterHeadline = 'Stay up to date',
  newsletterDescription = 'Get the latest news and updates.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  copyright = '2024 Acme Inc. All rights reserved.',
  className,
}: ShadcnFooterWithNewsletterProps) {
  return (
    <footer className={cn('bg-background border-t', className)}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-foreground">{brandName}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-foreground">{newsletterHeadline}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{newsletterDescription}</p>
              <div className="mt-3 flex gap-2">
                <Input type="email" placeholder={placeholder} className="max-w-xs" />
                <Button size="sm">{buttonText}</Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-8 sm:grid-cols-3">
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
        </div>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground text-center">{copyright}</p>
      </div>
    </footer>
  )
}
