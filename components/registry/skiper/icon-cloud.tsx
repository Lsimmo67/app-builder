'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useEffect, useMemo, useState } from 'react';

const defaultIcons = ['⚛️', '🔷', '🟢', '🔶', '💎', '🔮', '🌀', '✨', '🚀', '⚡', '🎯', '💫'];

export default function IconCloud({
  className,
  style,
  icons = defaultIcons,
}: {
  className?: string;
  style?: CSSProperties;
  icons?: string[];
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  const positions = useMemo(
    () =>
      icons.map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / icons.length);
        const theta = Math.sqrt(icons.length * Math.PI) * phi;
        return { phi, theta };
      }),
    [icons.length]
  );

  return (
    <div
      className={cn('relative w-64 h-64 flex items-center justify-center', className)}
      style={style}
    >
      {icons.map((icon, i) => {
        const { phi, theta } = positions[i];
        const r = 90;
        const angle = tick * 0.01;
        const x = r * Math.sin(phi) * Math.cos(theta + angle);
        const y = r * Math.cos(phi);
        const z = r * Math.sin(phi) * Math.sin(theta + angle);
        const scale = (z + r) / (2 * r) * 0.6 + 0.4;
        return (
          <span
            key={i}
            className="absolute text-2xl transition-opacity duration-300"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              opacity: scale,
              zIndex: Math.round(z),
            }}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}
