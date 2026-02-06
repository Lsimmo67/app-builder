"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export interface DragCard {
  title: string;
  image: string;
  rotation: number;
}

export interface GsapDragCardsProps {
  cards?: DragCard[];
  bounds?: string | HTMLElement;
  className?: string;
}

const defaultCards: DragCard[] = [
  {
    title: "Card One",
    image: "https://picsum.photos/seed/dragcard1/300/200",
    rotation: -5,
  },
  {
    title: "Card Two",
    image: "https://picsum.photos/seed/dragcard2/300/200",
    rotation: 3,
  },
  {
    title: "Card Three",
    image: "https://picsum.photos/seed/dragcard3/300/200",
    rotation: -2,
  },
  {
    title: "Card Four",
    image: "https://picsum.photos/seed/dragcard4/300/200",
    rotation: 7,
  },
  {
    title: "Card Five",
    image: "https://picsum.photos/seed/dragcard5/300/200",
    rotation: -4,
  },
];

export default function GsapDragCards({
  cards = defaultCards,
  className,
}: GsapDragCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cardEls =
        containerRef.current!.querySelectorAll<HTMLElement>(".draggable-card");

      cardEls.forEach((card, i) => {
        const initialRotation = cards[i]?.rotation ?? 0;

        gsap.set(card, {
          rotation: initialRotation,
          zIndex: i,
        });

        Draggable.create(card, {
          type: "x,y",
          bounds: containerRef.current!,
          inertia: true,
          onPress: function () {
            // Bring to front
            const allCards =
              containerRef.current!.querySelectorAll<HTMLElement>(
                ".draggable-card",
              );
            allCards.forEach((c) => gsap.set(c, { zIndex: 0 }));
            gsap.set(card, { zIndex: 100 });
            gsap.to(card, {
              scale: 1.05,
              rotation: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          },
          onRelease: function () {
            gsap.to(card, {
              scale: 1,
              rotation: initialRotation,
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [cards]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        minHeight: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          className="draggable-card"
          style={{
            position: "absolute",
            width: "280px",
            borderRadius: "16px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            cursor: "grab",
            userSelect: "none",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            willChange: "transform",
            left: `calc(50% - 140px + ${(i - Math.floor(cards.length / 2)) * 30}px)`,
            top: `calc(50% - 140px + ${(i - Math.floor(cards.length / 2)) * 15}px)`,
          }}
        >
          <img
            src={card.image}
            alt={card.title}
            draggable={false}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div style={{ padding: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              {card.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
