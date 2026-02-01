'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface AnimatedModalProps {
  className?: string
  triggerText?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function AnimatedModal({
  className,
  triggerText = 'Open Modal',
  title = 'Welcome to the Future',
  description = 'This is a beautifully animated modal with scale and opacity transitions powered by Framer Motion. Perfect for announcements, confirmations, and interactive content.',
  children,
}: AnimatedModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('flex items-center justify-center py-10', className)}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30"
      >
        <span className="relative z-10">{triggerText}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{
                  type: 'spring' as const,
                  stiffness: 300,
                  damping: 25,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Gradient accent top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-5 rounded-lg p-1 text-neutral-500 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-8">
                  {children || (
                    <>
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: 'spring' as const,
                          stiffness: 200,
                          damping: 15,
                          delay: 0.1,
                        }}
                        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20"
                      >
                        <svg className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-3 text-center text-2xl font-bold text-white"
                      >
                        {title}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 text-center text-sm leading-relaxed text-neutral-400"
                      >
                        {description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="flex gap-3"
                      >
                        <button
                          onClick={() => setIsOpen(false)}
                          className="flex-1 rounded-xl border border-neutral-800 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:border-neutral-700 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
                        >
                          Continue
                        </button>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
