import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { products } from "@/mocks/products";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Perfume", "Cologne", "Deodorant"];

interface ProductGridProps {
  activeScent: string;
}

export default function ProductGrid({ activeScent }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = products.filter((p) => {
    const catMatch =
      activeCategory === "All" || p.category === activeCategory.toLowerCase();
    const scentMatch = activeScent === "All" || p.scentFamily === activeScent;
    return catMatch && scentMatch;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  // Stagger reveal on scroll
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [visible.map((p) => p.id).join(",")]);

  const loadMore = () => {
    setVisibleCount((c) => c + 6);
  };

  return (
    <div className="relative">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 md:gap-4 mb-10 md:mb-14 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(9);
            }}
            className="px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border"
            style={{
              borderColor:
                activeCategory === cat ? "var(--accent)" : "transparent",
              backgroundColor:
                activeCategory === cat ? "var(--card-bg)" : "transparent",
              color:
                activeCategory === cat
                  ? "var(--accent)"
                  : "var(--text-secondary)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {visible.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`group relative ${
              i === 0 || i === 4 || i === 8 ? "lg:col-span-1 lg:row-span-1" : ""
            }`}
          >
            <Link
              to={`/product/${product.id}`}
              data-cursor="link"
              className="block"
            >
              {/* Image area */}
              <div
                className="relative aspect-[3/4] rounded-lg overflow-hidden mb-5 transition-all duration-500"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover gradient wash */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, var(--accent) 0%, transparent 50%)",
                    opacity: 0.08,
                  }}
                />
                {/* Ghost CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border"
                    style={{
                      borderColor: "var(--accent)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Explore
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p
                    className="font-mono text-[9px] tracking-[0.15em] uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {product.scentFamily}
                  </p>
                  {/* Size options */}
                  <div className="flex items-center gap-2">
                    {["30ml", "50ml", "100ml"].map((size) => (
                      <span
                        key={size}
                        className="font-mono text-[9px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                <h3
                  className="font-serif text-xl md:text-2xl group-hover:-translate-y-1 transition-transform duration-300"
                  style={{ color: "var(--text-primary)" }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-1">
                  <p
                    className="font-mono text-sm"
                    style={{ color: "var(--accent)" }}
                  >
                    ${product.price30ml} — ${product.price100ml}
                  </p>
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "var(--accent)" }}
                  >
                    Add
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-16">
          <button
            onClick={loadMore}
            data-cursor="cta"
            className="px-10 py-4 rounded-full border font-mono text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] hover:border-transparent"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
