"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface BreadcrumbItemData {
  label: string
  href?: string
}

export interface ShadcnBreadcrumbProps {
  items?: BreadcrumbItemData[]
  separator?: "chevron" | "slash"
  className?: string
}

export default function ShadcnBreadcrumb({
  items = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ],
  separator = "chevron",
  className,
}: ShadcnBreadcrumbProps) {
  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <BreadcrumbItem key={index}>
              {index > 0 && (
                <BreadcrumbSeparator>
                  {separator === "slash" ? <Slash className="h-4 w-4" /> : undefined}
                </BreadcrumbSeparator>
              )}
              {isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href || "#"}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
