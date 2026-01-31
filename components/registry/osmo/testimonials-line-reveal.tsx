'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

interface Testimonial {
  quote: string
  name: string
  company: string
  image: string
}

interface TestimonialsLineRevealProps {
  className?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      '"After a rough quarter, we needed hands fast. Their team jumped in with clear pricing and flexible coverage for weekend rushes and supplier delays. They\'ve become our first call when operations get tight."',
    name: 'Mara Kline',
    company: 'Northbay Produce Co.',
    image:
      'https://cdn.prod.website-files.com/697946f9c74d6e83502491c6/6979fcf493ed513c80fb67b0_img-1.avif',
  },
  {
    quote:
      '"We were referred by a partner and liked the straight answers. They helped us stabilize scheduling, fill last-minute gaps, and keep deliveries on time during peak season. Now we reach out before problems snowball."',
    name: 'Devon Reyes',
    company: 'Kestrel Courier Group',
    image:
      'https://cdn.prod.website-files.com/697946f9c74d6e83502491c6/6979fcf4340be6c44df0fa86_img-2.avif',
  },
  {
    quote:
      '"During our expansion, training and onboarding fell behind. They stepped in with consistent staffing, fair rates, and quick turnaround for urgent shifts."',
    name: 'Priya Menon',
    company: 'Harborview Senior Living',
    image:
      'https://cdn.prod.website-files.com/697946f9c74d6e83502491c6/6979fcf41e2c7bc67c213c31_img-3.avif',
  },
  {
    quote:
      '"We had a sudden equipment outage and couldn\'t afford downtime. They coordinated extra coverage, kept communication simple, and helped us meet our production commitments without surprises."',
    name: 'Cole Hart',
    company: 'Redstone Bottling Works',
    image:
      'https://cdn.prod.website-files.com/697946f9c74d6e83502491c6/6979fcf45f6f900cd99e3701_img-4.avif',
  },
  {
    quote:
      '"Our busiest months are unpredictable, and hiring temp help is usually a headache. They made it easy—clear terms, flexible availability, and people who actually showed up prepared. They\'re our go-to when demand spikes."',
    name: 'Lina Okafor',
    company: 'Juniper Street Catering',
    image:
      'https://cdn.prod.website-files.com/697946f9c74d6e83502491c6/6979fcf4cb1e0ab479d5809a_img-5.avif',
  },
]

// Simple line splitter for React: wraps each line in a span with overflow hidden
function splitIntoLines(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || ''
  const computedStyle = window.getComputedStyle(el)
  const fontSize = computedStyle.fontSize
  const fontWeight = computedStyle.fontWeight
  const fontFamily = computedStyle.fontFamily
  const lineHeight = computedStyle.lineHeight
  const letterSpacing = computedStyle.letterSpacing
  const width = el.offsetWidth

  // Temporary span to measure text
  const measure = document.createElement('span')
  measure.style.cssText = `
    position: absolute; visibility: hidden; white-space: nowrap;
    font-size: ${fontSize}; font-weight: ${fontWeight};
    font-family: ${fontFamily}; line-height: ${lineHeight};
    letter-spacing: ${letterSpacing};
  `
  document.body.appendChild(measure)

  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    measure.textContent = testLine
    if (measure.offsetWidth > width && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)

  document.body.removeChild(measure)

  // Replace content with masked line spans
  el.textContent = ''
  const lineEls: HTMLElement[] = []

  for (const line of lines) {
    const mask = document.createElement('span')
    mask.style.cssText =
      'display: block; overflow: hidden; padding-bottom: 0.2em; margin-bottom: -0.2em;'
    const inner = document.createElement('span')
    inner.style.display = 'block'
    inner.textContent = line
    mask.appendChild(inner)
    el.appendChild(mask)
    lineEls.push(inner)
  }

  return lineEls
}

export default function TestimonialsLineReveal({
  className,
  testimonials = defaultTestimonials,
}: TestimonialsLineRevealProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const quoteRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const nameRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const companyRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const linesCache = useRef<Map<number, HTMLElement[]>>(new Map())
  const initialized = useRef(false)

  // Split text into lines after mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    testimonials.forEach((_, i) => {
      const targets = [quoteRefs.current[i], nameRefs.current[i], companyRefs.current[i]].filter(
        Boolean
      ) as HTMLElement[]

      const allLines: HTMLElement[] = []
      for (const target of targets) {
        const lines = splitIntoLines(target)
        allLines.push(...lines)
      }
      linesCache.current.set(i, allLines)

      // Set initial states
      if (i === activeIndex) {
        allLines.forEach((line) => gsap.set(line, { yPercent: 0 }))
        if (imageRefs.current[i]) {
          gsap.set(imageRefs.current[i], {
            clipPath: 'circle(50% at 50% 50%)',
          })
        }
      } else {
        allLines.forEach((line) => gsap.set(line, { yPercent: 110 }))
        if (imageRefs.current[i]) {
          gsap.set(imageRefs.current[i], {
            clipPath: 'circle(0% at 50% 50%)',
          })
        }
        gsap.set(itemRefs.current[i], {
          autoAlpha: 0,
          pointerEvents: 'none',
        })
      }
    })
  }, [testimonials, activeIndex])

  const goTo = useCallback(
    (nextIndex: number) => {
      if (isAnimating || nextIndex === activeIndex) return
      setIsAnimating(true)

      const outgoingLines = linesCache.current.get(activeIndex) || []
      const incomingLines = linesCache.current.get(nextIndex) || []

      const tl = gsap.timeline({
        onComplete: () => {
          // Set slide states
          if (itemRefs.current[activeIndex]) {
            gsap.set(itemRefs.current[activeIndex], {
              autoAlpha: 0,
              pointerEvents: 'none',
            })
          }
          if (itemRefs.current[nextIndex]) {
            gsap.set(itemRefs.current[nextIndex], {
              autoAlpha: 1,
              pointerEvents: 'auto',
            })
          }
          setActiveIndex(nextIndex)
          setIsAnimating(false)
        },
      })

      // Show incoming item
      gsap.set(itemRefs.current[nextIndex], {
        autoAlpha: 1,
        pointerEvents: 'auto',
      })
      gsap.set(incomingLines, { yPercent: 110 })

      if (imageRefs.current[nextIndex]) {
        gsap.set(imageRefs.current[nextIndex], {
          clipPath: 'circle(0% at 50% 50%)',
        })
      }
      if (imageRefs.current[activeIndex]) {
        gsap.set(imageRefs.current[activeIndex], {
          clipPath: 'circle(50% at 50% 50%)',
        })
      }

      // Animate outgoing lines up
      tl.to(
        outgoingLines,
        {
          yPercent: -110,
          duration: 0.6,
          ease: 'power4.inOut',
          stagger: { amount: 0.25 },
        },
        0
      )

      // Animate outgoing image
      if (imageRefs.current[activeIndex]) {
        tl.to(
          imageRefs.current[activeIndex],
          {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 0.6,
            ease: 'power4.inOut',
          },
          0
        )
      }

      // Animate incoming lines in
      tl.to(
        incomingLines,
        {
          yPercent: 0,
          duration: 0.7,
          ease: 'power4.inOut',
          stagger: { amount: 0.4 },
        },
        '>-=0.3'
      )

      // Animate incoming image
      if (imageRefs.current[nextIndex]) {
        tl.to(
          imageRefs.current[nextIndex],
          {
            clipPath: 'circle(50% at 50% 50%)',
            duration: 0.75,
            ease: 'power4.inOut',
          },
          '<'
        )
      }

      tl.set(itemRefs.current[activeIndex]!, { autoAlpha: 0 }, '>')
    },
    [activeIndex, isAnimating]
  )

  const goNext = useCallback(
    () => goTo((activeIndex + 1) % testimonials.length),
    [activeIndex, goTo, testimonials.length]
  )
  const goPrev = useCallback(
    () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length),
    [activeIndex, goTo, testimonials.length]
  )

  return (
    <div
      className={cn(
        'flex flex-wrap items-start justify-start gap-5',
        className
      )}
    >
      {/* Controls */}
      <div className="flex w-1/3 flex-row items-start justify-start gap-4 max-md:order-[9999] max-md:w-full">
        <button
          onClick={goPrev}
          aria-label="previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded border border-black/20 bg-transparent p-0 dark:border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            viewBox="0 0 12 12"
            fill="none"
            className="w-3"
          >
            <path
              d="M5.26512 12L6.43721 10.7746L1.48837 5.28169V6.71831L6.45581 1.22535L5.28372 0L-2.21369e-07 6L5.26512 12ZM12 6.97183V5.02817H1.30232V6.97183H12Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          onClick={goNext}
          aria-label="next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded border border-black/20 bg-transparent p-0 dark:border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            viewBox="0 0 12 12"
            fill="none"
            className="w-3"
          >
            <path
              d="M6.73488 12L5.56279 10.7746L10.5116 5.28169V6.71831L5.54419 1.22535L6.71628 0L12 6L6.73488 12ZM0 6.97183V5.02817H10.6977V6.97183H0Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col items-start justify-start gap-20 max-md:gap-12">
        {/* Counter */}
        <div className="flex flex-row items-center justify-start gap-6">
          <p className="mb-0 text-xl leading-tight opacity-50 max-md:text-base">
            <span className="inline-block w-[1ch]">{activeIndex + 1}</span> /{' '}
            <span>{testimonials.length}</span>
          </p>
          <p className="mb-0 text-xl leading-tight max-md:text-base">
            What our clients say:
          </p>
        </div>

        {/* Testimonial items */}
        <div className="relative grid w-full">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              aria-hidden={i !== activeIndex}
              className={cn(
                'relative flex w-full flex-col items-start justify-start gap-16 max-md:gap-8',
                '[grid-area:1/1]',
                i === activeIndex
                  ? 'visible opacity-100'
                  : 'invisible opacity-0'
              )}
            >
              <h3
                ref={(el) => {
                  quoteRefs.current[i] = el
                }}
                className="m-0 w-full text-5xl font-medium leading-none tracking-tight max-md:text-2xl"
              >
                {testimonial.quote}
              </h3>
              <div className="flex flex-row items-center justify-start gap-5">
                <div
                  ref={(el) => {
                    imageRefs.current[i] = el
                  }}
                  className="aspect-square w-20 overflow-hidden rounded-full max-md:w-14"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p
                    ref={(el) => {
                      nameRefs.current[i] = el
                    }}
                    className="mb-0 text-xl leading-tight max-md:text-base"
                  >
                    {testimonial.name}
                  </p>
                  <p
                    ref={(el) => {
                      companyRefs.current[i] = el
                    }}
                    className="mb-0 text-xl leading-tight opacity-50 max-md:text-base"
                  >
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
