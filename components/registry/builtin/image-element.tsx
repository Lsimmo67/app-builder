'use client'

import { cn } from '@/lib/utils/cn'

interface ImageElementProps {
  className?: string
  style?: React.CSSProperties
  src?: string
  alt?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  width?: string
  height?: string
}

export default function ImageElement({
  className,
  style,
  src = 'https://placehold.co/800x400/e2e8f0/64748b?text=Image',
  alt = 'Image',
  objectFit = 'cover',
  width = '100%',
  height = 'auto',
}: ImageElementProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('', className)}
      style={{ objectFit, width, height, ...style }}
    />
  )
}
