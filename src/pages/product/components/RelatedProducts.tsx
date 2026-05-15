import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/mocks/products";

gsap.registerPlugin(ScrollTrigger);

export default function RelatedProducts({
  relatedIds,
}: {
  relatedIds: string[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const related = products.filter((p) => relatedIds.includes(p.id));

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [relatedIds]);

  if (!related.length) return null;

  return (
    <section ref={sectionRef}>
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <div>
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            Curated for You
          </p>
          <h2
            className="font-serif text-2xl md:text-3xl mt-2"
            style={{ color: "var(--text-primary)" }}
          >
            You May Also Like
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {related.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="group"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div
                className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 transition-all duration-500"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                >
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
              <div className="space-y-1">
                <p
                  className="font-mono text-[9px] tracking-[0.15em] uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {product.scentFamily}
                </p>
                <h3
                  className="font-serif text-lg group-hover:-translate-y-0.5 transition-transform duration-300"
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
          </div>
        ))}
      </div>
    </section>
  );
}
