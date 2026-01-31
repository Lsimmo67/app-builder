'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface Tab {
  id: string
  label: string
  title: string
  description: string
  features: string[]
  icon: string
}

interface TabsSectionProps {
  className?: string
  sectionTitle?: string
  sectionDescription?: string
  tabs?: Tab[]
}

const defaultTabs: Tab[] = [
  {
    id: 'design',
    label: 'Design',
    title: 'Intuitive Design Tools',
    description:
      'Create stunning interfaces with our drag-and-drop builder, design tokens, and component library. Export production-ready code with a single click.',
    features: [
      'Visual drag-and-drop editor',
      'Auto-layout and responsive grids',
      'Design token management',
      'One-click code export',
    ],
    icon: 'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z',
  },
  {
    id: 'develop',
    label: 'Develop',
    title: 'Developer-First Workflow',
    description:
      'Write code in your favorite framework with hot reload, type safety, and integrated debugging tools. Built for speed and productivity.',
    features: [
      'TypeScript-first architecture',
      'Hot module replacement',
      'Integrated terminal and debugger',
      'Git-based version control',
    ],
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    title: 'Seamless Deployment',
    description:
      'Push to production with confidence using preview deployments, rollbacks, and edge-optimized hosting. Zero downtime, every time.',
    features: [
      'One-click preview deployments',
      'Instant global CDN distribution',
      'Automatic rollbacks on failure',
      'Environment variable management',
    ],
    icon: 'M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z',
  },
  {
    id: 'monitor',
    label: 'Monitor',
    title: 'Real-Time Monitoring',
    description:
      'Track performance, errors, and user behavior with comprehensive observability. Get alerted before issues impact your users.',
    features: [
      'Real-time error tracking',
      'Performance metrics dashboard',
      'Custom alert thresholds',
      'User session replay',
    ],
    icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6',
  },
]

export default function TabsSection({
  className,
  sectionTitle = 'How It Works',
  sectionDescription = 'A complete workflow from design to monitoring, built for modern product teams.',
  tabs = defaultTabs,
}: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '')

  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  return (
    <div className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Tab navigation */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-neutral-800 bg-neutral-900/50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative rounded-lg px-5 py-2.5 text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-neutral-400 hover:text-neutral-200'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {active && (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 sm:p-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              {/* Icon */}
              <div className="shrink-0">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={active.icon}
                    />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                <p className="mt-3 text-neutral-400 leading-relaxed">
                  {active.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {active.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                        <svg
                          className="h-3 w-3 text-indigo-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-6 text-sm font-medium text-white transition-colors hover:bg-indigo-500">
                  Get Started with {active.label}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
