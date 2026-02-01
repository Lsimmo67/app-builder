'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

export default function SplitSection({
  className,
  style,
  left,
  right,
}: {
  className?: string;
  style?: CSSProperties;
  left?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div
      className={cn('w-full grid grid-cols-1 md:grid-cols-2 min-h-[400px]', className)}
      style={style}
    >
      <div className="relative flex items-center justify-center p-10 bg-gradient-to-br from-violet-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="relative z-10 text-white">
          {left ?? (
            <div>
              <h2 className="text-3xl font-bold mb-3">Left Side</h2>
              <p className="text-white/50 max-w-sm">Content on the left half of the split section with a purple gradient.</p>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex items-center justify-center p-10 bg-gradient-to-bl from-cyan-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.15),transparent_70%)]" />
        <div className="relative z-10 text-white">
          {right ?? (
            <div>
              <h2 className="text-3xl font-bold mb-3">Right Side</h2>
              <p className="text-white/50 max-w-sm">Content on the right half of the split section with a cyan gradient.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
