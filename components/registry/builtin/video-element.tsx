'use client'

import { cn } from '@/lib/utils/cn'

interface VideoElementProps {
  className?: string
  style?: React.CSSProperties
  src?: string
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
}

export default function VideoElement({
  className,
  style,
  src = '',
  poster,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
}: VideoElementProps) {
  if (!src) {
    return (
      <div
        className={cn('bg-muted flex items-center justify-center text-muted-foreground rounded-lg', className)}
        style={{ width: '100%', height: '300px', ...style }}
      >
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">Video</p>
          <p className="text-xs mt-1">Add a video URL in settings</p>
        </div>
      </div>
    )
  }
  return (
    <video
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      className={cn('w-full', className)}
      style={style}
    />
  )
}
