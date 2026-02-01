'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

export default function PhoneMockup({
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
      className={cn(
        'relative w-[280px] h-[560px] rounded-[3rem] border-4 border-white/15 bg-black/70 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden',
        className
      )}
      style={style}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10" />
      <div className="absolute inset-0 rounded-[2.6rem] overflow-hidden">
        <div className="w-full h-full p-4 pt-10 text-white/70 text-sm">
          {children ?? (
            <div className="flex flex-col gap-3 items-center pt-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 animate-pulse" />
              <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
              <div className="h-3 w-16 rounded bg-white/10 animate-pulse" />
              <div className="mt-4 w-full space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-full rounded-xl bg-white/5 border border-white/10" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/20" />
    </div>
  );
}
