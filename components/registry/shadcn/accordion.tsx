"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils/cn"

export interface AccordionItemData {
  title: string
  content: string
}

export interface ShadcnAccordionProps {
  items?: AccordionItemData[]
  type?: "single" | "multiple"
  collapsible?: boolean
  className?: string
}

export default function ShadcnAccordion({
  items = [
    { title: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
    { title: "Is it styled?", content: "Yes. It comes with default styles that match the other components' aesthetic." },
    { title: "Is it animated?", content: "Yes. It's animated by default, but you can disable it if you prefer." },
  ],
  type = "single",
  collapsible = true,
  className,
}: ShadcnAccordionProps) {
  if (type === "single") {
    return (
      <Accordion
        type="single"
        collapsible={collapsible}
        className={cn("w-full", className)}
      >
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )
  }

  return (
    <Accordion type="multiple" className={cn("w-full", className)}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
