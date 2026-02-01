"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils/cn"

export interface NavMenuItem {
  label: string
  href?: string
  children?: { label: string; href: string; description?: string }[]
}

export interface ShadcnNavigationMenuProps {
  items?: NavMenuItem[]
  className?: string
}

export default function ShadcnNavigationMenu({
  items = [
    {
      label: "Getting Started",
      children: [
        { label: "Introduction", href: "#", description: "Re-usable components built with Radix UI and Tailwind CSS." },
        { label: "Installation", href: "#", description: "How to install dependencies and structure your app." },
        { label: "Typography", href: "#", description: "Styles for headings, paragraphs, lists, etc." },
      ],
    },
    {
      label: "Components",
      children: [
        { label: "Alert Dialog", href: "#", description: "A modal dialog that interrupts the user." },
        { label: "Hover Card", href: "#", description: "For sighted users to preview content." },
        { label: "Progress", href: "#", description: "Displays an indicator showing completion." },
      ],
    },
    { label: "Documentation", href: "#" },
  ],
  className,
}: ShadcnNavigationMenuProps) {
  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList>
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.children && item.children.length > 0 ? (
              <>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <NavigationMenuLink asChild>
                          <a
                            href={child.href || "#"}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {child.label}
                            </div>
                            {child.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {child.description}
                              </p>
                            )}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                href={item.href || "#"}
                className={navigationMenuTriggerStyle()}
              >
                {item.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
