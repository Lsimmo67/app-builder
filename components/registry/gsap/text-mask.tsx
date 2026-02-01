'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface TextMaskProps {
  className?: string
  children?: ReactNode
  text?: string
}

export default function TextMask({
  className,
  children,
  text = 'Masked',
}: TextMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !textRef.current || !maskRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 1,
        },
      })

      // Animate the clip-path on the text from left to right
      tl.fromTo(
        textRef.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          letterSpacing: '0.3em',
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          letterSpacing: '-0.05em',
          duration: 1,
          ease: 'none',
        },
        0
      )

      // Animate the mask overlay wiping from left to right
      tl.fromTo(
        maskRef.current,
        {
          scaleX: 1,
        },
        {
          scaleX: 0,
          duration: 1,
          ease: 'none',
        },
        0
      )

      // Continuous gradient animation (not scroll-linked)
      gsap.to(textRef.current, {
        backgroundPosition: '100% 50%',
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={cn('w-full py-24 px-6 overflow-hidden', className)}>
      <div className="mx-auto max-w-5xl text-center">
        <div className="relative inline-block">
          <h2
            ref={textRef}
            className="text-7xl sm:text-9xl font-black uppercase tracking-tighter"
            style={{
              backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              backgroundPosition: '0% 50%',
              clipPath: 'inset(0 100% 0 0)',
            }}
          >
            {text}
          </h2>

          {/* Solid mask overlay that wipes away */}
          <div
            ref={maskRef}
            className="absolute inset-0 bg-neutral-950"
            style={{ transformOrigin: 'right center' }}
          />
        </div>

        {children ?? (
          <>
            <p className="mt-8 text-lg text-neutral-400 max-w-2xl mx-auto">
              Text masked with gradient imagery, revealed through a cinematic wipe transition
              that draws attention to every letter.
            </p>
            <div className="mt-12 flex justify-center gap-8">
              {['Gradient Mask', 'Wipe Reveal', 'Letter Spacing'].map((feat) => (
                <div key={feat} className="text-center">
                  <div className="h-1 w-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  <p className="text-xs text-neutral-500">{feat}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
