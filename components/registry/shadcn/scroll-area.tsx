"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils/cn"

export interface ShadcnScrollAreaProps {
  height?: string
  content?: string
  className?: string
}

export default function ShadcnScrollArea({
  height = "200px",
  content = "Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't help laughing at the jokes. They were that good.\n\nEventually, the king summoned Jokester to his court. \"You've been leaving jokes all over the castle,\" the king said, trying to look stern but barely holding back a smile. \"I want you to stop immediately.\"\n\nJokester bowed low. \"Your Majesty, I'm afraid I can't do that. You see, the castle needs laughter like flowers need sunshine. Without my jokes, the walls would weep and the floors would groan.\"\n\nThe king considered this for a moment. \"Very well,\" he said. \"But from now on, you're the Official Court Jester. And I expect a new joke every morning with my breakfast.\"\n\nAnd so it was. Jokester became the most beloved figure in the kingdom, spreading laughter wherever he went.",
  className,
}: ShadcnScrollAreaProps) {
  return (
    <ScrollArea
      className={cn("w-full rounded-md border p-4", className)}
      style={{ height }}
    >
      <div className="text-sm">
        {content.split("\n").map((paragraph, i) => (
          <p key={i} className={cn(i > 0 && "mt-4")}>
            {paragraph}
          </p>
        ))}
      </div>
    </ScrollArea>
  )
}
