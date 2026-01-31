'use client'

import { cn } from '@/lib/utils/cn'

interface MeteorsBgProps {
  className?: string
  children?: React.ReactNode
  meteorCount?: number
  meteorColor?: string
}

export default function MeteorsBg({
  className,
  children,
  meteorCount = 20,
  meteorColor = 'from-slate-500 to-transparent',
}: MeteorsBgProps) {
  const meteors = Array.from({ length: meteorCount }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${1 + Math.random() * 2}s`,
    size: `${100 + Math.random() * 200}px`,
  }))

  return (
    <div
      className={cn(
        'relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-neutral-950',
        className
      )}
    >
      {/* Meteor trails */}
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            'pointer-events-none absolute rotate-[215deg] rounded-full bg-gradient-to-r',
            meteorColor
          )}
          style={{
            top: meteor.top,
            left: meteor.left,
            width: meteor.size,
            height: '1px',
            animation: `meteor-fall ${meteor.duration} linear ${meteor.delay} infinite`,
            opacity: 0,
          }}
        >
          {/* Meteor head glow */}
          <span className="absolute left-0 top-1/2 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-slate-300 shadow-[0_0_6px_2px_rgba(255,255,255,0.3)]" />
        </span>
      ))}

      {/* Subtle radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.9)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {children || (
          <>
            <h2 className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Meteors Background
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-neutral-500 md:text-lg">
              A stunning dark section with animated meteor trails streaking
              across the sky. Perfect for hero sections and dramatic
              call-to-action areas.
            </p>
            <button className="mt-8 rounded-full border border-neutral-700 bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-all hover:border-neutral-500 hover:bg-neutral-800">
              Explore More
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes meteor-fall {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-600px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
