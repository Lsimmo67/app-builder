'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties } from 'react';

const defaultBefore = ['Slow loading times', 'Complex setup', 'Limited customization', 'No dark mode'];
const defaultAfter = ['Instant performance', 'One-click deploy', 'Fully customizable', 'Beautiful dark theme'];

export default function ComparisonSection({
  className,
  style,
  beforeTitle = 'Before',
  afterTitle = 'After',
  beforeItems = defaultBefore,
  afterItems = defaultAfter,
}: {
  className?: string;
  style?: CSSProperties;
  beforeTitle?: string;
  afterTitle?: string;
  beforeItems?: string[];
  afterItems?: string[];
}) {
  return (
    <div className={cn('w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 py-8', className)} style={style}>
      <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6">
        <h3 className="text-red-400 font-bold text-lg mb-4">{beforeTitle}</h3>
        <ul className="space-y-3">
          {beforeItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-white/50 text-sm">
              <span className="text-red-400 mt-0.5">✕</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
        <h3 className="text-emerald-400 font-bold text-lg mb-4">{afterTitle}</h3>
        <ul className="space-y-3">
          {afterItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
              <span className="text-emerald-400 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
