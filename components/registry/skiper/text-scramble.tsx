'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useEffect, useRef, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

export default function TextScramble({
  className,
  style,
  text = 'Decrypting...',
  speed = 40,
}: {
  className?: string;
  style?: CSSProperties;
  text?: string;
  speed?: number;
}) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    frameRef.current = 0;
    const run = () => {
      frame++;
      const result = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < frame / 3) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      setDisplay(result);
      if (frame < text.length * 3 + 10) {
        frameRef.current = window.requestAnimationFrame(run);
      }
    };
    const timeout = setTimeout(run, speed);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, speed]);

  return (
    <span
      className={cn(
        'font-mono text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent',
        className
      )}
      style={style}
    >
      {display}
    </span>
  );
}
