'use client'

import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

interface InertiaGridProps {
  className?: string
  images?: { src: string; alt: string }[]
  headerTitle?: string
  headerCount?: number
}

const defaultImages = [
  { src: 'https://picsum.photos/seed/ig01/400/400', alt: 'Media 1' },
  { src: 'https://picsum.photos/seed/ig02/400/400', alt: 'Media 2' },
  { src: 'https://picsum.photos/seed/ig03/400/400', alt: 'Media 3' },
  { src: 'https://picsum.photos/seed/ig04/400/400', alt: 'Media 4' },
  { src: 'https://picsum.photos/seed/ig05/400/400', alt: 'Media 5' },
  { src: 'https://picsum.photos/seed/ig06/400/400', alt: 'Media 6' },
  { src: 'https://picsum.photos/seed/ig07/400/400', alt: 'Media 7' },
  { src: 'https://picsum.photos/seed/ig08/400/400', alt: 'Media 8' },
  { src: 'https://picsum.photos/seed/ig09/400/400', alt: 'Media 9' },
  { src: 'https://picsum.photos/seed/ig10/400/400', alt: 'Media 10' },
  { src: 'https://picsum.photos/seed/ig11/400/400', alt: 'Media 11' },
  { src: 'https://picsum.photos/seed/ig12/400/400', alt: 'Media 12' },
]

export default function InertiaGrid({
  className,
  images = defaultImages,
  headerTitle = '3d & stuff',
  headerCount = 12,
}: InertiaGridProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const oldPos = useRef({ x: 0, y: 0 })
  const delta = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    delta.current.x = e.clientX - oldPos.current.x
    delta.current.y = e.clientY - oldPos.current.y
    oldPos.current.x = e.clientX
    oldPos.current.y = e.clientY
  }, [])

  const handleMediaEnter = useCallback((imgEl: HTMLImageElement) => {
    const velocityX = delta.current.x * 30
    const velocityY = delta.current.y * 30

    // Simulate inertia: move in the direction of mouse velocity, then return to 0
    const tl = gsap.timeline({
      onComplete: () => {
        tl.kill()
      },
    })
    tl.timeScale(1.2)

    // Phase 1: Quick displacement based on mouse velocity
    tl.to(imgEl, {
      x: velocityX * 0.15,
      y: velocityY * 0.15,
      duration: 0.3,
      ease: 'power2.out',
    })
    // Phase 2: Spring back to origin
    tl.to(imgEl, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })

    // Concurrent rotation
    tl.fromTo(
      imgEl,
      { rotate: 0 },
      {
        duration: 0.4,
        rotate: (Math.random() - 0.5) * 30,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      },
      '<'
    )
  }, [])

  return (
    <section
      ref={rootRef}
      className={cn(
        'relative flex h-screen items-center justify-center overflow-hidden',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="absolute left-0 top-0 grid w-full grid-cols-[1fr_auto_1fr] items-center border-b border-[#323232] px-6 py-5 text-[#BAB8B9] max-md:flex max-md:justify-between max-md:px-4 max-md:py-3.5">
        <div>
          <p className="flex h-12 w-max items-center gap-1.5 rounded-3xl bg-[#232323] px-5 text-sm uppercase">
            {images[0] && (
              <img
                src={images[0].src}
                alt=""
                className="block h-[22px] w-[22px] rounded-sm object-cover"
              />
            )}
            <span>{headerTitle}</span>
          </p>
        </div>
        <div className="text-[26px] max-md:hidden">
          {headerCount} items saved in your collection
        </div>
        <div className="flex justify-end">
          <p className="flex h-12 w-max items-center rounded-3xl border border-[#323232] px-5 text-sm uppercase">
            Add more
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-4 gap-[1vw] max-md:gap-[2vw]">
        {images.map((img, i) => (
          <div
            key={i}
            className="cursor-pointer"
            onMouseEnter={(e) => {
              const imgEl = e.currentTarget.querySelector('img')
              if (imgEl) handleMediaEnter(imgEl)
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="pointer-events-none block h-[11vw] w-[11vw] rounded-[4%] object-contain will-change-transform max-md:h-[18vw] max-md:w-[18vw]"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
