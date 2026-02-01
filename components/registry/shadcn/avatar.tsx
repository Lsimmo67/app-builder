"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils/cn"

export interface ShadcnAvatarProps {
  src?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
}

const fallbackTextSize = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}

export default function ShadcnAvatar({
  src = "https://github.com/shadcn.png",
  fallback = "CN",
  size = "md",
  className,
}: ShadcnAvatarProps) {
  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src} alt={fallback} />
      <AvatarFallback className={fallbackTextSize[size]}>
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
