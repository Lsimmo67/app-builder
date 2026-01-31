'use client'

import { cn } from '@/lib/utils/cn'

interface ButtonSectionProps {
  className?: string
  title?: string
  description?: string
}

const variants = [
  {
    name: 'Default',
    label: 'Primary Action',
    classes: 'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700',
  },
  {
    name: 'Secondary',
    label: 'Secondary Action',
    classes:
      'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:bg-neutral-900',
  },
  {
    name: 'Outline',
    label: 'Outline Action',
    classes:
      'border border-neutral-700 bg-transparent text-neutral-200 hover:bg-neutral-800 active:bg-neutral-900',
  },
  {
    name: 'Ghost',
    label: 'Ghost Action',
    classes:
      'bg-transparent text-neutral-300 hover:bg-neutral-800/60 hover:text-neutral-100 active:bg-neutral-800',
  },
  {
    name: 'Destructive',
    label: 'Delete Item',
    classes: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',
  },
  {
    name: 'Link',
    label: 'Learn More',
    classes:
      'bg-transparent text-indigo-400 underline-offset-4 hover:underline active:text-indigo-300 px-0',
  },
]

const sizes = [
  { name: 'sm', classes: 'h-8 px-3 text-xs', label: 'Small' },
  { name: 'default', classes: 'h-10 px-5 text-sm', label: 'Default' },
  { name: 'lg', classes: 'h-12 px-8 text-base', label: 'Large' },
]

export default function ButtonSection({
  className,
  title = 'Button Variants',
  description = 'A showcase of all available button styles, sizes, and states for your design system.',
}: ButtonSectionProps) {
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

        {/* Variants Grid */}
        <div className="space-y-10">
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Variants
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {variants.map((variant) => (
                <div key={variant.name} className="flex flex-col items-center gap-3">
                  <button
                    className={cn(
                      'inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                      variant.classes
                    )}
                  >
                    {variant.label}
                  </button>
                  <span className="text-xs text-neutral-500">{variant.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Sizes
            </h3>
            <div className="flex flex-wrap items-end gap-4">
              {sizes.map((size) => (
                <div key={size.name} className="flex flex-col items-center gap-3">
                  <button
                    className={cn(
                      'inline-flex items-center justify-center rounded-lg bg-indigo-600 font-medium text-white transition-colors hover:bg-indigo-500',
                      size.classes
                    )}
                  >
                    {size.label}
                  </button>
                  <span className="text-xs text-neutral-500">{size.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              States
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition-colors hover:bg-indigo-500">
                Enabled
              </button>
              <button
                disabled
                className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600/40 px-5 text-sm font-medium text-white/50 cursor-not-allowed"
              >
                Disabled
              </button>
              <button className="inline-flex h-10 items-center gap-2 justify-center rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white">
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Loading
              </button>
              <button className="inline-flex h-10 items-center gap-2 justify-center rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white hover:bg-indigo-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                With Icon
              </button>
            </div>
          </div>

          {/* Icon-only */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Icon Only
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {[
                'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
                'M12 4v16m8-8H4',
                'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
              ].map((d, i) => (
                <button
                  key={i}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-transparent text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={d}
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
