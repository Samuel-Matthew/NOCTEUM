import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MoleculeSVG from "./components/MoleculeSVG";
import ScentSidebar from "./components/ScentSidebar";
import ProductGrid from "./components/ProductGrid";
import Footer from "@/components/feature/Footer";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
  const [activeScent, setActiveScent] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    tl.from(headerRef.current.querySelectorAll(".header-item"), {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <main
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-10 lg:px-14"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="space-y-4">
            <p
              className="header-item font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--text-secondary)" }}
            >
              Our Offerings
            </p>
            <h1
              className="header-item font-serif text-4xl md:text-5xl lg:text-6xl"
              style={{ color: "var(--text-primary)" }}
            >
              The Collection
            </h1>
          </div>
          <div className="header-item flex-shrink-0 opacity-60">
            <MoleculeSVG />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 lg:px-14 pb-20 md:pb-32">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Sidebar */}
          <aside className="lg:w-44 flex-shrink-0">
            <ScentSidebar activeScent={activeScent} onChange={setActiveScent} />
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid activeScent={activeScent} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
