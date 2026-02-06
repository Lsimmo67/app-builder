'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface ShadcnHeaderMegaMenuProps {
  brandName?: string
  menuItems?: {
    label: string
    href?: string
    children?: { label: string; description: string; href: string }[]
  }[]
  ctaText?: string
  className?: string
}

export default function ShadcnHeaderMegaMenu({
  brandName = 'Acme Inc',
  menuItems = [
    {
      label: 'Products',
      children: [
        { label: 'Analytics', description: 'Measure and optimize performance', href: '#analytics' },
        { label: 'Automation', description: 'Automate your workflows', href: '#automation' },
        { label: 'Security', description: 'Enterprise-grade protection', href: '#security' },
      ],
    },
    {
      label: 'Solutions',
      children: [
        { label: 'For Startups', description: 'Get off the ground quickly', href: '#startups' },
        { label: 'For Enterprise', description: 'Scale with confidence', href: '#enterprise' },
        { label: 'For Agencies', description: 'Manage client projects', href: '#agencies' },
      ],
    },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ],
  ctaText = 'Get Started',
  className,
}: ShadcnHeaderMegaMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <header className={cn('border-b bg-background relative', className)}>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-bold text-foreground">
            {brandName}
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {item.children ? (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                )}
                {item.children && openMenu === item.label && (
                  <div className="absolute top-full left-0 w-[320px] rounded-lg border bg-background p-4 shadow-lg z-50">
                    <div className="space-y-1">
                      {item.children.map((child, ci) => (
                        <a
                          key={ci}
                          href={child.href}
                          className="block rounded-md p-3 hover:bg-muted transition-colors"
                        >
                          <div className="text-sm font-medium text-foreground">{child.label}</div>
                          <div className="text-sm text-muted-foreground">{child.description}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <Button size="sm">{ctaText}</Button>
      </div>
    </header>
  )
}
