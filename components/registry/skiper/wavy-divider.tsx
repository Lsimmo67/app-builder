'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties } from 'react';

export default function WavyDivider({
  className,
  style,
  flip = false,
}: {
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
}) {
  return (
    <div
      className={cn('w-full overflow-hidden leading-none', flip && 'rotate-180', className)}
      style={style}
    >
      <svg
        className="w-full h-20 md:h-28"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,40 1440,50 L1440,120 L0,120 Z"
          fill="url(#wave-grad)"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="M0,40 C360,100 720,0 1080,60 C1260,90 1380,40 1440,50 L1440,120 L0,120 Z;M0,60 C360,10 720,90 1080,30 C1260,10 1380,70 1440,40 L1440,120 L0,120 Z;M0,40 C360,100 720,0 1080,60 C1260,90 1380,40 1440,50 L1440,120 L0,120 Z"
          />
        </path>
      </svg>
    </div>
  );
}
