'use client';

import { cn } from '@/lib/utils/cn';
import { CSSProperties, useState } from 'react';

export default function CodeBlock({
  className,
  style,
  code = 'const hello = () => {\n  console.log("Hello, World!");\n  return 42;\n};',
  language = 'typescript',
  filename = 'example.ts',
}: {
  className?: string;
  style?: CSSProperties;
  code?: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={cn('w-full max-w-2xl rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl overflow-hidden', className)}
      style={style}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 font-mono">{filename}</span>
          <span className="text-[10px] text-violet-400/60 px-1.5 py-0.5 rounded bg-violet-500/10">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-white/40 hover:text-white/80 transition-colors px-2 py-1 rounded hover:bg-white/10"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono">
        <code className="text-violet-300/80 leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}
