'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSProperties, useState, useEffect, useCallback } from 'react'

const defaultCode = `const hello = () => {
  console.log("Hello, World!");
  return 42;
};`

export default function CodeBlock({
  className,
  style,
  code = defaultCode,
  language = 'typescript',
  filename = 'example.ts',
}: {
  className?: string
  style?: CSSProperties
  code?: string
  language?: string
  filename?: string
}) {
  const [copied, setCopied] = useState(false)
  const [displayedCode, setDisplayedCode] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (!isTyping) return
    let idx = 0
    const interval = setInterval(() => {
      idx++
      setDisplayedCode(code.slice(0, idx))
      if (idx >= code.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [code, isTyping])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  return (
    <motion.div
      className={cn(
        'w-full max-w-2xl rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl overflow-hidden',
        className
      )}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring' as const, stiffness: 200, damping: 24 }}
      whileHover={{
        borderColor: 'rgba(139, 92, 246, 0.3)',
        boxShadow: '0 20px 50px -12px rgba(139, 92, 246, 0.1)',
      }}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-xs text-white/40 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filename}
          </motion.span>
          <motion.span
            className="text-[10px] text-violet-400/60 px-1.5 py-0.5 rounded bg-violet-500/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' as const, stiffness: 300 }}
          >
            {language}
          </motion.span>
        </div>
        <motion.button
          onClick={handleCopy}
          className="text-xs text-white/40 hover:text-white/80 px-2 py-1 rounded hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? 'copied' : 'copy'}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono relative">
        <code className="text-violet-300/80 leading-relaxed">
          {displayedCode}
        </code>
        {isTyping && (
          <motion.span
            className="inline-block w-[2px] h-[1.1em] bg-violet-400 ml-0.5 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' as const, times: [0, 0.5, 1] }}
          />
        )}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' as const }}
        />
      </pre>
    </motion.div>
  )
}
