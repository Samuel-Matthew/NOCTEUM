import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_LINES = [
  "We do not make perfumes.",
  "We bottle presence.",
  "Every drop carries a story of origin,",
  "and the quiet confidence of the wearer.",
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const lines = linesRef.current.filter(Boolean);
    if (!lines.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    lines.forEach((line, i) => {
      tl.from(
        line,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        i * 0.25,
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-40 lg:py-52"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-16 md:mb-20"
          style={{ color: "var(--text-secondary)" }}
        >
          The Manifesto
        </p>
        <div className="space-y-4 md:space-y-5">
          {MANIFESTO_LINES.map((line, i) => (
            <p
              key={i}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-snug ${
                i === 1 ? "italic" : ""
              }`}
              style={{
                color: i === 1 ? "var(--accent)" : "var(--text-primary)",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
