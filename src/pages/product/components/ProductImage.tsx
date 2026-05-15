import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { Product } from "@/mocks/products";

export default function ProductImage({ product }: { product: Product }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !blobRef.current || !imgRef.current) return;

    // Entrance animation
    gsap.from(blobRef.current, {
      scale: 0.7,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.2,
    });
    gsap.from(imgRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.4,
    });

    // Parallax on scroll
    gsap.to(imgRef.current, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Blob morphing with subtle scale/shape animation
    gsap.to(blobRef.current, {
      scale: 1.05,
      borderRadius: "45% 55% 60% 40% / 55% 45% 55% 45%",
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [product.id]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center py-10 lg:py-20"
    >
      {/* Morphing blob */}
      <div
        ref={blobRef}
        className="absolute w-[80%] h-[90%] max-w-[420px] max-h-[520px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(60px)",
          borderRadius: "60% 40% 50% 50% / 40% 50% 60% 50%",
        }}
      />
      {/* Product image */}
      <div className="relative z-10 w-full max-w-[380px]">
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover object-top rounded-lg"
          loading="eager"
        />
      </div>
    </div>
  );
}
