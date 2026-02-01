"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children, radius = 350, color = "#262626", className, ...props
}: { radius?: number; color?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className={cn("group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800", className)}
      onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} {...props}>
      <motion.div className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{ backgroundColor: color, maskImage: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)` }}>
        {isHovering && <div className="bg-transparent absolute inset-0 pointer-events-none" />}
      </motion.div>
      {children}
    </div>
  );
};

// Builder wrapper
export default function CardSpotlightWrapper(props: { radius?: number; color?: string; className?: string; children?: React.ReactNode }) {
  return (
    <CardSpotlight radius={props.radius || 350} color={props.color || "#262626"} className={props.className}>
      {props.children || (
        <div className="relative z-10">
          <p className="text-xl font-bold text-white">Card Spotlight</p>
          <p className="text-neutral-400 mt-4">Hover over this card to see a spotlight effect with a radial gradient that follows your cursor.</p>
        </div>
      )}
    </CardSpotlight>
  );
}
