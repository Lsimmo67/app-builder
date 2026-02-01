'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

export default function BrowserMockup({
  className,
  style,
  children,
  url = 'https://example.com',
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  url?: string;
}) {
  return (
    <div
      className={cn(
        'w-full max-w-3xl rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden',
        className
      )}
      style={style}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-4">
          <div className="rounded-md bg-white/10 px-3 py-1 text-xs text-white/50 text-center truncate">
            {url}
          </div>
        </div>
      </div>
      <div className="p-6 min-h-[200px] text-white/70 text-sm">
        {children ?? (
          <div className="flex flex-col gap-3">
            <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse" />
            <div className="h-20 w-full rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
