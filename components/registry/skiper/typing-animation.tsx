'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useEffect, useState } from 'react';

export default function TypingAnimation({
  className,
  style,
  text = 'Hello, World!',
  speed = 80,
  loop = true,
}: {
  className?: string;
  style?: CSSProperties;
  text?: string;
  speed?: number;
  loop?: boolean;
}) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (idx < text.length) {
          setDisplayed(text.slice(0, idx + 1));
          setIdx(idx + 1);
        } else if (loop) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (idx > 0) {
          setDisplayed(text.slice(0, idx - 1));
          setIdx(idx - 1);
        } else {
          setDeleting(false);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [idx, deleting, text, speed, loop]);

  return (
    <span className={cn('text-3xl font-bold text-white', className)} style={style}>
      {displayed}
      <span className="inline-block w-[3px] h-[1em] bg-violet-400 ml-1 align-middle animate-blink" />
      <style jsx>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 0.8s step-end infinite; }
      `}</style>
    </span>
  );
}
