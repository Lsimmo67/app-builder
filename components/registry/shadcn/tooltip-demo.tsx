'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface TooltipDemoProps {
  className?: string
  title?: string
  description?: string
}

interface TooltipItem {
  label: string
  tooltip: string
  icon: string
}

const tooltipItems: TooltipItem[] = [
  {
    label: 'Save',
    tooltip: 'Save your progress (Ctrl+S)',
    icon: 'M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4z',
  },
  {
    label: 'Share',
    tooltip: 'Share with your team',
    icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
  },
  {
    label: 'Delete',
    tooltip: 'Move to trash',
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
  },
  {
    label: 'Settings',
    tooltip: 'Open preferences',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  },
]

function Tooltip({
  children,
  text,
  position = 'top',
}: {
  children: React.ReactNode
  text: string
  position?: 'top' | 'bottom'
}) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={cn(
            'absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-lg',
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          {text}
          <div
            className={cn(
              'absolute left-1/2 -translate-x-1/2 border-[5px] border-transparent',
              position === 'top'
                ? 'top-full border-t-white'
                : 'bottom-full border-b-white'
            )}
          />
        </div>
      )}
    </div>
  )
}

export default function TooltipDemo({
  className,
  title = 'Tooltips',
  description = 'Tooltips provide additional context when hovering over interactive elements in the interface.',
}: TooltipDemoProps) {
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
          {/* Icon buttons with tooltips */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Icon Button Tooltips
            </h3>
            <div className="flex flex-wrap gap-3">
              {tooltipItems.map((item) => (
                <Tooltip key={item.label} text={item.tooltip}>
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800/50 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Text buttons with tooltips */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Button Tooltips
            </h3>
            <div className="flex flex-wrap gap-3">
              <Tooltip text="Creates a new project in your workspace">
                <button className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition-colors hover:bg-indigo-500">
                  New Project
                </button>
              </Tooltip>
              <Tooltip text="Import from GitHub, GitLab, or Bitbucket">
                <button className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-700 bg-transparent px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800">
                  Import Repository
                </button>
              </Tooltip>
              <Tooltip text="Browse pre-built starter templates">
                <button className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-700 bg-transparent px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800">
                  Templates
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Bottom tooltips */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Bottom Position
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Home', 'Dashboard', 'Analytics', 'Settings'].map((label) => (
                <Tooltip
                  key={label}
                  text={`Go to ${label}`}
                  position="bottom"
                >
                  <button className="inline-flex h-10 items-center justify-center rounded-lg bg-neutral-800/50 px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white">
                    {label}
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Inline text tooltips */}
          <div>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
              Inline Text
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              Our platform supports{' '}
              <Tooltip text="Server-Side Rendering for faster initial loads">
                <span className="cursor-help border-b border-dashed border-neutral-600 text-neutral-200">
                  SSR
                </span>
              </Tooltip>
              ,{' '}
              <Tooltip text="Static Site Generation for optimal performance">
                <span className="cursor-help border-b border-dashed border-neutral-600 text-neutral-200">
                  SSG
                </span>
              </Tooltip>
              , and{' '}
              <Tooltip text="Incremental Static Regeneration for dynamic content">
                <span className="cursor-help border-b border-dashed border-neutral-600 text-neutral-200">
                  ISR
                </span>
              </Tooltip>{' '}
              rendering strategies out of the box.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
