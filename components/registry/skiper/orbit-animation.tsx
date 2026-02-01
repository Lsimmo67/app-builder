'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties } from 'react';

const orbits = [
  { radius: 60, duration: '6s', items: ['⚡'] },
  { radius: 100, duration: '10s', items: ['🔮', '💎'] },
  { radius: 140, duration: '14s', items: ['✨', '🚀', '🌀'] },
];

export default function OrbitAnimation({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn('relative w-80 h-80 flex items-center justify-center', className)}
      style={style}
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/50 z-10 flex items-center justify-center text-white font-bold">
        ★
      </div>
      {orbits.map((orbit, oi) => (
        <div key={oi} className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: orbit.radius * 2, height: orbit.radius * 2 }}
          />
          <div
            className="absolute"
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              animation: `orbit-spin ${orbit.duration} linear infinite`,
            }}
          >
            {orbit.items.map((item, ii) => {
              const angle = (360 / orbit.items.length) * ii;
              return (
                <span
                  key={ii}
                  className="absolute text-lg"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${angle}deg) translateY(-${orbit.radius}px) rotate(-${angle}deg)`,
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
