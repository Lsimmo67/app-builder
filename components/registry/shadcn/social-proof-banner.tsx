'use client'

import { cn } from '@/lib/utils/cn'
import { Star, Users, Download, Award } from 'lucide-react'

interface ShadcnSocialProofBannerProps {
  items?: { value: string; label: string; icon: string }[]
  className?: string
}

const iconMap: Record<string, React.ElementType> = {
  star: Star,
  users: Users,
  download: Download,
  award: Award,
}

export default function ShadcnSocialProofBanner({
  items = [
    { value: '4.9/5', label: 'Average Rating', icon: 'star' },
    { value: '50K+', label: 'Happy Users', icon: 'users' },
    { value: '1M+', label: 'Downloads', icon: 'download' },
    { value: '#1', label: 'Product of the Year', icon: 'award' },
  ],
  className,
}: ShadcnSocialProofBannerProps) {
  return (
    <section className={cn('py-8 px-4 bg-muted/50 border-y', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Star
            return (
              <div key={index} className="flex items-center justify-center gap-3">
                <Icon className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="text-lg font-bold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
