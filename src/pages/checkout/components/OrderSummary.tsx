import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { calculateShipping } from "@/mocks/admin";

gsap.registerPlugin(ScrollTrigger);

export default function OrderSummary() {
  const { items, totalPrice } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const shippingInfo = calculateShipping(totalPrice);
  const shipping = shippingInfo.fee;
  const total = totalPrice + shipping;

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".summary-item"), {
      x: 20,
      opacity: 0,
      stagger: 0.06,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="rounded-lg p-6 md:p-8 lg:sticky lg:top-28"
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--border)",
      }}
    >
      <h3
        className="summary-item font-serif text-xl mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Order Summary
      </h3>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="summary-item flex gap-3"
          >
            <div
              className="w-14 h-16 rounded overflow-hidden flex-shrink-0"
              style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                to={`/product/${item.productId}`}
                className="font-serif text-sm hover:opacity-70 transition-opacity block truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {item.name}
              </Link>
              <p
                className="font-mono text-[10px] mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.size} × {item.quantity}
              </p>
              <p
                className="font-mono text-xs mt-1"
                style={{ color: "var(--accent)" }}
              >
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className="summary-item h-px mb-6"
        style={{ backgroundColor: "var(--border)" }}
      />

      {/* Totals */}
      <div className="space-y-3 mb-6">
        <div className="summary-item flex items-center justify-between">
          <span
            className="font-body text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Subtotal
          </span>
          <span
            className="font-mono text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="summary-item flex items-center justify-between">
          <span
            className="font-body text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Shipping
          </span>
          <span
            className="font-mono text-sm"
            style={{
              color: shipping === 0 ? "var(--accent)" : "var(--text-primary)",
            }}
          >
            {shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {shipping > 0 && (
          <p
            className="summary-item font-mono text-[9px]"
            style={{ color: "var(--text-muted)" }}
          >
            Free shipping on qualifying orders
          </p>
        )}
      </div>

      {/* Divider */}
      <div
        className="summary-item h-px mb-6"
        style={{ backgroundColor: "var(--border)" }}
      />

      {/* Total */}
      <div className="summary-item flex items-center justify-between mb-2">
        <span
          className="font-serif text-lg"
          style={{ color: "var(--text-primary)" }}
        >
          Total
        </span>
        <span
          className="font-serif text-2xl"
          style={{ color: "var(--accent)" }}
        >
          ${total.toFixed(2)}
        </span>
      </div>
      <p
        className="summary-item font-mono text-[9px] text-right"
        style={{ color: "var(--text-muted)" }}
      >
        Including all taxes
      </p>
    </div>
  );
}
