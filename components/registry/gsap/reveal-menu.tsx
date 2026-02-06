"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils/cn"

export interface GsapRevealMenuProps {
  menuItems?: string[]
  bgColor?: string
  accentColor?: string
  className?: string
}

const defaultMenuItems = ["Home", "About", "Work", "Services", "Contact"]

export default function GsapRevealMenu({
  menuItems = defaultMenuItems,
  bgColor = "#0f172a",
  accentColor = "#667eea",
  className,
}: GsapRevealMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!containerRef.current || !menuRef.current) return

    const ctx = gsap.context(() => {
      const menu = menuRef.current!
      const items = menu.querySelectorAll(".menu-item")
      const overlay = menu.querySelector(".menu-overlay") as HTMLElement

      const tl = gsap.timeline({ paused: true })

      tl.to(overlay, {
        clipPath: "circle(150% at calc(100% - 2rem) 2rem)",
        duration: 0.8,
        ease: "power3.inOut",
      })
        .fromTo(
          items,
          { opacity: 0, y: 40, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )

      tlRef.current = tl
    }, containerRef)

    return () => ctx.revert()
  }, [menuItems, bgColor])

  useEffect(() => {
    if (!tlRef.current) return
    if (isOpen) {
      tlRef.current.play()
    } else {
      tlRef.current.reverse()
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ minHeight: "400px" }}
    >
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 60,
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "8px",
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: "28px",
              height: "2px",
              backgroundColor: "#fff",
              transition: "transform 0.3s, opacity 0.3s",
              ...(isOpen && i === 0 ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}),
              ...(isOpen && i === 1 ? { opacity: 0 } : {}),
              ...(isOpen && i === 2 ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}),
            }}
          />
        ))}
      </button>

      {/* Menu overlay */}
      <div ref={menuRef}>
        <div
          className="menu-overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor,
            clipPath: "circle(0% at calc(100% - 2rem) 2rem)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {menuItems.map((item, i) => (
            <a
              key={i}
              href="#"
              className="menu-item"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
                opacity: 0,
                display: "block",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = accentColor
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = "#fff"
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Background content placeholder */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "400px",
          opacity: 0.5,
        }}
      >
        Click the menu button to reveal
      </div>
    </div>
  )
}
