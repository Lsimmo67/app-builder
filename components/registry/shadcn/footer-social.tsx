'use client'

import { cn } from '@/lib/utils/cn'
import { Separator } from '@/components/ui/separator'
import { Github, Twitter, Linkedin, Youtube } from 'lucide-react'

interface ShadcnFooterSocialProps {
  brandName?: string
  description?: string
  links?: { label: string; href: string }[]
  socialLinks?: { platform: string; href: string }[]
  copyright?: string
  className?: string
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
}

export default function ShadcnFooterSocial({
  brandName = 'Acme Inc',
  description = 'Building better tools for the modern web.',
  links = [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
  socialLinks = [
    { platform: 'twitter', href: '#' },
    { platform: 'github', href: '#' },
    { platform: 'linkedin', href: '#' },
    { platform: 'youtube', href: '#' },
  ],
  copyright = '2024 Acme Inc. All rights reserved.',
  className,
}: ShadcnFooterSocialProps) {
  return (
    <footer className={cn('bg-background border-t', className)}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">{brandName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => {
              const Icon = socialIcons[link.platform] || Github
              return (
                <a
                  key={index}
                  href={link.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label={link.platform}
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <nav className="flex flex-wrap items-center justify-center gap-4">
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
          <p className="text-sm text-muted-foreground">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
