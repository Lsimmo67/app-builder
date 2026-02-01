"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

export interface DropdownMenuItemData {
  label: string
  shortcut?: string
  disabled?: boolean
  separator?: boolean
}

export interface ShadcnDropdownMenuProps {
  items?: DropdownMenuItemData[]
  trigger?: string
  className?: string
}

export default function ShadcnDropdownMenu({
  items = [
    { label: "Profile", shortcut: "Shift+P" },
    { label: "Billing", shortcut: "Ctrl+B" },
    { label: "Settings", shortcut: "Ctrl+S" },
    { label: "", separator: true },
    { label: "Log out", shortcut: "Ctrl+Q" },
  ],
  trigger = "Open Menu",
  className,
}: ShadcnDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn(className)}>
          {trigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map((item, index) =>
          item.separator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem key={index} disabled={item.disabled}>
              {item.label}
              {item.shortcut && (
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
