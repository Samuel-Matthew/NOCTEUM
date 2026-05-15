import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MapSection from "./components/MapSection";
import ContactForm from "./components/ContactForm";
import PressBlock from "./components/PressBlock";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.from(heroRef.current.querySelectorAll(".hero-item"), {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  return (
    <main
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative w-full pt-32 md:pt-40 pb-20 md:pb-28"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="w-full px-6 md:px-10 lg:px-14 max-w-4xl mx-auto text-center">
          <p
            className="hero-item font-mono text-[10px] tracking-[0.3em] uppercase mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            NOCTĒUM
          </p>
          <h1
            className="hero-item font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="block">Get in</span>
            <span className="block italic" style={{ color: "var(--accent)" }}>
              Touch
            </span>
          </h1>
          <p
            className="hero-item font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Visit one of our ateliers, write to our concierge, or request a
            bespoke fragrance consultation.
          </p>
        </div>
      </section>

      <MapSection />
      <ContactForm />
      <PressBlock />
    </main>
  );
}
