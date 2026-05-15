import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PaymentSectionProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

const METHODS = [
  {
    id: "card",
    label: "Credit Card",
    description: "Visa, Mastercard, Amex",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Fast and secure checkout",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 11l3-9h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-3l-1 3-1 5H7l2-8z" />
      </svg>
    ),
  },
  {
    id: "apple",
    label: "Apple Pay",
    description: "Pay with your Apple device",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 6c-1.5 0-3 .5-3 2.5 0 2 2 2.5 3 2.5s3-.5 3-2.5c0-2-1.5-2.5-3-2.5z" />
        <path d="M9 11c-2 0-3 2-3 4.5 0 3.5 3 5.5 6 5.5s6-2 6-5.5c0-2.5-1-4.5-3-4.5" />
      </svg>
    ),
  },
];

export default function PaymentSection({
  selectedMethod,
  onSelect,
}: PaymentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".payment-item"), {
      y: 20,
      opacity: 0,
      stagger: 0.08,
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
    <div ref={sectionRef} className="space-y-6">
      <h3
        className="payment-item font-serif text-xl"
        style={{ color: "var(--text-primary)" }}
      >
        Payment Method
      </h3>

      <div className="space-y-3">
        {METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={`payment-item w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 text-left ${
              selectedMethod === method.id
                ? "border-[var(--accent)]"
                : "hover:border-[var(--text-secondary)]"
            }`}
            style={{
              borderColor:
                selectedMethod === method.id
                  ? "var(--accent)"
                  : "var(--border)",
              backgroundColor:
                selectedMethod === method.id
                  ? "var(--accent-soft)"
                  : "var(--card-bg)",
            }}
          >
            <span
              className="w-10 h-10 flex items-center justify-center flex-shrink-0"
              style={{ color: "var(--accent)" }}
            >
              {method.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="font-serif text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {method.label}
              </p>
              <p
                className="font-body text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {method.description}
              </p>
            </div>
            <span
              className="w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors"
              style={{
                borderColor:
                  selectedMethod === method.id
                    ? "var(--accent)"
                    : "var(--border)",
              }}
            >
              {selectedMethod === method.id && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Card details mock fields */}
      {selectedMethod === "card" && (
        <div
          className="payment-item space-y-6 mt-6 p-4 rounded-lg"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
          }}
        >
          <div>
            <label
              className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              onFocus={() => setFocusedField("cardNumber")}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent border-b py-3 font-mono text-sm outline-none transition-colors"
              style={{
                borderColor:
                  focusedField === "cardNumber"
                    ? "var(--accent)"
                    : "var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label
                className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Expiry
              </label>
              <input
                type="text"
                name="expiry"
                placeholder="MM / YY"
                maxLength={7}
                onFocus={() => setFocusedField("expiry")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b py-3 font-mono text-sm outline-none transition-colors"
                style={{
                  borderColor:
                    focusedField === "expiry"
                      ? "var(--accent)"
                      : "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                placeholder="123"
                maxLength={4}
                onFocus={() => setFocusedField("cvc")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b py-3 font-mono text-sm outline-none transition-colors"
                style={{
                  borderColor:
                    focusedField === "cvc" ? "var(--accent)" : "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
