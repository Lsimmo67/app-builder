'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useEffect, useState } from 'react';

export default function MorphingText({
  className,
  style,
  words = ['Innovate', 'Create', 'Design', 'Build', 'Ship'],
  interval = 2500,
}: {
  className?: string;
  style?: CSSProperties;
  words?: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFading(false);
      }, 400);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <div className={cn('text-center py-8', className)} style={style}>
      <h2 className="text-5xl font-bold">
        <span className="text-white/80">We </span>
        <span
          className={cn(
            'inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-400',
            fading ? 'opacity-0 blur-sm translate-y-2' : 'opacity-100 blur-0 translate-y-0'
          )}
        >
          {words[index]}
        </span>
      </h2>
    </div>
  );
}
