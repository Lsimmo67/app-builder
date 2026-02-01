'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useEffect, useState } from 'react';

export default function WordRotate({
  className,
  style,
  words = ['Amazing', 'Beautiful', 'Creative', 'Dynamic', 'Elegant'],
  interval = 2000,
  prefix = 'This is ',
}: {
  className?: string;
  style?: CSSProperties;
  words?: string[];
  interval?: number;
  prefix?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <div className={cn('text-3xl font-bold text-white py-4', className)} style={style}>
      {prefix}
      <span className="relative inline-block overflow-hidden h-[1.2em] align-bottom">
        {words.map((word, i) => (
          <span
            key={word}
            className={cn(
              'absolute left-0 top-0 transition-all duration-500 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap',
              i === index
                ? 'translate-y-0 opacity-100'
                : i === (index - 1 + words.length) % words.length
                ? '-translate-y-full opacity-0'
                : 'translate-y-full opacity-0'
            )}
          >
            {word}
          </span>
        ))}
      </span>
    </div>
  );
}
