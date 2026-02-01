'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, ReactNode } from 'react';

export default function MeshGradient({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn('relative w-full min-h-[400px] overflow-hidden rounded-2xl', className)}
      style={style}
    >
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] -top-40 -left-40 rounded-full bg-purple-600/40 blur-[120px] animate-blob" />
        <div className="absolute w-[400px] h-[400px] top-20 right-0 rounded-full bg-cyan-500/30 blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute w-[450px] h-[450px] -bottom-20 left-1/3 rounded-full bg-fuchsia-500/30 blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full p-8 text-white">
        {children ?? (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-3">Mesh Gradient</h2>
            <p className="text-white/60 max-w-md">Beautiful organic gradients that blend and animate smoothly.</p>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
