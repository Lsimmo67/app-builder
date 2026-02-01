'use client'

import { cn } from '@/lib/utils/cn'

interface InfiniteScrollProps {
  className?: string
  style?: React.CSSProperties
}

const images = Array.from({ length: 8 }, (_, i) => ({
  label: 'Project ' + (i + 1),
  hue: i * 45,
}))

export default function InfiniteScroll({ className, style }: InfiniteScrollProps) {
  return (
    <div className={cn('w-full py-20 px-6 overflow-hidden', className)} style={style}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">Infinite Scroll Gallery</h2>
        <p className="mb-12 text-center text-neutral-400">A seamless looping gallery that never ends</p>
        {[0, 1].map((row) => (
          <div key={row} className="mb-4 flex gap-4 overflow-hidden">
            <div
              className={cn(
                'flex shrink-0 gap-4',
                row === 0 ? 'animate-[scrollLeft_30s_linear_infinite]' : 'animate-[scrollRight_30s_linear_infinite]'
              )}
            >
              {[...images, ...images].map((img, i) => (
                <div
                  key={i}
                  className="h-44 w-64 shrink-0 rounded-xl border border-neutral-800 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, hsl(' + img.hue + ', 60%, 15%), hsl(' + (img.hue + 30) + ', 60%, 8%))',
                  }}
                >
                  <span className="text-sm font-medium text-neutral-400">{img.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        ` }} />
      </div>
    </div>
  )
}
