import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ShippingFormProps {
  formData: ShippingFormData;
  onChange: (data: ShippingFormData) => void;
}

export interface ShippingFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

export const defaultShippingData: ShippingFormData = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  country: "",
  postalCode: "",
  phone: "",
};

export default function ShippingForm({
  formData,
  onChange,
}: ShippingFormProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".form-field"), {
      y: 30,
      opacity: 0,
      stagger: 0.05,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    onChange({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = (fieldName: string) =>
    `w-full bg-transparent border-b py-3 font-body text-sm outline-none transition-colors ${
      focusedField === fieldName ? "border-[var(--accent)]" : ""
    }`;

  return (
    <div ref={sectionRef} className="space-y-10">
      {/* Contact */}
      <div>
        <h3
          className="form-field font-serif text-xl mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Contact
        </h3>
        <div className="form-field">
          <label
            className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            required
            maxLength={200}
            className={inputClasses("email")}
            style={{
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3
          className="form-field font-serif text-xl mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Shipping Address
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="form-field">
            <label
              className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={() => setFocusedField("firstName")}
              onBlur={() => setFocusedField(null)}
              required
              maxLength={100}
              className={inputClasses("firstName")}
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="First name"
            />
          </div>
          <div className="form-field">
            <label
              className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField(null)}
              required
              maxLength={100}
              className={inputClasses("lastName")}
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="form-field mt-8">
          <label
            className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onFocus={() => setFocusedField("address")}
            onBlur={() => setFocusedField(null)}
            required
            maxLength={200}
            className={inputClasses("address")}
            style={{
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            placeholder="Street address"
          />
        </div>

        <div className="form-field mt-8">
          <label
            className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            Apartment, Suite, etc. (Optional)
          </label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            onFocus={() => setFocusedField("apartment")}
            onBlur={() => setFocusedField(null)}
            maxLength={100}
            className={inputClasses("apartment")}
            style={{
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            placeholder="Apt, suite, floor, etc."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div className="form-field">
            <label
              className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onFocus={() => setFocusedField("city")}
              onBlur={() => setFocusedField(null)}
              required
              maxLength={100}
              className={inputClasses("city")}
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="City"
            />
          </div>
          <div className="form-field">
            <label
              className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              onFocus={() => setFocusedField("country")}
              onBlur={() => setFocusedField(null)}
              required
              className={`${inputClasses("country")} cursor-pointer`}
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <option value="" disabled>
                Select country
              </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="JP">Japan</option>
              <option value="AU">Australia</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="NL">Netherlands</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div className="form-field">
            <label
              className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              onFocus={() => setFocusedField("postalCode")}
              onBlur={() => setFocusedField(null)}
              required
              maxLength={20}
              className={inputClasses("postalCode")}
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="ZIP / Postal code"
            />
          </div>
          <div className="form-field">
            <label
              className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Phone (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              maxLength={30}
              className={inputClasses("phone")}
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
