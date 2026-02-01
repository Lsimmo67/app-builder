'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useEffect, useState } from 'react';

export default function NumberTicker({
  className,
  style,
  target = 10000,
  duration = 2000,
  prefix = '',
  suffix = '+',
}: {
  className?: string;
  style?: CSSProperties;
  target?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <div className={cn('text-center py-4', className)} style={style}>
      <span className="text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent tabular-nums">
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}
