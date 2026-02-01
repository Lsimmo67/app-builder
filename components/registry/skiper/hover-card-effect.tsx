'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode, useRef, useState } from 'react';

export default function HoverCardEffect({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0, s: 1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: -my * 20, y: mx * 20, s: 1.03 });
  };

  const handleMouseLeave = () => setRot({ x: 0, y: 0, s: 1 });

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 transition-transform duration-300 ease-out shadow-xl cursor-pointer',
        className
      )}
      style={{
        ...style,
        transform: 'perspective(800px) rotateX(' + rot.x + 'deg) rotateY(' + rot.y + 'deg) scale3d(' + rot.s + ',' + rot.s + ',' + rot.s + ')',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity" />
      <div className="relative z-10 text-white/80 text-sm">
        {children ?? (
          <>
            <h3 className="text-lg font-bold text-white mb-2">3D Hover Card</h3>
            <p>Move your cursor over this card to see the 3D tilt effect in action.</p>
          </>
        )}
      </div>
    </div>
  );
}
