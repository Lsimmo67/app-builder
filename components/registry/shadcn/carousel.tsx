"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"

export interface CarouselItemData {
  title: string
  description: string
  image?: string
}

export interface ShadcnCarouselProps {
  items?: CarouselItemData[]
  autoplay?: boolean
  loop?: boolean
  className?: string
}

export default function ShadcnCarousel({
  items = [
    { title: "Slide 1", description: "First slide description" },
    { title: "Slide 2", description: "Second slide description" },
    { title: "Slide 3", description: "Third slide description" },
    { title: "Slide 4", description: "Fourth slide description" },
    { title: "Slide 5", description: "Fifth slide description" },
  ],
  autoplay = false,
  loop = false,
  className,
}: ShadcnCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop,
      }}
      className={cn("w-full max-w-sm", className)}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="mb-4 h-32 w-full rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  )}
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
