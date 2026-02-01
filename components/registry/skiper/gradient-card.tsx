'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

export default function GradientCard({
  className,
  style,
  children,
  title = 'Gradient Card',
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  title?: string;
}) {
  return (
    <div
      className={cn('relative p-[2px] rounded-2xl overflow-hidden group', className)}
      style={style}
    >
      <div
        className="absolute inset-0 animate-spin-slow rounded-2xl"
        style={{
          background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #f43f5e, #eab308, #7c3aed)',
          animation: 'spin 4s linear infinite',
        }}
      />
      <div className="relative rounded-[14px] bg-black/90 backdrop-blur-xl p-6 h-full">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="text-white/60 text-sm">
          {children ?? 'A beautiful card with an animated gradient border that rotates continuously.'}
        </div>
      </div>
      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
