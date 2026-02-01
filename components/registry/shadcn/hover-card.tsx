"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface ShadcnHoverCardProps {
  trigger?: string
  content?: string
  avatar?: string
  name?: string
  description?: string
  className?: string
}

export default function ShadcnHoverCard({
  trigger = "@nextjs",
  content = "The React Framework – created and maintained by @vercel.",
  avatar = "https://github.com/vercel.png",
  name = "Next.js",
  description = "The React Framework – created and maintained by @vercel.",
  className,
}: ShadcnHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className={cn("cursor-pointer text-sm font-medium underline underline-offset-4", className)}>
          {trigger}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">
              {description || content}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
