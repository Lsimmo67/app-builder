'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useState } from 'react';

const defaultCards = [
  { title: 'First Card', color: 'from-violet-600 to-purple-800' },
  { title: 'Second Card', color: 'from-fuchsia-600 to-pink-800' },
  { title: 'Third Card', color: 'from-cyan-600 to-blue-800' },
];

export default function StackedCards({
  className,
  style,
  cards = defaultCards,
}: {
  className?: string;
  style?: CSSProperties;
  cards?: { title: string; color: string }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn('relative w-80 h-52', className)} style={style}>
      {cards.map((card, i) => {
        const offset = ((i - active + cards.length) % cards.length);
        return (
          <div
            key={i}
            className={cn(
              'absolute inset-0 rounded-2xl border border-white/10 p-6 cursor-pointer transition-all duration-500 ease-out bg-gradient-to-br',
              card.color
            )}
            style={{
              transform: 'translateY(' + (offset * -12) + 'px) scale(' + (1 - offset * 0.05) + ')',
              zIndex: cards.length - offset,
              opacity: offset > 2 ? 0 : 1,
            }}
            onClick={() => setActive((active + 1) % cards.length)}
          >
            <h3 className="text-white font-bold text-lg">{card.title}</h3>
            <p className="text-white/60 text-sm mt-2">Click to cycle through cards</p>
          </div>
        );
      })}
    </div>
  );
}
