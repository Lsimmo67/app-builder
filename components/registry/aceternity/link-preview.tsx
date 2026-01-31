'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface LinkPreviewItem {
  text: string
  url: string
  previewTitle: string
  previewDescription: string
  previewGradient: string
}

interface LinkPreviewProps {
  className?: string
  links?: LinkPreviewItem[]
  content?: string
}

const defaultLinks: LinkPreviewItem[] = [
  {
    text: 'Framer Motion',
    url: '#',
    previewTitle: 'Framer Motion',
    previewDescription: 'A production-ready motion library for React. Create animations and interactions with simple declarative syntax.',
    previewGradient: 'from-purple-500/30 to-pink-500/30',
  },
  {
    text: 'Tailwind CSS',
    url: '#',
    previewTitle: 'Tailwind CSS',
    previewDescription: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    previewGradient: 'from-cyan-500/30 to-blue-500/30',
  },
  {
    text: 'Next.js',
    url: '#',
    previewTitle: 'Next.js',
    previewDescription: 'The React framework for the web. Build full-stack web applications with the power of React components.',
    previewGradient: 'from-white/20 to-neutral-500/20',
  },
]

function PreviewLink({
  link,
}: {
  link: LinkPreviewItem
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={link.url}
        className="relative inline-block font-semibold text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-300/50"
      >
        {link.text}
      </a>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="absolute -top-2 left-1/2 z-50 w-72 -translate-x-1/2 -translate-y-full"
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-2xl">
              {/* Preview image area with gradient */}
              <div
                className={cn(
                  'flex h-32 items-center justify-center bg-gradient-to-br',
                  link.previewGradient
                )}
              >
                <span className="text-2xl font-bold text-white/80">
                  {link.previewTitle.charAt(0)}
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-white">
                  {link.previewTitle}
                </h4>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-400">
                  {link.previewDescription}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  <span>{link.url === '#' ? 'example.com' : new URL(link.url).hostname}</span>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-neutral-950" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

export default function LinkPreview({
  className,
  links = defaultLinks,
  content = 'We built this project using powerful modern tools. Our animations are powered by',
}: LinkPreviewProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center px-4 py-20',
        className
      )}
    >
      <div className="mx-auto max-w-2xl">
        <p className="text-lg leading-loose text-neutral-300 md:text-xl">
          {content}{' '}
          {links.map((link, i) => (
            <span key={i}>
              <PreviewLink link={link} />
              {i < links.length - 2 && ', '}
              {i === links.length - 2 && ' and '}
              {i === links.length - 1 && '.'}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
