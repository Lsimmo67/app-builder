"use client"

import { IconArrowNarrowRight } from "@tabler/icons-react"
import { useState, useRef, useId, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SlideData { title: string; button: string; src: string }

const Slide = ({ slide, index, current, handleSlideClick }: { slide: SlideData; index: number; current: number; handleSlideClick: (index: number) => void }) => {
  const slideRef = useRef<HTMLLIElement>(null)
  const xRef = useRef(0)
  const yRef = useRef(0)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return
      slideRef.current.style.setProperty("--x", `${xRef.current}px`)
      slideRef.current.style.setProperty("--y", `${yRef.current}px`)
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [])

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2))
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2))
  }

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li ref={slideRef} className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10" onClick={() => handleSlideClick(index)} onMouseMove={handleMouseMove} onMouseLeave={() => { xRef.current = 0; yRef.current = 0 }} style={{ transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)", transformOrigin: "bottom" }}>
        <div className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out" style={{ transform: current === index ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" : "none" }}>
          <img className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out" style={{ opacity: current === index ? 1 : 0.5 }} alt={slide.title} src={slide.src} loading="eager" decoding="sync" />
          {current === index && <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />}
        </div>
        <article className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${current === index ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative">{slide.title}</h2>
          <div className="flex justify-center"><button className="mt-6 px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200">{slide.button}</button></div>
        </article>
      </li>
    </div>
  )
}

const CarouselControl = ({ type, title, handleClick }: { type: string; title: string; handleClick: () => void }) => (
  <button className={cn("w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 rounded-full transition duration-200", type === "previous" ? "rotate-180" : "")} title={title} onClick={handleClick}>
    <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
  </button>
)

export default function AceternityCarousel({ slides: slidesProp, className }: { slides?: SlideData[]; className?: string }) {
  const slides = slidesProp || [
    { title: "Slide One", button: "Explore", src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800" },
    { title: "Slide Two", button: "Discover", src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800" },
    { title: "Slide Three", button: "Learn More", src: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=800" },
  ]
  const [current, setCurrent] = useState(0)
  const id = useId()

  return (
    <div className={cn("relative w-[70vmin] h-[70vmin] mx-auto", className)} aria-labelledby={`carousel-heading-${id}`}>
      <ul className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${current * (100 / slides.length)}%)` }}>
        {slides.map((slide, index) => (<Slide key={index} slide={slide} index={index} current={current} handleSlideClick={setCurrent} />))}
      </ul>
      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl type="previous" title="Previous" handleClick={() => setCurrent(current - 1 < 0 ? slides.length - 1 : current - 1)} />
        <CarouselControl type="next" title="Next" handleClick={() => setCurrent(current + 1 === slides.length ? 0 : current + 1)} />
      </div>
    </div>
  )
}
