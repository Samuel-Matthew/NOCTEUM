import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(panelRef.current, {
        x: "100%",
        duration: 0.35,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!listRef.current || !isOpen) return;
    const children = listRef.current.children;
    if (!children.length) return;
    gsap.from(children, {
      x: 30,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.15,
    });
  }, [isOpen, items.length]);

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeCart();
  };

  return (
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      className="fixed inset-0 z-[60] opacity-0"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col"
        style={{
          backgroundColor: "var(--bg-primary)",
          transform: "translateX(100%)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2
            className="font-serif text-xl tracking-wide"
            style={{ color: "var(--text-primary)" }}
          >
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            aria-label="Close cart"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ color: "var(--text-primary)" }}
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-5"
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                style={{ color: "var(--text-secondary)" }}
              >
                <path
                  d="M6 6h15l-1.5 9h-12z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="20"
                  r="1.5"
                  fill="currentColor"
                  stroke="none"
                />
                <circle
                  cx="18"
                  cy="20"
                  r="1.5"
                  fill="currentColor"
                  stroke="none"
                />
                <path
                  d="M6 6L5 3H2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className="font-body text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Your cart is empty
              </p>
              <Link
                to="/collection"
                onClick={closeCart}
                className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-2.5 rounded-full border transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)]"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-4"
              >
                <div
                  className="w-20 h-24 rounded-md overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: "var(--card-bg)" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className="font-mono text-[9px] tracking-[0.15em] uppercase"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.scentFamily}
                      </p>
                      <Link
                        to={`/product/${item.productId}`}
                        onClick={closeCart}
                        className="font-serif text-base block mt-0.5 hover:opacity-70 transition-opacity"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 transition-opacity hover:opacity-70"
                      aria-label="Remove item"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <p
                    className="font-mono text-xs mt-1"
                    style={{ color: "var(--accent)" }}
                  >
                    ${item.price} — {item.size}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity - 1,
                        )
                      }
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                      style={{
                        backgroundColor: "var(--card-bg)",
                        color: "var(--text-primary)",
                      }}
                      aria-label="Decrease quantity"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14" strokeLinecap="round" />
                      </svg>
                    </button>
                    <span
                      className="font-mono text-xs w-4 text-center"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity + 1,
                        )
                      }
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                      style={{
                        backgroundColor: "var(--card-bg)",
                        color: "var(--text-primary)",
                      }}
                      aria-label="Increase quantity"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5v14" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="flex-shrink-0 px-6 py-5 space-y-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
              <span
                className="font-serif text-xl"
                style={{ color: "var(--text-primary)" }}
              >
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p
              className="font-body text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Shipping calculated at checkout
            </p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="w-full py-3.5 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 text-center block"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="w-full py-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
              style={{ color: "var(--text-secondary)" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
