"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

export interface CardFooterButton {
  text: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export interface ShadcnCardProps {
  title?: string
  description?: string
  content?: string
  image?: string
  imageAlt?: string
  footerButtons?: CardFooterButton[]
  className?: string
}

export default function ShadcnCard({
  title = "Card Title",
  description = "Card description goes here.",
  content = "This is the card content area. You can place any content here.",
  image,
  imageAlt = "Card image",
  footerButtons = [{ text: "Action", variant: "default" }],
  className,
}: ShadcnCardProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      {image && (
        <div className="overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={imageAlt}
            className="h-48 w-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{content}</p>
        </CardContent>
      )}
      {footerButtons && footerButtons.length > 0 && (
        <CardFooter className="gap-2">
          {footerButtons.map((btn, i) => (
            <Button key={i} variant={btn.variant || "default"}>
              {btn.text}
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
