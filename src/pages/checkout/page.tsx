import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OrderSummary from "./components/OrderSummary";
import ShippingForm, {
  type ShippingFormData,
  defaultShippingData,
} from "./components/ShippingForm";
import PaymentSection from "./components/PaymentSection";
import { saveOrder } from "@/mocks/orders";
import { calculateShipping } from "@/mocks/admin";
import type { Order, OrderItem } from "@/mocks/orders";

gsap.registerPlugin(ScrollTrigger);

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const heroRef = useRef<HTMLElement>(null);
  const [shippingData, setShippingData] =
    useState<ShippingFormData>(defaultShippingData);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.from(heroRef.current.querySelectorAll(".hero-item"), {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      const orderNum = `NC-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.random().toString(36).toUpperCase().slice(2, 4)}`;
      setOrderNumber(orderNum);

      // Save order to localStorage
      const orderItems: OrderItem[] = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        scentFamily: item.scentFamily,
      }));

      const shippingInfo = calculateShipping(totalPrice, shippingData.country);
      const shipping = shippingInfo.fee;
      const now = new Date().toISOString();
      const trackingEvents = [
        {
          status: "Order Placed",
          location: `${shippingData.city || "Paris"}, ${shippingData.country || "France"}`,
          timestamp: now,
          completed: true,
        },
        {
          status: "Processing",
          location: "Noctēum Atelier",
          timestamp: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          completed: true,
        },
        {
          status: "Shipped",
          location: "Paris Distribution Center",
          timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          completed: false,
        },
        {
          status: "In Transit",
          location: "Lyon Hub, France",
          timestamp: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
          completed: false,
        },
        {
          status: "Out for Delivery",
          location: `${shippingData.city || "Paris"}, ${shippingData.country || "France"}`,
          timestamp: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          completed: false,
        },
        {
          status: "Delivered",
          location: `${shippingData.address || "14 Rue de la Paix"}, ${shippingData.city || "Paris"}`,
          timestamp: new Date(Date.now() + 60 * 60 * 60 * 1000).toISOString(),
          completed: false,
        },
      ];

      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        date: now,
        status: "processing",
        items: orderItems,
        subtotal: totalPrice,
        shipping,
        total: totalPrice + shipping,
        shippingAddress: {
          firstName: shippingData.firstName || "Guest",
          lastName: shippingData.lastName || "Customer",
          street: shippingData.address || "14 Rue de la Paix",
          apartment: shippingData.apartment,
          city: shippingData.city || "Paris",
          country: shippingData.country || "France",
          postalCode: shippingData.postalCode || "75002",
        },
        trackingNumber: `DHL-${Math.floor(Math.random() * 10000000000)}-${(shippingData.country || "FR").slice(0, 2).toUpperCase()}`,
        carrier: "DHL Express",
        trackingEvents,
      };

      saveOrder(order);

      setIsSubmitting(false);
      setIsComplete(true);
      clearCart();
    }, 2500);
  };

  if (isComplete) {
    return (
      <main
        className="relative min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="text-center px-6 max-w-lg">
          <div
            className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--accent-soft)" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1
            className="font-serif text-3xl md:text-4xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Order Confirmed
          </h1>
          <p
            className="font-body text-sm mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Thank you for your purchase. Your order has been received.
          </p>
          <p
            className="font-mono text-xs mb-2"
            style={{ color: "var(--accent)" }}
          >
            ORDER #{orderNumber}
          </p>
          <Link
            to="/dashboard?tab=orders"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            View in Your Orders
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <p
            className="font-body text-xs mb-10 max-w-sm mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            A confirmation email has been sent to{" "}
            {shippingData.email || "your inbox"}. We will notify you once your
            fragrance ships.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border font-mono text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] hover:border-transparent"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Continue Shopping
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main
        className="relative min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="text-center px-6">
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
            <path
              d="M6 6h15l-1.5 9h-12z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
            <path d="M6 6L5 3H2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1
            className="font-serif text-3xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Your Cart is Empty
          </h1>
          <p
            className="font-body text-sm mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Add a fragrance to your cart before proceeding to checkout.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border font-mono text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] hover:border-transparent"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Explore Collection
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  const shippingInfo = calculateShipping(totalPrice, shippingData.country);
  const shipping = shippingInfo.fee;

  return (
    <main
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative w-full pt-28 md:pt-36 pb-12 md:pb-16"
      >
        <div className="w-full px-6 md:px-10 lg:px-14 max-w-6xl mx-auto">
          <Link
            to="/collection"
            className="hero-item inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Continue Shopping</span>
          </Link>
          <h1
            className="hero-item font-serif text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            Checkout
          </h1>
        </div>
      </section>

      {/* Form + Summary */}
      <section className="relative w-full pb-28 md:pb-36">
        <div className="w-full px-6 md:px-10 lg:px-14 max-w-6xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16"
          >
            {/* Left — Shipping + Payment */}
            <div className="space-y-14">
              <ShippingForm
                formData={shippingData}
                onChange={setShippingData}
              />

              <div
                className="h-px"
                style={{ backgroundColor: "var(--border)" }}
              />

              <PaymentSection
                selectedMethod={paymentMethod}
                onSelect={setPaymentMethod}
              />

              {/* Place Order */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10">
                        Place Order — ${(totalPrice + shipping).toFixed(2)}
                      </span>
                      <span
                        className="absolute inset-0 origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
                        style={{ backgroundColor: "var(--text-primary)" }}
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                        style={{ color: "var(--bg-primary)" }}
                      >
                        Place Order — ${(totalPrice + shipping).toFixed(2)}
                      </span>
                    </>
                  )}
                </button>
                <p
                  className="font-mono text-[9px] text-center mt-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className="lg:pt-2">
              <OrderSummary />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
