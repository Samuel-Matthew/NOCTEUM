import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PressBlock() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".press-item"), {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="w-full px-6 md:px-10 lg:px-14">
        <div className="max-w-4xl mx-auto">
          <p
            className="press-item font-mono text-[10px] tracking-[0.3em] uppercase mb-4 text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            For Editors
          </p>
          <h2
            className="press-item font-serif text-2xl md:text-3xl text-center mb-12"
            style={{ color: "var(--text-primary)" }}
          >
            Press Inquiries
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            <div className="press-item text-center">
              <div
                className="w-12 h-12 mx-auto mb-5 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 8h18M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
                </svg>
              </div>
              <h3
                className="font-serif text-base mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Press Kit
              </h3>
              <p
                className="font-body text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                High-resolution imagery, brand guidelines, and founder bios
                available upon request.
              </p>
            </div>

            <div className="press-item text-center">
              <div
                className="w-12 h-12 mx-auto mb-5 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3
                className="font-serif text-base mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Sample Requests
              </h3>
              <p
                className="font-body text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Editorial samples for accredited journalists and publications.
                Limited to two fragrances per request.
              </p>
            </div>

            <div className="press-item text-center">
              <div
                className="w-12 h-12 mx-auto mb-5 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
              </div>
              <h3
                className="font-serif text-base mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Events & Launches
              </h3>
              <p
                className="font-body text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Invitations to private launches, atelier tours, and fragrance
                ceremonies worldwide.
              </p>
            </div>
          </div>

          <div className="press-item mt-12 text-center">
            <a
              href="mailto:press@nocteum.com"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              <span>press@nocteum.com</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
