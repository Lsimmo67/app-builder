'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties } from 'react';

const defaultFeatures = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-millisecond response times' },
  { icon: '🔒', title: 'Secure by Default', desc: 'Enterprise-grade encryption' },
  { icon: '🎨', title: 'Beautiful UI', desc: 'Pixel-perfect components' },
  { icon: '🚀', title: 'Easy Deploy', desc: 'One-click deployment pipeline' },
];

export default function FeatureList({
  className,
  style,
  features = defaultFeatures,
}: {
  className?: string;
  style?: CSSProperties;
  features?: { icon: string; title: string; desc: string }[];
}) {
  return (
    <div className={cn('w-full max-w-xl mx-auto space-y-3 py-6', className)} style={style}>
      {features.map((f, i) => (
        <div
          key={i}
          className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all cursor-pointer"
          style={{ animationDelay: (i * 100) + 'ms' }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shrink-0">
            {f.icon}
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">
              {f.title}
            </h4>
            <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
          </div>
          <div className="ml-auto text-white/20 group-hover:text-violet-400 transition-colors">→</div>
        </div>
      ))}
    </div>
  );
}
