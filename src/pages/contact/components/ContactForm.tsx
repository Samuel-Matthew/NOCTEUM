import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".form-item"), {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The form posts to readdy form endpoint via action attribute
    // This is just for UX feedback
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-36"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="w-full px-6 md:px-10 lg:px-14 max-w-3xl mx-auto">
        <p
          className="form-item font-mono text-[10px] tracking-[0.3em] uppercase mb-4 text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          Reach Out
        </p>
        <h2
          className="form-item font-serif text-3xl md:text-4xl text-center mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Write to Us
        </h2>
        <p
          className="form-item font-body text-sm text-center mb-16 max-w-md mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          For inquiries, bespoke consultations, or to discover more about our
          ateliers, send us a message.
        </p>

        {submitted ? (
          <div className="form-item flex flex-col items-center justify-center py-16 gap-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--accent-soft)" }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3
              className="font-serif text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Message Sent
            </h3>
            <p
              className="font-body text-sm text-center"
              style={{ color: "var(--text-secondary)" }}
            >
              Thank you for reaching out. Our concierge will respond within 24
              hours.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            action="https://readdy.ai/api/form/d82ro9cagmafep7uqmdg"
            method="POST"
            data-readdy-form
            id="contact-form"
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            <div className="form-item">
              <label
                className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full bg-transparent border-b py-3 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Your name"
              />
            </div>

            <div className="form-item">
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
                required
                maxLength={200}
                className="w-full bg-transparent border-b py-3 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-item">
              <label
                className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b py-3 font-body text-sm outline-none transition-colors focus:border-[var(--accent)] cursor-pointer"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="" disabled>
                  Select an inquiry
                </option>
                <option value="general">General Inquiry</option>
                <option value="consultation">Bespoke Consultation</option>
                <option value="wholesale">Wholesale & Partnerships</option>
                <option value="press">Press & Media</option>
                <option value="support">Order Support</option>
              </select>
            </div>

            <div className="form-item">
              <label
                className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={500}
                rows={4}
                className="w-full bg-transparent border-b py-3 font-body text-sm outline-none transition-colors focus:border-[var(--accent)] resize-none"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Tell us how we can assist you..."
              />
              <p
                className="font-mono text-[9px] mt-1 text-right"
                style={{ color: "var(--text-muted)" }}
              >
                {formData.message.length}/500
              </p>
            </div>

            <div className="form-item pt-4">
              <button
                type="submit"
                className="w-full py-4 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                <span className="relative z-10">Send Message</span>
                <span
                  className="absolute inset-0 origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
                  style={{ backgroundColor: "var(--text-primary)" }}
                />
                <span
                  className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                  style={{ color: "var(--bg-primary)" }}
                >
                  Send Message
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
