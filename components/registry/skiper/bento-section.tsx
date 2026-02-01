'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

const defaultItems = [
  { title: 'Analytics', desc: 'Real-time insights', span: 'col-span-2 row-span-2' },
  { title: 'Speed', desc: 'Lightning fast', span: 'col-span-1 row-span-1' },
  { title: 'Security', desc: 'Enterprise grade', span: 'col-span-1 row-span-1' },
  { title: 'Scale', desc: 'Infinite growth', span: 'col-span-1 row-span-2' },
  { title: 'AI Powered', desc: 'Smart automation', span: 'col-span-2 row-span-1' },
];

export default function BentoSection({
  className,
  style,
  items = defaultItems,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  items?: { title: string; desc: string; span: string }[];
  children?: ReactNode;
}) {
  return (
    <div className={cn('w-full max-w-4xl mx-auto py-8', className)} style={style}>
      <div className="grid grid-cols-3 auto-rows-[140px] gap-3">
        {(children ? [] : items).map((item, i) => (
          <div
            key={i}
            className={cn(
              'rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 flex flex-col justify-end hover:border-violet-500/30 hover:bg-white/5 transition-all group',
              item.span
            )}
          >
            <h3 className="text-white font-semibold group-hover:text-violet-300 transition-colors">{item.title}</h3>
            <p className="text-white/40 text-sm mt-1">{item.desc}</p>
          </div>
        ))}
        {children}
      </div>
    </div>
  );
}
