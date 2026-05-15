import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import type { Product } from "@/mocks/products";
import { useCart } from "@/context/CartContext";

const SIZES: {
  label: "30ml" | "50ml" | "100ml";
  priceKey: "price30ml" | "price50ml" | "price100ml";
}[] = [
  { label: "30ml", priceKey: "price30ml" },
  { label: "50ml", priceKey: "price50ml" },
  { label: "100ml", priceKey: "price100ml" },
];

export default function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<"30ml" | "50ml" | "100ml">(
    "50ml",
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  const currentPrice =
    product[SIZES.find((s) => s.label === selectedSize)!.priceKey];

  useEffect(() => {
    if (!infoRef.current) return;
    const els = infoRef.current.querySelectorAll(".info-reveal");
    gsap.from(els, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
  }, [product.id]);

  const inc = () => setQuantity((q) => q + 1);
  const dec = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div ref={infoRef} className="flex flex-col gap-6 md:gap-8 pt-4 lg:pt-16">
      {/* Category + Name */}
      <div className="info-reveal">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          {product.category} — {product.scentFamily}
        </p>
        <h1
          className="font-serif text-3xl md:text-4xl lg:text-5xl mt-3 leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {product.name}
        </h1>
      </div>

      {/* Price */}
      <div className="info-reveal">
        <p
          className="font-serif text-2xl md:text-3xl"
          style={{ color: "var(--accent)" }}
        >
          ${currentPrice}
        </p>
        <p
          className="font-body text-sm mt-3 leading-relaxed max-w-md"
          style={{ color: "var(--text-secondary)" }}
        >
          {product.description}
        </p>
      </div>

      {/* Size Selector */}
      <div className="info-reveal">
        <p
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Select Size
        </p>
        <div className="flex items-center gap-3">
          {SIZES.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size.label)}
              className="px-5 py-2.5 rounded-full font-mono text-[11px] tracking-wider uppercase transition-all duration-300 border"
              style={{
                borderColor:
                  selectedSize === size.label
                    ? "var(--accent)"
                    : "var(--border)",
                backgroundColor:
                  selectedSize === size.label
                    ? "var(--card-bg)"
                    : "transparent",
                color:
                  selectedSize === size.label
                    ? "var(--accent)"
                    : "var(--text-secondary)",
              }}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="info-reveal flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={dec}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--text-primary)",
            }}
            aria-label="Decrease quantity"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
          <span
            className="font-mono text-sm w-6 text-center"
            style={{ color: "var(--text-primary)" }}
          >
            {quantity}
          </span>
          <button
            onClick={inc}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--text-primary)",
            }}
            aria-label="Increase quantity"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5v14" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => {
            for (let i = 0; i < quantity; i++) {
              addItem({
                productId: product.id,
                name: product.name,
                size: selectedSize,
                price: currentPrice,
                image: product.image,
                scentFamily: product.scentFamily,
              });
            }
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className="relative overflow-hidden px-10 py-3.5 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-500 group"
          style={{
            border: "1px solid var(--accent)",
            color: added ? "var(--bg-primary)" : "var(--accent)",
            backgroundColor: added ? "var(--accent)" : "transparent",
          }}
        >
          <span className="relative z-10">
            {added ? "Added to Cart" : "Add to Cart"}
          </span>
          {!added && (
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ backgroundColor: "var(--accent)" }}
            />
          )}
          {!added && (
            <span
              className="absolute inset-0 z-10 flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-500 font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--bg-primary)" }}
            >
              Add to Cart
            </span>
          )}
        </button>
      </div>

      {/* Shipping note */}
      <p
        className="info-reveal font-body text-xs"
        style={{ color: "var(--text-secondary)" }}
      >
        Complimentary shipping on orders over $300. 30-day satisfaction
        guarantee.
      </p>
    </div>
  );
}
