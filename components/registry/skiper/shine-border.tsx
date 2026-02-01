'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

export default function ShineBorder({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div className={cn('relative rounded-2xl p-[1px] overflow-hidden group', className)} style={style}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent animate-shine-slide" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-shine-slide-v" />
      <div className="relative rounded-[15px] bg-black/90 backdrop-blur-xl p-6">
        {children ?? (
          <>
            <h3 className="text-lg font-semibold text-white mb-2">Shine Border</h3>
            <p className="text-white/50 text-sm">A card with a light beam continuously sweeping across its border.</p>
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes shine-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shine-slide-v {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-shine-slide { animation: shine-slide 3s ease-in-out infinite; }
        .animate-shine-slide-v { animation: shine-slide-v 3s ease-in-out infinite 1.5s; }
      `}</style>
    </div>
  );
}
