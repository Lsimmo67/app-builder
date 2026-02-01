'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties } from 'react';

const defaultEvents = [
  { year: '2023', title: 'Project Started', desc: 'Initial concept and planning phase.' },
  { year: '2024', title: 'Beta Launch', desc: 'First beta release to early adopters.' },
  { year: '2025', title: 'Public Release', desc: 'Full public launch with all features.' },
  { year: '2026', title: 'Scale Up', desc: 'Expanding to new markets and verticals.' },
];

export default function TimelineSection({
  className,
  style,
  events = defaultEvents,
}: {
  className?: string;
  style?: CSSProperties;
  events?: { year: string; title: string; desc: string }[];
}) {
  return (
    <div className={cn('w-full max-w-2xl mx-auto py-8', className)} style={style}>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500" />
        {events.map((ev, i) => (
          <div key={i} className={cn('relative flex items-start mb-10', i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>
            <div className="hidden md:block w-1/2" />
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-500 border-2 border-black shadow-lg shadow-violet-500/50 z-10 mt-1.5" />
            <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
              <span className="text-xs font-mono text-violet-400">{ev.year}</span>
              <h3 className="text-white font-bold mt-1">{ev.title}</h3>
              <p className="text-white/50 text-sm mt-1">{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
