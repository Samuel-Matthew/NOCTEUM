import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Order, TrackingEvent } from "@/mocks/orders";
import {
  formatDate,
  formatTime,
  getStatusLabel,
  getStatusColor,
} from "@/mocks/orders";

interface OrderCardProps {
  order: Order;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const nodes = timelineRef.current.querySelectorAll(".timeline-node");
    gsap.from(nodes, {
      scale: 0,
      opacity: 0,
      stagger: 0.08,
      duration: 0.4,
      ease: "back.out(1.7)",
      delay: 0.1,
    });
  }, []);

  return (
    <div ref={timelineRef} className="relative pl-2">
      <div
        className="absolute left-[15px] top-2 bottom-2 w-px"
        style={{ backgroundColor: "var(--border)" }}
      />
      <div className="space-y-6">
        {events.map((event, i) => {
          const isCompleted = event.completed;
          const isLastCompleted =
            isCompleted &&
            (i === events.length - 1 || !events[i + 1]?.completed);

          return (
            <div key={i} className="flex items-start gap-4 relative">
              <div
                className={`timeline-node relative z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  isCompleted ? "scale-100" : "scale-90 opacity-40"
                }`}
                style={{
                  backgroundColor: isCompleted
                    ? isLastCompleted
                      ? "var(--accent-soft)"
                      : "var(--bg-primary)"
                    : "var(--bg-primary)",
                  border: `1.5px solid ${isCompleted ? getStatusColor("delivered") : "var(--border)"}`,
                }}
              >
                {isCompleted ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isLastCompleted ? "var(--accent)" : "#10B981"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--border)" }}
                  />
                )}
                {isLastCompleted && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: "var(--accent)",
                      opacity: 0.15,
                    }}
                  />
                )}
              </div>
              <div className="pt-1">
                <p
                  className="font-mono text-[11px] tracking-wide uppercase"
                  style={{
                    color: isCompleted
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                  }}
                >
                  {event.status}
                </p>
                <p
                  className="font-body text-xs mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {event.location}
                </p>
                <p
                  className="font-mono text-[10px] mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatDate(event.timestamp)} at {formatTime(event.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrderCard({
  order,
  index,
  isExpanded,
  onToggle,
}: OrderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [, setDetailHeight] = useState(0);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: index * 0.1,
    });
  }, [index]);

  useEffect(() => {
    if (!detailRef.current) return;
    if (isExpanded) {
      const height = detailRef.current.scrollHeight;
      setDetailHeight(height);
      gsap.to(detailRef.current, {
        height,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(detailRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [isExpanded]);

  const statusLabel = getStatusLabel(order.status);
  const statusColor = getStatusColor(order.status);

  return (
    <div
      ref={cardRef}
      className="rounded-lg overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header — Always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex flex-col">
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Order
            </span>
            <span
              className="font-mono text-sm tracking-wider mt-0.5"
              style={{ color: "var(--text-primary)" }}
            >
              {order.orderNumber}
            </span>
          </div>
          <div
            className="hidden sm:block w-px h-8"
            style={{ backgroundColor: "var(--border)" }}
          />
          <div className="flex flex-col">
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Date
            </span>
            <span
              className="font-body text-sm mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {formatDate(order.date)}
            </span>
          </div>
          <div
            className="hidden md:block w-px h-8"
            style={{ backgroundColor: "var(--border)" }}
          />
          <div className="hidden md:flex items-center gap-3">
            {order.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="w-10 h-12 rounded overflow-hidden flex-shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
            {order.items.length > 3 && (
              <span
                className="font-mono text-[10px]"
                style={{ color: "var(--text-muted)" }}
              >
                +{order.items.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-end">
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Total
            </span>
            <span
              className="font-serif text-lg mt-0.5"
              style={{ color: "var(--text-primary)" }}
            >
              ${order.total.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase"
              style={{
                backgroundColor: `${statusColor}15`,
                color: statusColor,
                border: `1px solid ${statusColor}30`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: statusColor }}
              />
              {statusLabel}
            </span>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-180"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Expandable Detail */}
      <div
        ref={detailRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-5 md:px-6 pb-6 pt-2">
          <div
            className="h-px mb-6"
            style={{ backgroundColor: "var(--border)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Items */}
            <div>
              <h4
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Items
              </h4>
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-14 h-[70px] rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-serif text-sm truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="font-mono text-[10px] mt-0.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.size} &middot; {item.scentFamily}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className="font-mono text-xs"
                        style={{ color: "var(--text-primary)" }}
                      >
                        ${item.price.toFixed(2)}
                      </p>
                      <p
                        className="font-mono text-[10px] mt-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 pt-4 space-y-2"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex justify-between">
                  <span
                    className="font-body text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className="font-body text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Shipping
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {order.shipping === 0
                      ? "Complimentary"
                      : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div
                  className="flex justify-between pt-2"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <span
                    className="font-body text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Total
                  </span>
                  <span
                    className="font-serif text-lg"
                    style={{ color: "var(--accent)" }}
                  >
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking + Shipping */}
            <div className="space-y-8">
              {/* Tracking */}
              <div>
                <h4
                  className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Tracking
                </h4>
                <div
                  className="rounded-md p-4 mb-4"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p
                        className="font-mono text-xs"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {order.trackingNumber}
                      </p>
                      <p
                        className="font-mono text-[10px] mt-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {order.carrier}
                      </p>
                    </div>
                    <a
                      href={`https://www.google.com/search?q=${order.carrier} ${order.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[9px] tracking-wider uppercase transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: "var(--accent-soft)",
                        color: "var(--accent)",
                      }}
                    >
                      Track
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7v10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <TrackingTimeline events={order.trackingEvents} />
              </div>

              {/* Shipping Address */}
              <div>
                <h4
                  className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Shipping Address
                </h4>
                <div
                  className="rounded-md p-4"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="font-body text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p
                    className="font-body text-sm mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {order.shippingAddress.street}
                    {order.shippingAddress.apartment &&
                      `, ${order.shippingAddress.apartment}`}
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
