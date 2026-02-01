"use client"

import React from "react"
import { motion } from "motion/react"

const transition = { type: "spring" as const, mass: 0.5, damping: 11.5, stiffness: 100, restDelta: 0.001, restSpeed: 0.001 }

export const MenuItem = ({ setActive, active, item, children }: { setActive: (item: string) => void; active: string | null; item: string; children?: React.ReactNode }) => (
  <div onMouseEnter={() => setActive(item)} className="relative">
    <motion.p transition={{ duration: 0.3 }} className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white">{item}</motion.p>
    {active !== null && (
      <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={transition}>
        {active === item && (
          <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
            <motion.div transition={transition} layoutId="active" className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
              <motion.div layout className="w-max h-full p-4">{children}</motion.div>
            </motion.div>
          </div>
        )}
      </motion.div>
    )}
  </div>
)

export const Menu = ({ setActive, children }: { setActive: (item: string | null) => void; children: React.ReactNode }) => (
  <nav onMouseLeave={() => setActive(null)} className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6">{children}</nav>
)

export const ProductItem = ({ title, description, href, src }: { title: string; description: string; href: string; src: string }) => (
  <a href={href} className="flex space-x-2">
    <img src={src} width={140} height={70} alt={title} className="shrink-0 rounded-md shadow-2xl" />
    <div><h4 className="text-xl font-bold mb-1 text-black dark:text-white">{title}</h4><p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">{description}</p></div>
  </a>
)

export const HoveredLink = ({ children, ...rest }: any) => <a {...rest} className="text-neutral-700 dark:text-neutral-200 hover:text-black">{children}</a>

export interface AceternityNavbarMenuProps { className?: string }

export default function AceternityNavbarMenuWrapper({ className }: AceternityNavbarMenuProps) {
  const [active, setActive] = React.useState<string | null>(null)
  return (
    <div className={`relative w-full flex items-center justify-center ${className || ""}`}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm"><HoveredLink href="#">Web Development</HoveredLink><HoveredLink href="#">Interface Design</HoveredLink><HoveredLink href="#">SEO Optimization</HoveredLink></div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem title="Algochurn" description="Prep for tech interviews" href="#" src="https://assets.aceternity.com/demos/algochurn.webp" />
            <ProductItem title="Tailwind Master Kit" description="Production-ready Tailwind components" href="#" src="https://assets.aceternity.com/demos/tailwindmasterkit.webp" />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm"><HoveredLink href="#">Hobby</HoveredLink><HoveredLink href="#">Individual</HoveredLink><HoveredLink href="#">Team</HoveredLink></div>
        </MenuItem>
      </Menu>
    </div>
  )
}
