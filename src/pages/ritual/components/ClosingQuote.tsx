import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function ClosingQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current!.querySelectorAll(".close-line"), {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[70vh] flex items-center justify-center py-24 md:py-36"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            top: "20%",
            left: "-5%",
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full opacity-10"
          style={{
            bottom: "10%",
            right: "-5%",
            background:
              "radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div
        ref={quoteRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <p
          className="close-line font-mono text-[10px] tracking-[0.3em] uppercase mb-8"
          style={{ color: "var(--accent)" }}
        >
          The Final Note
        </p>
        <h2
          className="close-line font-serif text-4xl md:text-5xl lg:text-6xl leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Wear the <em style={{ color: "var(--accent)" }}>invisible</em>.
        </h2>
        <p
          className="close-line font-body text-base md:text-lg mt-8 leading-relaxed max-w-lg mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Begin your ritual. Choose a fragrance that does not announce you — but
          reveals you.
        </p>
        <Link
          to="/collection"
          className="close-line inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full border font-mono text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] hover:border-transparent"
          style={{
            borderColor: "var(--accent)",
            color: "var(--accent)",
          }}
        >
          Explore Collection
          <svg
            width="14"
            height="14"
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
        </Link>
      </div>
    </section>
  );
}
