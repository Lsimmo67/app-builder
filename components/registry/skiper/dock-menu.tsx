'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useState } from 'react';

const defaultItems = [
  { icon: '🏠', label: 'Home' },
  { icon: '📁', label: 'Files' },
  { icon: '💬', label: 'Chat' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '🔍', label: 'Search' },
];

export default function DockMenu({
  className,
  style,
  items = defaultItems,
}: {
  className?: string;
  style?: CSSProperties;
  items?: { icon: string; label: string }[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'inline-flex items-end gap-1 px-4 py-2 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-2xl shadow-2xl',
        className
      )}
      style={style}
    >
      {items.map((item, i) => {
        const dist = hovered !== null ? Math.abs(hovered - i) : -1;
        const scale = dist === 0 ? 1.5 : dist === 1 ? 1.25 : 1;
        return (
          <div
            key={i}
            className="flex flex-col items-center transition-transform duration-200 ease-out cursor-pointer"
            style={{ transform: `scale(${scale})`, transformOrigin: 'bottom' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === i && (
              <span className="text-[10px] text-white/70 mb-1 px-2 py-0.5 rounded bg-black/80 border border-white/10 whitespace-nowrap">
                {item.label}
              </span>
            )}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 text-xl hover:bg-white/20 transition-colors">
              {item.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
}
