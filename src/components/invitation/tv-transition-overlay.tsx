"use client";

import { useEffect, useRef, useState } from "react";

export function TvTransitionOverlay() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const element = rootRef.current;

    if (!element || hasPlayed) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasPlayed) {
          return;
        }

        setIsActive(true);
        setHasPlayed(true);

        window.setTimeout(() => {
          setIsActive(false);
        }, 1800);

        observer.disconnect();
      },
      {
        threshold: 0.55,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-20">
      <div
        className={`tv-transition-overlay ${isActive ? "tv-transition-overlay-active" : ""}`}
      >
        <div className="tv-static-noise absolute inset-0" />
        <div className="tv-static-scanlines absolute inset-0" />
        <div className="tv-static-glow absolute inset-0" />
        <div className="tv-static-vignette absolute inset-0" />
      </div>
    </div>
  );
}
