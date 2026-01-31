'use client'

import { cn } from '@/lib/utils/cn'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from 'framer-motion'
import { useState } from 'react'

interface NavItem {
  name: string
  link: string
  icon?: React.ReactNode
}

interface FloatingNavbarProps {
  className?: string
  navItems?: NavItem[]
  brandName?: string
}

const defaultNavItems: NavItem[] = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#about' },
  { name: 'Features', link: '#features' },
  { name: 'Pricing', link: '#pricing' },
  { name: 'Contact', link: '#contact' },
]

export default function FloatingNavbar({
  className,
  navItems = defaultNavItems,
  brandName = 'Acme',
}: FloatingNavbarProps) {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (typeof current === 'number') {
      const direction = current - lastScrollY

      if (current < 50) {
        setVisible(true)
      } else if (direction < 0) {
        setVisible(true)
      } else {
        setVisible(false)
      }

      setLastScrollY(current)
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-4 z-[5000] mx-auto flex max-w-fit items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-black/80 px-8 py-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-md',
          className
        )}
      >
        <span className="mr-4 text-sm font-bold text-white">{brandName}</span>

        {navItems.map((item, i) => (
          <a
            key={i}
            href={item.link}
            className={cn(
              'relative flex items-center gap-1 px-3 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-200'
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}

        <button className="ml-2 rounded-full border border-white/[0.15] bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20">
          Sign In
        </button>
      </motion.nav>
    </AnimatePresence>
  )
}
