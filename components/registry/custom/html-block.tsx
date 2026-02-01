'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CustomHtmlBlockProps {
  componentName?: string
  htmlContent?: string
  rawHtml?: string
  rawCss?: string
  rawJs?: string
  sourceLibrary?: string
  className?: string
}

export default function CustomHtmlBlock({
  componentName = 'Custom Component',
  htmlContent,
  rawHtml = '',
  rawCss = '',
  rawJs = '',
  className,
}: CustomHtmlBlockProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(200)

  const srcDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; overflow: hidden; }
    ${rawCss}
  </style>
</head>
<body>
  ${rawHtml || htmlContent || '<div style="padding:2rem;text-align:center;color:#999">No content</div>'}
  ${rawJs ? `<script>${rawJs}</script>` : ''}
  <script>
    function sendHeight() {
      const h = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'resize', height: h }, '*');
    }
    sendHeight();
    new MutationObserver(sendHeight).observe(document.body, { childList: true, subtree: true, attributes: true });
    window.addEventListener('load', sendHeight);
  </script>
</body>
</html>`

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'resize' && typeof e.data.height === 'number') {
        setHeight(Math.max(100, Math.min(e.data.height, 2000)))
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <div className={cn('relative w-full', className)}>
      <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
        {componentName}
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        className="w-full border-0"
        style={{ height }}
        sandbox="allow-scripts"
        title={componentName}
      />
    </div>
  )
}
