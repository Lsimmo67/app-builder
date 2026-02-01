'use client'

import { cn } from '@/lib/utils/cn'

interface ParallaxLayersProps {
  className?: string
  style?: React.CSSProperties
}

const layers = [
  { color: 'from-indigo-900/30 to-transparent', speed: '20s', size: 'h-64 w-64', blur: 'blur-3xl', top: '20%', left: '10%' },
  { color: 'from-purple-900/40 to-transparent', speed: '15s', size: 'h-48 w-48', blur: 'blur-2xl', top: '45%', left: '40%' },
  { color: 'from-pink-900/30 to-transparent', speed: '10s', size: 'h-32 w-32', blur: 'blur-xl', top: '70%', left: '70%' },
]

const layerLabels = ['Background', 'Midground', 'Foreground']

export default function ParallaxLayers({ className, style }: ParallaxLayersProps) {
  return (
    <div className={cn('relative w-full py-32 px-6 overflow-hidden', className)} style={style}>
      {layers.map((layer, i) => (
        <div
          key={i}
          className={cn(
            'absolute rounded-full bg-gradient-to-br',
            layer.color, layer.size, layer.blur,
            'animate-[parallaxFloat_linear_infinite]'
          )}
          style={{ animationDuration: layer.speed, top: layer.top, left: layer.left }}
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes parallaxFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(15px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-40px) translateX(5px); }
        }
      ` }} />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-5xl font-bold tracking-tight text-white">Multi-Layer Parallax</h2>
        <p className="mt-4 text-lg text-neutral-400">
          Layered depth creates an immersive sense of dimension as elements move at different speeds.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {layerLabels.map((label, i) => (
            <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm p-4">
              <p className="text-sm font-semibold text-white">Layer {i + 1}</p>
              <p className="text-xs text-neutral-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
