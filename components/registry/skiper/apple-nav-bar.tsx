"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AppleNavChild {
  label: string
  href: string
}

export interface AppleNavItem {
  label: string
  href: string
  children?: AppleNavChild[]
}

export interface SkiperAppleNavBarProps {
  logo?: string
  items?: AppleNavItem[]
  ctaText?: string
  ctaLink?: string
  className?: string
}

const defaultItems: AppleNavItem[] = [
  {
    label: "Products",
    href: "#",
    children: [
      { label: "Product One", href: "#" },
      { label: "Product Two", href: "#" },
      { label: "Product Three", href: "#" },
    ],
  },
  {
    label: "Solutions",
    href: "#",
    children: [
      { label: "Enterprise", href: "#" },
      { label: "Startups", href: "#" },
      { label: "Education", href: "#" },
    ],
  },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
]

export default function SkiperAppleNavBar({
  logo = "Acme",
  items = defaultItems,
  ctaText = "Get Started",
  ctaLink = "#",
  className,
}: SkiperAppleNavBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative w-full border-b border-white/10 bg-black/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="#" className="text-lg font-bold text-white">
          {logo}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() =>
                item.children ? setActiveDropdown(index) : setActiveDropdown(null)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className="relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
                {item.children && (
                  <motion.svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    animate={{
                      rotate: activeDropdown === index ? 180 : 0,
                    }}
                  >
                    <path
                      d="M2.5 4L5 6.5L7.5 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
              </a>

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && activeDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-xl border border-white/10 bg-neutral-900/95 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    {item.children.map((child, childIndex) => (
                      <a
                        key={childIndex}
                        href={child.href}
                        className="block rounded-lg px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href={ctaLink}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90 md:inline-flex"
          >
            {ctaText}
          </motion.a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1 md:hidden"
          >
            <motion.span
              className="h-0.5 w-5 bg-white"
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 3 : 0,
              }}
            />
            <motion.span
              className="h-0.5 w-5 bg-white"
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? -3 : 0,
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="space-y-1 p-4">
              {items.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-base text-white/80 hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                  {item.children?.map((child, ci) => (
                    <a
                      key={ci}
                      href={child.href}
                      className="block rounded-lg px-8 py-2 text-sm text-white/50 hover:bg-white/5"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ))}
              <a
                href={ctaLink}
                className="mt-4 block rounded-full bg-white px-5 py-2.5 text-center text-sm font-medium text-black"
              >
                {ctaText}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
