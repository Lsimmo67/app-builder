'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function SparkleText({
  className,
  style,
  text = 'Sparkle Magic',
}: {
  className?: string;
  style?: CSSProperties;
  text?: string;
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const s: Sparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
      };
      setSparkles((prev) => [...prev.slice(-12), s]);
    }, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={cn('relative inline-block', className)} style={style}>
      {sparkles.map((s) => (
        <svg
          key={s.id}
          className="absolute pointer-events-none animate-sparkle-pop"
          style={{ left: s.x + '%', top: s.y + '%', width: s.size, height: s.size }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" fill="#c084fc" />
        </svg>
      ))}
      <span className="relative z-10 text-4xl font-bold bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
        {text}
      </span>
      <style jsx>{`
        @keyframes sparkle-pop {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1) rotate(90deg); opacity: 1; }
          100% { transform: scale(0) rotate(180deg); opacity: 0; }
        }
        .animate-sparkle-pop { animation: sparkle-pop 0.8s ease-out forwards; }
      `}</style>
    </span>
  );
}
