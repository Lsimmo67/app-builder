"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type SpotlightProps = {
  className?: string
  fill?: string
}

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  )
}

export interface AceternitySpotlightProps {
  title?: string
  subtitle?: string
  description?: string
  ctaButtons?: { text: string; href: string; variant?: string }[]
  className?: string
}

export default function AceternitySpotlightWrapper({
  title = "Spotlight Effect That Draws Attention",
  subtitle = "Beautiful animated spotlight",
  description = "Illuminate your content with a beautiful, animated spotlight effect that draws attention to your hero sections.",
  className,
}: AceternitySpotlightProps) {
  return (
    <div
      className={cn(
        "relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center",
        className
      )}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-neutral-500">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
