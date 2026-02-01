'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useRef, useState } from 'react';

export default function RippleButton({
  className,
  style,
  children = 'Click Me',
}: {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  return (
    <button
      ref={btnRef}
      className={cn(
        'relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25 cursor-pointer',
        className
      )}
      style={style}
      onClick={handleClick}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 animate-ripple-expand pointer-events-none"
          style={{ left: r.x - 50, top: r.y - 50, width: 100, height: 100 }}
        />
      ))}
      <span className="relative z-10">{children}</span>
      <style jsx>{`
        @keyframes ripple-expand {
          from { transform: scale(0); opacity: 0.6; }
          to { transform: scale(4); opacity: 0; }
        }
        .animate-ripple-expand { animation: ripple-expand 0.6s ease-out forwards; }
      `}</style>
    </button>
  );
}
