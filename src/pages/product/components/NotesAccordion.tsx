import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NotesProps {
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

const SECTIONS = [
  {
    key: "top" as const,
    label: "Top Notes",
    subtitle: "First Impression — 0 to 15 minutes",
  },
  {
    key: "heart" as const,
    label: "Heart Notes",
    subtitle: "The Core — 15 minutes to 4 hours",
  },
  {
    key: "base" as const,
    label: "Base Notes",
    subtitle: "The Lingering — 4 hours and beyond",
  },
];

export default function NotesAccordion({ notes }: NotesProps) {
  const [open, setOpen] = useState<string | null>("top");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".note-row");
    gsap.from(items, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className="max-w-4xl mx-auto">
      <h2
        className="font-serif text-2xl md:text-3xl mb-10"
        style={{ color: "var(--text-primary)" }}
      >
        Fragrance Pyramid
      </h2>
      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const isOpen = open === section.key;
          const items = notes[section.key];
          return (
            <div
              key={section.key}
              className="note-row rounded-lg overflow-hidden transition-all duration-500"
              style={{
                backgroundColor: isOpen ? "var(--card-bg)" : "transparent",
                border: "1px solid var(--border)",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : section.key)}
                className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left"
              >
                <div>
                  <p
                    className="font-serif text-lg md:text-xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {section.label}
                  </p>
                  <p
                    className="font-mono text-[9px] tracking-[0.15em] uppercase mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {section.subtitle}
                  </p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-300 flex-shrink-0 ml-4"
                  style={{
                    color: "var(--accent)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase border"
                      style={{
                        borderColor: "var(--border)",
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
