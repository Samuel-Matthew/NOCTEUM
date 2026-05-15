import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import HeroWave from "./HeroWave";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const scrollLine = scrollLineRef.current;
    if (!section || !headline || !sub || !cta || !scrollLine) return;

    const tl = gsap.timeline({ delay: 2.8 }); // after preloader

    // Headline clip reveal
    tl.from(headline, {
      clipPath: "inset(100% 0 0 0)",
      y: 60,
      duration: 1.4,
      ease: "power4.out",
    });

    // Subtext fade
    tl.from(
      sub,
      {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6",
    );

    // CTA
    tl.from(
      cta,
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    );

    // Scroll line pulse
    gsap.to(scrollLine, {
      y: 12,
      opacity: 0.3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            top: "-10%",
            left: "-5%",
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            bottom: "10%",
            right: "-10%",
            background:
              "radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={headlineRef}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
          style={{
            color: "var(--text-primary)",
            clipPath: "inset(0 0 0 0)",
          }}
        >
          <span className="block">Wear the</span>
          <span className="block italic" style={{ color: "var(--accent)" }}>
            Invisible
          </span>
        </h1>

        <p
          ref={subRef}
          className="font-body text-base md:text-lg mt-8 md:mt-10 max-w-lg mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Artisan perfumes, colognes, and deodorants crafted for those who
          understand that scent is the most powerful form of presence.
        </p>

        <Link
          ref={ctaRef}
          to="/collection"
          data-cursor="cta"
          className="inline-flex items-center gap-3 mt-10 md:mt-12 px-8 py-4 rounded-full border font-mono text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] hover:border-transparent"
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

      {/* Sine wave SVG */}
      <HeroWave />

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="font-mono text-[9px] tracking-[0.3em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-8 relative overflow-hidden"
          style={{ backgroundColor: "var(--border)" }}
        >
          <div
            ref={scrollLineRef}
            className="absolute top-0 left-0 w-full h-3"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </div>
      </div> */}
    </section>
  );
}
