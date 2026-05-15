import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import OrderCard from "@/pages/orders/components/OrderCard";
import { loadOrders } from "@/mocks/orders";

export default function OrdersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [orders] = useState(() => loadOrders());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".orders-animate"), {
      y: 20,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
    });
  }, []);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const activeCount = orders.filter(
    (o) =>
      o.status === "shipped" ||
      o.status === "out_for_delivery" ||
      o.status === "processing",
  ).length;

  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <div ref={sectionRef}>
      {/* Stats */}
      <div className="orders-animate flex flex-wrap items-center gap-4 md:gap-8 mb-8">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-2xl"
            style={{ color: "var(--accent)" }}
          >
            {orders.length}
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Total Orders
          </span>
        </div>
        <div
          className="w-px h-6"
          style={{ backgroundColor: "var(--border)" }}
        />
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-2xl"
            style={{ color: "var(--accent)" }}
          >
            {activeCount}
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Active
          </span>
        </div>
        <div
          className="w-px h-6"
          style={{ backgroundColor: "var(--border)" }}
        />
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-2xl"
            style={{ color: "var(--accent)" }}
          >
            {deliveredCount}
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Delivered
          </span>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="orders-animate text-center py-16">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="mx-auto mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 9h18M9 21V9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2
            className="font-serif text-2xl mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            No Orders Yet
          </h2>
          <p
            className="font-body text-sm mb-8 max-w-sm mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Your order history will appear here once you make your first
            purchase.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              index={index}
              isExpanded={expandedId === order.id}
              onToggle={() => handleToggle(order.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
