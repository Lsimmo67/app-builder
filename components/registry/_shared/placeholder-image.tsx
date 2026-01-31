import { cn } from '@/lib/utils/cn'

interface PlaceholderImageProps {
  width?: number
  height?: number
  text?: string
  className?: string
}

export function PlaceholderImage({
  width = 800,
  height = 600,
  text = `${width}x${height}`,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        'bg-muted/50 flex items-center justify-center rounded-lg border border-dashed',
        className
      )}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <span className="text-muted-foreground text-sm">{text}</span>
    </div>
  )
}

export default PlaceholderImage
