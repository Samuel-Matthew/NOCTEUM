import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

const PHASES = [
  {
    key: "top" as const,
    label: "Opening",
    time: "0–15 min",
    desc: "The first breath. Bright, volatile, impossible to ignore.",
  },
  {
    key: "heart" as const,
    label: "Heart",
    time: "15 min – 4 hrs",
    desc: "The soul of the fragrance emerges. Warm, complex, intimate.",
  },
  {
    key: "base" as const,
    label: "Dry Down",
    time: "4+ hrs",
    desc: "What remains on skin at midnight. Deep, enduring, yours alone.",
  },
];

export default function ScentTimeline({ notes }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll(".timeline-node");
    const lines = containerRef.current.querySelectorAll(".timeline-line");

    const ctx = gsap.context(() => {
      gsap.from(nodes, {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(lines, {
        scaleX: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto">
      <div className="text-center mb-14 md:mb-20">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          The Journey
        </p>
        <h2
          className="font-serif text-2xl md:text-3xl mt-3"
          style={{ color: "var(--text-primary)" }}
        >
          How It Unfolds on Skin
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-0">
        {PHASES.map((phase, idx) => {
          const items = notes[phase.key];
          const isLast = idx === PHASES.length - 1;
          return (
            <div
              key={phase.key}
              className="flex-1 relative flex flex-col items-center text-center"
            >
              {/* Node */}
              <div className="relative mb-6">
                <div
                  className="timeline-node w-4 h-4 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                {/* Pulse ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: "var(--accent)",
                    animation: "pulse-dot 2.5s ease-in-out infinite",
                    animationDelay: `${idx * 0.4}s`,
                  }}
                />
              </div>

              {/* Connecting line (desktop) */}
              {!isLast && (
                <div
                  className="timeline-line hidden md:block absolute top-2 left-1/2 w-full h-px origin-left"
                  style={{ backgroundColor: "var(--border)" }}
                />
              )}

              {/* Content */}
              <div className="px-4">
                <p
                  className="font-mono text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  {phase.time}
                </p>
                <h3
                  className="font-serif text-xl md:text-2xl mt-2 mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {phase.label}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed mb-4 max-w-xs mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {phase.desc}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase"
                      style={{
                        backgroundColor: "var(--card-bg)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
