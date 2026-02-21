"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import type { ReactNode } from "react";

// ── ScrollStackItem ─────────────────────────────────────────────────────────
export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full origin-top will-change-transform ${itemClassName}`.trim()}
  >
    {children}
  </div>
);

// ── ScrollStack ─────────────────────────────────────────────────────────────
interface ScrollStackProps {
  className?: string;
  children: ReactNode;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number>(0);
  const wrapperBottomRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Config — tighter on mobile
  const stackTop = isMobile ? 70 : 100;
  const stackGap = isMobile ? 10 : 14;
  const scaleStep = isMobile ? 0.02 : 0.025;

  const updateCards = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollY = window.scrollY;
    const total = cards.length;
    const wrapperBottom = wrapperBottomRef.current;

    // The last card's height — used to know when to release all cards
    const lastCard = cards[total - 1];
    const lastCardHeight = lastCard ? lastCard.offsetHeight : 300;
    // Release point: when scrolling past the wrapper, unpin everything
    const releasePoint = wrapperBottom - window.innerHeight * 0.4;

    cards.forEach((card, i) => {
      const naturalTop = parseFloat(card.dataset.naturalTop || "0");
      const stickyPoint = naturalTop - stackTop - stackGap * i;

      // Max translateY — card should not go beyond its natural position
      // relative to the wrapper bottom
      const maxTranslateY = wrapperBottom - lastCardHeight - naturalTop;

      if (scrollY >= stickyPoint) {
        let translateY = scrollY - naturalTop + stackTop + stackGap * i;

        // Clamp translateY so the card doesn't escape the wrapper
        translateY = Math.min(translateY, maxTranslateY);

        // Calculate depth for scale/brightness
        let cardsAbove = 0;
        for (let j = i + 1; j < total; j++) {
          const jTop = parseFloat(cards[j].dataset.naturalTop || "0");
          const jSticky = jTop - stackTop - stackGap * j;
          if (scrollY >= jSticky) {
            cardsAbove++;
          }
        }

        // If we're past the release point, gradually unpin by reducing cardsAbove effect
        if (scrollY > releasePoint) {
          const overscroll = scrollY - releasePoint;
          const fadeRange = 200;
          const fadeProgress = Math.min(1, overscroll / fadeRange);
          // Lerp scale and brightness back to normal
          const scale = 1 - cardsAbove * scaleStep * (1 - fadeProgress);
          const brightness = 1 - cardsAbove * 0.04 * (1 - fadeProgress);

          card.style.transform = `translateY(${translateY}px) scale(${scale})`;
          card.style.filter =
            brightness < 1 ? `brightness(${brightness})` : "";
        } else {
          const scale = 1 - cardsAbove * scaleStep;
          const brightness = 1 - cardsAbove * 0.04;

          card.style.transform = `translateY(${translateY}px) scale(${scale})`;
          card.style.filter =
            brightness < 1 ? `brightness(${brightness})` : "";
        }

        card.style.zIndex = `${i + 1}`;
      } else {
        card.style.transform = "";
        card.style.filter = "";
        card.style.zIndex = `${i + 1}`;
      }
    });
  }, [stackTop, stackGap, scaleStep]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cards = Array.from(
      wrapper.querySelectorAll(".scroll-stack-card")
    ) as HTMLElement[];
    cardsRef.current = cards;

    const storePositions = () => {
      cards.forEach((card) => {
        const prevTransform = card.style.transform;
        card.style.transform = "";
        const rect = card.getBoundingClientRect();
        card.dataset.naturalTop = String(rect.top + window.scrollY);
        card.style.transform = prevTransform;
      });

      // Store the wrapper's bottom edge
      const wrapperRect = wrapper.getBoundingClientRect();
      wrapperBottomRef.current = wrapperRect.bottom + window.scrollY;
    };

    cards.forEach((card) => {
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.position = "relative";
    });

    storePositions();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cards.forEach((card) => {
          card.style.transform = "";
          card.style.filter = "";
        });
        storePositions();
        updateCards();
      }, 150);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCards);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    updateCards();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.filter = "";
        card.style.willChange = "";
        card.style.zIndex = "";
        delete card.dataset.naturalTop;
      });
    };
  }, [isMobile, updateCards]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
      {children}
      {/* Spacer for the last card to stay pinned before releasing */}
      <div className="h-[10vh] md:h-[15vh]" aria-hidden="true" />
    </div>
  );
};
