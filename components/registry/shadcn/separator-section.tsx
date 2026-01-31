'use client'

import { cn } from '@/lib/utils/cn'

interface ContentBlock {
  title: string
  description: string
}

interface SeparatorSectionProps {
  className?: string
  title?: string
  description?: string
  blocks?: ContentBlock[]
  separatorStyle?: 'solid' | 'dashed' | 'gradient'
}

const defaultBlocks: ContentBlock[] = [
  {
    title: 'Design Philosophy',
    description:
      'We believe in simplicity and clarity. Every interface element should serve a purpose, reduce cognitive load, and guide users toward their goals with minimal friction.',
  },
  {
    title: 'Engineering Standards',
    description:
      'Our codebase follows strict TypeScript conventions, comprehensive test coverage, and automated CI/CD pipelines. Performance budgets are enforced on every build.',
  },
  {
    title: 'User Experience',
    description:
      'Through continuous research, A/B testing, and iterative design, we ensure that every interaction feels intuitive and every workflow is optimized for productivity.',
  },
  {
    title: 'Team Culture',
    description:
      'We foster a culture of ownership, transparency, and continuous learning. Every team member is empowered to contribute ideas and drive meaningful improvements.',
  },
]

export default function SeparatorSection({
  className,
  title = 'Our Principles',
  description = 'The core values that guide our product decisions and team culture.',
  blocks = defaultBlocks,
  separatorStyle = 'gradient',
}: SeparatorSectionProps) {
  const separatorClasses: Record<string, string> = {
    solid: 'border-t border-neutral-800',
    dashed: 'border-t border-dashed border-neutral-800',
    gradient: '',
  }

  return (
    <div className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="space-y-0">
          {blocks.map((block, i) => (
            <div key={i}>
              {i > 0 && (
                <div className="py-6">
                  {separatorStyle === 'gradient' ? (
                    <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
                  ) : (
                    <div className={separatorClasses[separatorStyle]} />
                  )}
                </div>
              )}
              <div className="py-2">
                <div className="flex items-start gap-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-400">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {block.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal separator demo */}
        <div className="mt-16">
          <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
            Separator Styles
          </h3>
          <div className="space-y-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
            <div>
              <span className="mb-2 block text-xs text-neutral-500">Solid</span>
              <div className="border-t border-neutral-800" />
            </div>
            <div>
              <span className="mb-2 block text-xs text-neutral-500">Dashed</span>
              <div className="border-t border-dashed border-neutral-700" />
            </div>
            <div>
              <span className="mb-2 block text-xs text-neutral-500">Gradient</span>
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
            </div>
            <div>
              <span className="mb-2 block text-xs text-neutral-500">Thick Gradient</span>
              <div className="h-0.5 rounded-full bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
