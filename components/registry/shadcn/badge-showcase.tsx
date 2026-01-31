'use client'

import { cn } from '@/lib/utils/cn'

interface BadgeShowcaseProps {
  className?: string
  title?: string
  description?: string
}

const badgeVariants = [
  {
    name: 'Default',
    label: 'Badge',
    classes:
      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  {
    name: 'Secondary',
    label: 'Secondary',
    classes:
      'bg-neutral-800 text-neutral-300 border-neutral-700',
  },
  {
    name: 'Outline',
    label: 'Outline',
    classes:
      'bg-transparent text-neutral-300 border-neutral-600',
  },
  {
    name: 'Destructive',
    label: 'Destructive',
    classes:
      'bg-red-500/10 text-red-400 border-red-500/20',
  },
  {
    name: 'Success',
    label: 'Success',
    classes:
      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    name: 'Warning',
    label: 'Warning',
    classes:
      'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
]

const useCases = [
  {
    title: 'Feature Announcement',
    badges: [
      { label: 'New', classes: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
      { label: 'v2.0', classes: 'bg-neutral-800 text-neutral-300 border-neutral-700' },
    ],
    description: 'Introducing our redesigned dashboard with real-time collaboration features.',
  },
  {
    title: 'System Status',
    badges: [
      { label: 'Operational', classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { label: 'API', classes: 'bg-neutral-800 text-neutral-300 border-neutral-700' },
    ],
    description: 'All systems are running normally. Last incident resolved 14 days ago.',
  },
  {
    title: 'Security Alert',
    badges: [
      { label: 'Critical', classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
      { label: 'Action Required', classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    ],
    description: 'Please update your password to comply with new security requirements.',
  },
]

export default function BadgeShowcase({
  className,
  title = 'Badge Variants',
  description = 'Badges are used to highlight status, categories, or metadata across your interface.',
}: BadgeShowcaseProps) {
  return (
    <div className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="space-y-10">
          {/* All Variants */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Variants
            </h3>
            <div className="flex flex-wrap gap-3">
              {badgeVariants.map((badge) => (
                <div key={badge.name} className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
                      badge.classes
                    )}
                  >
                    {badge.label}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Sizes
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-400">
                Small
              </span>
              <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                Default
              </span>
              <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
                Large
              </span>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              In Context
            </h3>
            <div className="space-y-4">
              {useCases.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">
                        {item.title}
                      </h4>
                      {item.badges.map((badge, j) => (
                        <span
                          key={j}
                          className={cn(
                            'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium',
                            badge.classes
                          )}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1.5 text-sm text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
