"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const PRINT_DURATION_MS = 2800;
const RETRACT_DURATION_MS = 2200;

function MemoryCameraSvg({
  accent = "#bd1616",
}: { accent?: string }) {
  return (
    <svg
      viewBox="0 0 420 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="memory-camera-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="camera-body" x1="72" y1="44" x2="300" y2="306" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF7" />
          <stop offset="1" stopColor="#F2E8D9" />
        </linearGradient>
        <linearGradient id="camera-dark" x1="210" y1="0" x2="210" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#262323" />
          <stop offset="1" stopColor="#0F0E0E" />
        </linearGradient>
        <radialGradient id="lens-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(213 142) rotate(90) scale(58)">
          <stop stopColor="#8A5A37" />
          <stop offset="0.35" stopColor="#161313" />
          <stop offset="1" stopColor="#090808" />
        </radialGradient>
        <linearGradient id="flash-glass" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFFDFB" />
          <stop offset="1" stopColor="#C7B8A3" />
        </linearGradient>
      </defs>
      <rect x="54" y="28" width="312" height="212" rx="18" fill="url(#camera-body)" stroke="#E5D7C1" strokeWidth="2" />
      <rect x="54" y="18" width="312" height="28" rx="10" fill="url(#camera-dark)" />
      <rect x="54" y="228" width="312" height="58" rx="8" fill="url(#camera-dark)" />
      <rect x="70" y="244" width="280" height="12" rx="6" fill="#171414" />
      <rect x="118" y="245" width="182" height="2" rx="1" fill="#B99254" opacity="0.7" />
      <circle cx="122" cy="146" r="26" fill="#FFF7EA" stroke="#E1D0B3" strokeWidth="5" />
      <circle cx="122" cy="146" r="18" fill={accent} />
      <g transform="translate(208 145)">
        <circle r="60" fill="#111111" />
        <circle r="54" stroke="#393434" strokeWidth="8" />
        <circle r="44" stroke="#1D1A1A" strokeWidth="10" />
        <circle r="34" fill="url(#lens-glow)" />
        <circle r="15" fill="#0D0B0B" />
        <ellipse cx="10" cy="-8" rx="10" ry="7" fill="#D9AC72" opacity="0.72" />
        <ellipse cx="-8" cy="5" rx="5" ry="4" fill="#6E84D7" opacity="0.7" />
      </g>
      <rect x="286" y="82" width="46" height="46" rx="6" fill="#191616" />
      <rect x="291" y="87" width="36" height="36" rx="4" fill="url(#flash-glass)" />
      <rect x="289" y="164" width="40" height="38" rx="7" fill="#121010" />
      <circle cx="309" cy="183" r="12" fill="#0C0A0A" stroke="#1E1A1A" strokeWidth="4" />
      <circle cx="310" cy="220" r="8" fill="#0D0B0B" />

      <g transform="translate(92 84) rotate(-11 20 20)">
        <path d="M0 22C10 18 19 8 26 0C28 10 33 18 42 21C31 24 26 30 24 42C19 31 11 26 0 22Z" fill="#BB9158" />
        <path d="M22 8L24 33" stroke="#8E6636" strokeWidth="2" strokeLinecap="round" />
      </g>

      <rect x="197" y="170" width="10" height="56" fill="#C41B2A" />
      <rect x="207" y="170" width="10" height="56" fill="#F08717" />
      <rect x="217" y="170" width="10" height="56" fill="#E7CF2D" />
      <rect x="227" y="170" width="10" height="56" fill="#99C121" />
      <rect x="237" y="170" width="10" height="56" fill="#1660C7" />

      <rect x="140" y="240" width="140" height="18" rx="8" fill="#080707" />
      <rect x="177" y="244" width="66" height="4" rx="2" fill="#BF995B" opacity="0.65" />
      <circle cx="165" cy="247" r="2" fill="#BF995B" opacity="0.75" />
      <circle cx="255" cy="247" r="2" fill="#BF995B" opacity="0.75" />
    </svg>
  );
}

type CameraStackProps = {
  phase: "idle" | "printing" | "centering" | "printed" | "retracting";
};

function CameraStack({ phase }: CameraStackProps) {
  const expanded = phase === "centering" || phase === "printed";
  const cameraLift = expanded ? -24 : 0;
  const cameraOpacity = expanded ? 0 : 1;
  const isPrinting = phase === "printing";
  const isCentering = phase === "centering";
  const isRetracting = phase === "retracting";
  const cameraTransition = isPrinting
    ? "transform 1200ms cubic-bezier(0.18, 0.88, 0.24, 1) 2400ms, opacity 700ms ease 2400ms"
    : isCentering
      ? "transform 1200ms cubic-bezier(0.18, 0.88, 0.24, 1), opacity 700ms ease"
    : isRetracting
      ? "transform 1200ms cubic-bezier(0.4, 0, 0.2, 1) 900ms, opacity 420ms ease 900ms"
      : "transform 1200ms cubic-bezier(0.18, 0.88, 0.24, 1) 2400ms, opacity 700ms ease 2400ms";

  return (
    <div className={`camera-stack camera-stack-${phase}`}>
      <div
        className="camera-flat"
        style={
          {
            transform: `translateY(${cameraLift}rem)`,
            opacity: cameraOpacity,
            transition: cameraTransition,
          } as CSSProperties
        }
      >
        <MemoryCameraSvg />
      </div>
    </div>
  );
}

function MovingPolaroid({
  imageSrc,
  name,
  side,
  phase,
}: {
  imageSrc: string;
  name: string;
  side: "left" | "right";
  phase: "idle" | "printing" | "centering" | "printed" | "retracting";
}) {
  const baseLeft = side === "left" ? "33%" : "67%";
  let transform = "translate(-50%, -50%) translateY(0.4rem) scale(0.34) rotate(0deg)";
  let opacity = 0;
  let zIndex = 1;
  let transition =
    "transform 2200ms cubic-bezier(0.16, 0.88, 0.24, 1), opacity 300ms ease";

  if (phase === "printing") {
    transform =
      "translate(-50%, -50%) translateY(8.8rem) scale(0.38) rotate(0deg)";
    opacity = 1;
    transition =
      "transform 2200ms cubic-bezier(0.16, 0.88, 0.24, 1) 180ms, opacity 180ms ease";
  } else if (phase === "centering" || phase === "printed") {
    zIndex = side === "left" ? 4 : 5;
    transform =
      side === "left"
        ? "translate(-50%, -50%) translate(-4.2rem, 9.6rem) scale(0.98) rotate(-6deg)"
        : "translate(-50%, -50%) translate(4.1rem, 10.2rem) scale(0.98) rotate(5deg)";
    opacity = 1;
    transition =
      phase === "centering"
        ? "transform 1100ms cubic-bezier(0.16, 0.88, 0.24, 1), opacity 240ms ease"
        : "transform 1100ms cubic-bezier(0.16, 0.88, 0.24, 1), opacity 240ms ease";
  } else if (phase === "retracting") {
    transform =
      "translate(-50%, -50%) translateY(0.25rem) scale(0.32) rotate(0deg)";
    opacity = 0;
    transition =
      "transform 1500ms cubic-bezier(0.4, 0, 0.2, 1) 180ms, opacity 260ms ease";
  }

  const imageFilter =
    phase === "idle" || phase === "retracting"
      ? "grayscale(1) brightness(1.2)"
      : phase === "printing"
        ? "grayscale(0.55) brightness(1.06)"
        : "grayscale(0) brightness(1)";

  return (
    <article
      className={`moving-polaroid polaroid-card moving-polaroid-${side}`}
      style={
        {
          left: baseLeft,
          top: "45%",
          zIndex,
          opacity,
          transform,
          transition,
        } as CSSProperties
      }
    >
      <div
        className="polaroid-photo"
        style={{ filter: imageFilter, transition: "filter 900ms ease" } as CSSProperties}
      >
        <Image
          src={imageSrc}
          alt={`${name} в детстве`}
          fill
          className="moving-polaroid-image"
          sizes="(max-width: 1024px) 46vw, 24vw"
        />
      </div>
      <p className="polaroid-signature">{name}</p>
    </article>
  );
}

export function MemoryCameraScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [phase, setPhase] = useState<"idle" | "printing" | "centering" | "printed" | "retracting">("idle");

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function setScrollLocked(locked: boolean) {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const scrollContainer = element.closest("main");

    if (!scrollContainer) {
      return;
    }

    scrollContainer.style.overflowY = locked ? "hidden" : "auto";
  }

  function startPrinting() {
    if (phase === "printing" || phase === "printed") {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setScrollLocked(true);
    setPhase("printing");
    timeoutRef.current = setTimeout(() => {
      setPhase("centering");
      timeoutRef.current = setTimeout(() => {
        setPhase("printed");
        setScrollLocked(false);
        timeoutRef.current = null;
      }, 1200);
    }, PRINT_DURATION_MS);
  }

  function startRetracting() {
    if (phase === "retracting" || phase === "idle") {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setScrollLocked(true);
    setPhase("retracting");
    timeoutRef.current = setTimeout(() => {
      setPhase("idle");
      setScrollLocked(false);
      timeoutRef.current = null;
    }, RETRACT_DURATION_MS);
  }

  return (
    <section
      ref={sectionRef}
      className="story-scene story-scene-cameras"
      onWheel={(event) => {
        if (phase === "printing" || phase === "retracting") {
          event.preventDefault();
          return;
        }

        if (event.deltaY > 0 && phase === "idle") {
          event.preventDefault();
          startPrinting();
        } else if (event.deltaY < 0 && phase === "printed") {
          event.preventDefault();
          startRetracting();
        }
      }}
      onTouchStart={(event) => {
        touchStartYRef.current = event.touches[0]?.clientY ?? null;
      }}
      onTouchMove={(event) => {
        const startY = touchStartYRef.current;
        const currentY = event.touches[0]?.clientY;

        if (phase === "printing" || phase === "retracting") {
          event.preventDefault();
          return;
        }

        if (startY !== null && currentY !== undefined && startY - currentY > 12 && phase === "idle") {
          event.preventDefault();
          startPrinting();
        } else if (
          startY !== null &&
          currentY !== undefined &&
          currentY - startY > 12 &&
          phase === "printed"
        ) {
          event.preventDefault();
          startRetracting();
        }
      }}
    >
      <div className="story-scene-glow story-scene-glow-left" />
      <div className="story-scene-glow story-scene-glow-right" />

      <div className="story-title-wrap">
        <p className="story-kicker">Пролог</p>
        <h1 className="story-title">До нашей встречи</h1>
      </div>

      <div className="camera-stage camera-stage-flat">
        <CameraStack
          phase={phase}
        />
        <CameraStack
          phase={phase}
        />
      </div>

      <MovingPolaroid
        imageSrc="/images/child-stepan.jpg"
        name="Степан"
        side="left"
        phase={phase}
      />
      <MovingPolaroid
        imageSrc="/images/child-elizaveta.jpg"
        name="Елизавета"
        side="right"
        phase={phase}
      />
    </section>
  );
}
