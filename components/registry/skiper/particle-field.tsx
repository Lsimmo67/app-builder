'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useMemo } from 'react';

export default function ParticleField({
  className,
  style,
  count = 50,
}: {
  className?: string;
  style?: CSSProperties;
  count?: number;
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        dur: Math.random() * 6 + 4,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [count]
  );

  return (
    <div
      className={cn('relative w-full min-h-[300px] overflow-hidden rounded-2xl bg-black/40', className)}
      style={style}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-violet-400 animate-particle-float"
          style={{
            left: p.x + '%',
            top: p.y + '%',
            width: p.size + 'px',
            height: p.size + 'px',
            opacity: p.opacity,
            animation: 'particle-float ' + p.dur + 's ease-in-out ' + p.delay + 's infinite',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
