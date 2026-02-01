'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useState } from 'react';

export default function InteractiveGrid({
  className,
  style,
  cols = 8,
  rows = 6,
}: {
  className?: string;
  style?: CSSProperties;
  cols?: number;
  rows?: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const getCellStyle = (i: number) => {
    if (hovered === null) return { background: 'rgba(255,255,255,0.03)' };
    const dx = (i % cols) - (hovered % cols);
    const dy = Math.floor(i / cols) - Math.floor(hovered / cols);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const b = Math.max(0, 1 - dist * 0.2);
    return {
      background: b > 0 ? 'rgba(139, 92, 246, ' + (b * 0.6) + ')' : 'rgba(255,255,255,0.03)',
      boxShadow: b > 0.5 ? '0 0 ' + (b * 20) + 'px rgba(139,92,246,' + (b * 0.4) + ')' : 'none',
    };
  };

  return (
    <div className={cn('w-full max-w-xl p-4', className)} style={style}>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(' + cols + ', 1fr)' }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-sm transition-all duration-300 cursor-crosshair border border-white/5"
            style={getCellStyle(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </div>
    </div>
  );
}
