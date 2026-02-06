"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityImageGalleryProps {
  images?: { src: string; alt?: string; caption?: string }[]
  columns?: number
  className?: string
}

const defaultImages = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", alt: "Mountains", caption: "Mountain Vista" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop", alt: "Forest", caption: "Forest Path" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop", alt: "Woods", caption: "Deep Woods" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", alt: "Beach", caption: "Tropical Beach" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop", alt: "Stars", caption: "Starry Night" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop", alt: "Lake", caption: "Serene Lake" },
]

export default function AceternityImageGallery({
  images = defaultImages,
  columns = 3,
  className,
}: AceternityImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className={cn("w-full max-w-5xl mx-auto p-4", className)}>
      {/* Grid */}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage(idx)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={image.src}
              alt={image.alt || ""}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {image.caption && (
              <motion.p
                className="absolute bottom-3 left-3 text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {image.caption}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt || ""}
                className="w-full rounded-2xl object-contain max-h-[80vh]"
              />
              {images[selectedImage].caption && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-white mt-4 text-lg"
                >
                  {images[selectedImage].caption}
                </motion.p>
              )}

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Nav arrows */}
              {selectedImage > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage - 1) }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {selectedImage < images.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage + 1) }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
