"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { LuxuryHeroCanvas } from "@/components/invitation/luxury-hero-canvas";

type LuxuryHeroProps = {
  guestTitle: string;
  coupleNames: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
};

export function LuxuryHero({
  guestTitle,
  coupleNames,
  eventDate,
  eventTime,
  venueName,
}: LuxuryHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const element = sectionRef.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const nextProgress = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height * 0.45)),
      );

      setProgress(nextProgress);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const textOffset = (1 - progress) * 26;
  const photoOffset = (1 - progress) * 32;
  const glowOpacity = 0.35 + progress * 0.4;

  return (
    <section
      ref={sectionRef}
      className="luxury-hero-section"
      style={
        {
          "--hero-text-offset": `${textOffset}px`,
          "--hero-photo-offset": `${photoOffset}px`,
          "--hero-glow-opacity": glowOpacity,
        } as CSSProperties
      }
    >
      <div className="luxury-hero-shell">
        <div className="luxury-hero-backdrop" />
        <div className="luxury-hero-orb luxury-hero-orb-left" />
        <div className="luxury-hero-orb luxury-hero-orb-right" />
        <div className="luxury-hero-grain" />

        <div className="luxury-hero-copy">
          <div className="luxury-hero-kicker">
            <span>Wedding Invitation</span>
            <span>{eventDate}</span>
          </div>

          <h1 className="luxury-hero-title">{coupleNames}</h1>

          <p className="luxury-hero-message">
            {guestTitle}, приглашаем вас разделить с нами день нашей свадьбы.
          </p>

          <div className="luxury-hero-meta">
            <div>
              <span className="luxury-hero-meta-label">Дата</span>
              <span className="luxury-hero-meta-value">{eventDate}</span>
            </div>
            <div>
              <span className="luxury-hero-meta-label">Сбор гостей</span>
              <span className="luxury-hero-meta-value">{eventTime}</span>
            </div>
            <div>
              <span className="luxury-hero-meta-label">Локация</span>
              <span className="luxury-hero-meta-value">{venueName}</span>
            </div>
          </div>
        </div>

        <div className="luxury-hero-visual">
          <div className="luxury-hero-photo-wrap">
            <div className="luxury-hero-photo-glow" />
            <div className="luxury-hero-photo-frame">
              <Image
                src="/images/couple-hero.jpg"
                alt="Степан и Елизавета"
                fill
                priority
                className="luxury-hero-photo"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </div>

          <div className="luxury-hero-canvas-wrap" aria-hidden="true">
            <LuxuryHeroCanvas />
          </div>

          <div className="luxury-hero-monogram">S&E</div>
        </div>
      </div>
    </section>
  );
}
