import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const path = pathRef.current;
    const text = textRef.current;
    if (!path || !text) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    // Draw the brand name
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    // Hold briefly
    tl.to({}, { duration: 0.4 });

    // Slide away
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div ref={textRef} className="relative">
        <svg
          width="300"
          height="60"
          viewBox="0 0 300 60"
          className="overflow-visible"
        >
          <text
            x="150"
            y="42"
            textAnchor="middle"
            className="font-serif"
            style={{
              fontSize: 42,
              fill: "none",
              stroke: "var(--accent)",
              strokeWidth: 0.8,
              letterSpacing: 8,
            }}
          >
            NOCTĒUM
          </text>
          <path
            ref={pathRef}
            d="M40 42 L60 42 L75 20 L90 42 L110 42 M125 42 L125 18 L150 42 L150 18 M170 18 L170 42 M170 30 L195 30 M210 42 L210 18 L240 42 L240 18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          className="font-mono text-[9px] tracking-[0.3em] uppercase text-center mt-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Artisan Fragrances
        </p>
      </div>
    </div>
  );
}
