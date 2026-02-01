'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

export default function PatternBg({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn('relative w-full min-h-[300px] rounded-2xl overflow-hidden bg-black', className)}
      style={style}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      <div className="relative z-10 flex items-center justify-center h-full p-8 text-white">
        {children ?? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Pattern Background</h2>
            <p className="text-white/50">Subtle dot matrix pattern with gradient overlay.</p>
          </div>
        )}
      </div>
    </div>
  );
}
