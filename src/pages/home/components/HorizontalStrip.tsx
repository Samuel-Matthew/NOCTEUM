import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/mocks/products";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const featuredProducts = products.slice(0, 6);

export default function HorizontalStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    let tween: gsap.core.Tween | null = null;

    const setupScroll = () => {
      // Force the container to be wider than viewport
      const items = inner.querySelectorAll("a");
      let totalWidth = 0;

      items.forEach((item) => {
        totalWidth += item.offsetWidth;
      });

      // Add gaps (5 gaps between 6 items)
      const gap = 24; // md:gap-8 = 2rem = 32px, but using computed
      totalWidth += gap * (items.length - 1);

      // Add padding
      const paddingLeft =
        parseInt(window.getComputedStyle(inner).paddingLeft) || 0;
      const paddingRight =
        parseInt(window.getComputedStyle(inner).paddingRight) || 0;
      totalWidth += paddingLeft + paddingRight;

      // Set explicit width
      inner.style.width = totalWidth + "px";

      const scrollWidth = inner.scrollWidth - section.clientWidth;
      console.log(
        "scrollWidth:",
        scrollWidth,
        "totalWidth:",
        totalWidth,
        "section.clientWidth:",
        section.clientWidth,
      );

      if (scrollWidth > 0) {
        tween = gsap.to(inner, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }
    };

    // Wait for layout
    setTimeout(setupScroll, 500);

    return () => {
      if (tween) {
        tween.kill();
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="px-6 md:px-10 lg:px-14 pt-20 pb-10">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Featured
        </p>
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          Curated Selections
        </h2>
      </div>

      <div
        ref={innerRef}
        className="flex items-stretch gap-6 md:gap-8 pl-6 md:pl-10 lg:pl-14 pr-[50vw] pb-20"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {featuredProducts.map((product, i) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            data-cursor="link"
            className="group relative flex-shrink-0 w-[280px] md:w-[340px] lg:w-[380px]"
          >
            <div
              className="relative aspect-[3/4] rounded-lg overflow-hidden mb-5 transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              >
                <span
                  className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 rounded-full border"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--text-primary)",
                  }}
                >
                  View
                </span>
              </div>
              {i === 0 && (
                <div
                  className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  Bestseller
                </div>
              )}
            </div>
            <div className="space-y-2">
              <p
                className="font-mono text-[10px] tracking-[0.15em] uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                {product.scentFamily}
              </p>
              <h3
                className="font-serif text-xl md:text-2xl group-hover:translate-x-1 transition-transform duration-300"
                style={{ color: "var(--text-primary)" }}
              >
                {product.name}
              </h3>
              <p
                className="font-mono text-sm"
                style={{ color: "var(--accent)" }}
              >
                From ${product.price30ml}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
