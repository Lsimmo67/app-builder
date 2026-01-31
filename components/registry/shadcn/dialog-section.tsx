'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface DialogSectionProps {
  className?: string
  title?: string
  description?: string
  dialogTitle?: string
  dialogDescription?: string
  dialogContent?: string
  buttonLabel?: string
}

export default function DialogSection({
  className,
  title = 'Dialog Component',
  description = 'A modal dialog that interrupts the user with important content and expects a response.',
  dialogTitle = 'Are you sure?',
  dialogDescription = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  dialogContent,
  buttonLabel = 'Open Dialog',
}: DialogSectionProps) {
  const [open, setOpen] = useState(false)

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

        <div className="flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-8 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            {buttonLabel}
          </button>
        </div>

        {/* Backdrop */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Dialog */}
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl shadow-black/50">
              <h3 className="text-lg font-semibold text-white">
                {dialogTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {dialogContent ?? dialogDescription}
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-700 bg-transparent px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-500"
                >
                  Confirm
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 rounded-md p-1 text-neutral-500 transition-colors hover:text-neutral-300"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
