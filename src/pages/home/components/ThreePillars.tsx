import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    category: "perfume",
    label: "Perfume",
    tagline: "The Pinnacle",
    description:
      "Our extrait de parfum concentrations. 30–40% fragrance oils aged in French oak barrels before bottling. These are heirlooms you wear.",
    detail: "Concentration: 30–40% · Longevity: 12–18h",
    svgPath: "M16 4 L16 20 M10 8 L16 4 L22 8 M12 12 L20 12 M10 16 L22 16",
  },
  {
    category: "cologne",
    label: "Cologne",
    tagline: "The Presence",
    description:
      "Eau de cologne and eau de toilette formulations that evolve through the day — fresh at dawn, complex by dusk. Engineered for the active wearer.",
    detail: "Concentration: 8–20% · Longevity: 4–8h",
    svgPath: "M12 4 L12 20 M8 7 L16 7 M8 14 L16 14 M9 4 L15 4 M9 20 L15 20",
  },
  {
    category: "deodorant",
    label: "Deodorant",
    tagline: "The Foundation",
    description:
      "Aluminum-free, fragrance-enhanced body care. Gentle on skin, uncompromising on scent. The invisible layer beneath your perfume.",
    detail: "Formula: Aluminum-Free · Duration: All-Day",
    svgPath:
      "M9 4 L15 4 L16 8 L8 8 Z M8 8 L8 20 L16 20 L16 8 M12 11 L12 17 M10 14 L14 14",
  },
];

export default function ThreePillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgPathsRef = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const columns = columnsRef.current.filter(Boolean);
    if (!columns.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });

    tl.from(columns, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
    });

    // SVG hover animations
    svgPathsRef.current.forEach((path) => {
      if (!path) return;
      const length = path.getTotalLength?.() ?? 100;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-36"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="w-full px-6 md:px-10 lg:px-14">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Our Craft
        </p>
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-20 md:mb-24"
          style={{ color: "var(--text-primary)" }}
        >
          Three Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-14">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.category}
              ref={(el) => {
                columnsRef.current[i] = el;
              }}
              className="group"
            >
              {/* SVG Icon */}
              <div
                className="w-14 h-14 mb-8 flex items-center justify-center"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-all duration-300 group-hover:scale-110"
                >
                  <path
                    ref={(el) => {
                      svgPathsRef.current[i] = el;
                    }}
                    d={pillar.svgPath}
                    stroke="var(--svg-stroke)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              <p
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--accent)" }}
              >
                {pillar.tagline}
              </p>
              <h3
                className="font-serif text-2xl md:text-3xl mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                {pillar.label}
              </h3>
              <p
                className="font-body text-[15px] leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {pillar.description}
              </p>
              <p
                className="font-mono text-[10px] tracking-[0.12em] mb-8"
                style={{ color: "var(--accent)" }}
              >
                {pillar.detail}
              </p>

              <Link
                to={`/collection?category=${pillar.category}`}
                data-cursor="link"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase group/link"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="group-hover/link:opacity-80 transition-opacity">
                  Explore
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Hover accent line */}
              <div
                className="h-px mt-6 transition-all duration-500 origin-left"
                style={{
                  backgroundColor: "var(--accent)",
                  transform: "scaleX(0)",
                }}
                ref={(el) => {
                  if (!el) return;
                  const parent = el.parentElement;
                  if (!parent) return;
                  parent.addEventListener("mouseenter", () => {
                    gsap.to(el, {
                      scaleX: 1,
                      duration: 0.4,
                      ease: "power3.out",
                    });
                  });
                  parent.addEventListener("mouseleave", () => {
                    gsap.to(el, {
                      scaleX: 0,
                      duration: 0.3,
                      ease: "power3.in",
                    });
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
