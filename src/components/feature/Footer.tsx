import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
    tl.from(footerRef.current.querySelectorAll(".footer-item"), {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full mt-20"
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div className="w-full px-6 md:px-10 lg:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="footer-item">
            <h3
              className="font-serif text-2xl md:text-3xl tracking-wide mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              NOCTĒUM
            </h3>
            <p
              className="font-body text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Artisan fragrances crafted for the discerning. Each scent tells a
              story of origin, craft, and the invisible art of presence.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-item">
            <h4
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              EXPLORE
            </h4>
            <ul className="space-y-3">
              {["Home", "Collection", "The Ritual", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace("the ", "")}`
                    }
                    className="font-body text-sm hover:opacity-70 transition-opacity"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer-item">
            <h4
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              FOLLOW
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Instagram", icon: "ri-instagram-line" },
                { name: "YouTube", icon: "ri-youtube-line" },
                { name: "Pinterest", icon: "ri-pinterest-line" },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href="#"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      <i
                        className={social.icon}
                        style={{ color: "var(--accent)", fontSize: 16 }}
                      />
                    </span>
                    <span
                      className="font-body text-sm group-hover:opacity-70 transition-opacity"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {social.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-item">
            <h4
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              STAY INFORMED
            </h4>
            <p
              className="font-body text-sm mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              New releases and exclusive invitations.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border-b font-body text-sm py-2 px-1 outline-none focus:border-opacity-60 transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ backgroundColor: "var(--accent)" }}
                aria-label="Subscribe"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--bg-primary)"
                  strokeWidth="2"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="font-mono text-[10px] tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            © 2026 NOCTĒUM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Shipping"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono text-[10px] tracking-wider hover:opacity-70 transition-opacity"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
