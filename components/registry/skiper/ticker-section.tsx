'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties } from 'react';

const defaultItems = [
  { label: 'AAPL', value: '189.50', change: '+2.3%', up: true },
  { label: 'GOOG', value: '141.80', change: '+1.1%', up: true },
  { label: 'TSLA', value: '248.42', change: '-0.8%', up: false },
  { label: 'MSFT', value: '378.91', change: '+1.5%', up: true },
  { label: 'AMZN', value: '178.25', change: '-0.3%', up: false },
  { label: 'META', value: '505.75', change: '+3.2%', up: true },
];

export default function TickerSection({
  className,
  style,
  items = defaultItems,
}: {
  className?: string;
  style?: CSSProperties;
  items?: { label: string; value: string; change: string; up: boolean }[];
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn('w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-xl py-3', className)}
      style={style}
    >
      <div className="flex animate-ticker-scroll whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-3 mx-6">
            <span className="text-white/80 font-mono font-bold text-sm">{item.label}</span>
            <span className="text-white/50 font-mono text-sm">{item.value}</span>
            <span className={cn('font-mono text-sm font-semibold', item.up ? 'text-emerald-400' : 'text-red-400')}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-ticker-scroll { animation: ticker-scroll 20s linear infinite; }
      `}</style>
    </div>
  );
}
