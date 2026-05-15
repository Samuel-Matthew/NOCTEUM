import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.from(quoteRef.current.querySelectorAll(".quote-line"), {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center px-6 md:px-10 lg:px-14 pt-24 md:pt-32"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div ref={quoteRef} className="text-center max-w-4xl mx-auto">
        <p
          className="quote-line font-mono text-[10px] tracking-[0.3em] uppercase mb-8"
          style={{ color: "var(--accent)" }}
        >
          The Ritual
        </p>
        <blockquote
          className="quote-line font-serif text-3xl md:text-4xl lg:text-5xl leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          &ldquo;To wear a fragrance is to write a signature in air — invisible,
          permanent, and unmistakably yours.&rdquo;
        </blockquote>
        <p
          className="quote-line font-body text-sm mt-8 tracking-wide"
          style={{ color: "var(--text-secondary)" }}
        >
          — NOCTĒUM Philosophy
        </p>
      </div>
    </section>
  );
}
