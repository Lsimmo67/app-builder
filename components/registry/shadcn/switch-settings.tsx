'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface SettingOption {
  id: string
  label: string
  description: string
  defaultChecked?: boolean
}

interface SwitchSettingsProps {
  className?: string
  title?: string
  description?: string
  options?: SettingOption[]
}

const defaultOptions: SettingOption[] = [
  {
    id: 'notifications',
    label: 'Push Notifications',
    description: 'Receive push notifications for important updates and activity on your account.',
    defaultChecked: true,
  },
  {
    id: 'emails',
    label: 'Marketing Emails',
    description: 'Get notified about new features, product updates, and promotional offers.',
    defaultChecked: false,
  },
  {
    id: 'analytics',
    label: 'Usage Analytics',
    description: 'Help us improve by sharing anonymous usage data and crash reports.',
    defaultChecked: true,
  },
  {
    id: 'darkmode',
    label: 'Dark Mode',
    description: 'Use dark theme across the application interface for reduced eye strain.',
    defaultChecked: true,
  },
  {
    id: 'twofactor',
    label: 'Two-Factor Authentication',
    description: 'Add an extra layer of security by requiring a second form of verification.',
    defaultChecked: false,
  },
]

export default function SwitchSettings({
  className,
  title = 'Settings',
  description = 'Manage your account preferences and notification settings.',
  options = defaultOptions,
}: SwitchSettingsProps) {
  const [values, setValues] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    options.forEach((opt) => {
      initial[opt.id] = opt.defaultChecked ?? false
    })
    return initial
  })

  const toggle = (id: string) => {
    setValues((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50">
          {options.map((option, i) => (
            <div
              key={option.id}
              className={cn(
                'flex items-center justify-between gap-6 p-6',
                i > 0 && 'border-t border-neutral-800/60'
              )}
            >
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white">
                  {option.label}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {option.description}
                </p>
              </div>

              {/* Toggle switch */}
              <button
                role="switch"
                aria-checked={values[option.id]}
                onClick={() => toggle(option.id)}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                  values[option.id] ? 'bg-indigo-600' : 'bg-neutral-700'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform',
                    values[option.id] ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Changes are saved automatically when you toggle a setting.
        </p>
      </div>
    </div>
  )
}
