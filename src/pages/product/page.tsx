import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "react-router-dom";
import { products } from "@/mocks/products";
import ProductImage from "./components/ProductImage";
import ProductDetails from "./components/ProductDetails";
import NotesAccordion from "./components/NotesAccordion";
import ScentTimeline from "./components/ScentTimeline";
import RelatedProducts from "./components/RelatedProducts";
import Footer from "@/components/feature/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".product-reveal");
    gsap.from(els, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, [id]);

  if (!product) {
    return (
      <main
        className="relative min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="text-center px-6">
          <h1
            className="font-serif text-4xl md:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Product Not Found
          </h1>
          <p
            className="font-body text-sm mt-4"
            style={{ color: "var(--text-secondary)" }}
          >
            This fragrance has vanished into the ether.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Top spacing for nav */}
      <div className="pt-24 md:pt-32" />

      {/* Hero Split */}
      <div className="px-6 md:px-10 lg:px-14 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <ProductImage product={product} />
          <ProductDetails product={product} />
        </div>
      </div>

      {/* Notes Accordion */}
      <section
        className="px-6 md:px-10 lg:px-14 py-16 md:py-24 product-reveal"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <NotesAccordion notes={product.notes} />
      </section>

      {/* Scent Journey */}
      <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 product-reveal">
        <ScentTimeline notes={product.notes} />
      </section>

      {/* Related */}
      <section className="px-6 md:px-10 lg:px-14 pb-20 md:pb-32 product-reveal">
        <RelatedProducts relatedIds={product.relatedIds} />
      </section>

      <Footer />
    </main>
  );
}
