'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

export default function BlurCard({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div className={cn('relative group', className)} style={style}>
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-cyan-600/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl p-6 shadow-xl">
        {children ?? (
          <>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-lg mb-4">
              ✦
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Frosted Glass</h3>
            <p className="text-white/50 text-sm">
              A glassmorphic card with a frosted blur effect and glowing border on hover.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
