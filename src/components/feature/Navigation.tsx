import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import gsap from "gsap";

const NAV_LINKS = [
  { path: "/", label: "HOME" },
  { path: "/collection", label: "COLLECTION" },
  { path: "/ritual", label: "THE RITUAL" },
  { path: "/contact", label: "CONTACT" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;
    const paths = iconRef.current.querySelectorAll("path");
    if (theme === "dark") {
      gsap.to(paths[0], { opacity: 1, duration: 0.3 });
      gsap.to(paths[1], { opacity: 0, duration: 0.3 });
    } else {
      gsap.to(paths[0], { opacity: 0, duration: 0.3 });
      gsap.to(paths[1], { opacity: 1, duration: 0.3 });
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 group"
      aria-label="Toggle theme"
    >
      <svg
        ref={iconRef}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="transition-colors"
        style={{ color: "var(--accent)" }}
      >
        {/* Moon */}
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          opacity={theme === "dark" ? 1 : 0}
        />
        {/* Sun ring */}
        <path
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"
          opacity={theme === "light" ? 1 : 0}
        />
      </svg>
      <span
        className="font-mono text-[10px] tracking-[0.2em] uppercase hidden sm:inline"
        style={{ color: "var(--text-secondary)" }}
      >
        {theme === "dark" ? "OBSCUR" : "LUMIÈRE"}
      </span>
    </button>
  );
}

function MonogramLogo() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  return (
    <Link to="/" className="flex items-center gap-3 group">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          ref={pathRef}
          d="M8 26V6l8 12 8-12v20"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        className="font-serif text-lg tracking-wide"
        style={{ color: "var(--text-primary)" }}
      >
        NOCTĒUM
      </span>
    </Link>
  );
}

function AccountDropdown() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <Link
        to="/auth"
        className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
        style={{ color: "var(--text-secondary)" }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path
            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Sign In
      </Link>
    );
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div ref={dropdownRef} className="relative hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 group"
        aria-label="Account menu"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center font-serif text-[11px]"
          style={{
            backgroundColor: "var(--accent-soft)",
            color: "var(--bg-primary)",
          }}
        >
          {initials}
        </div>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden py-2"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="px-4 py-2 mb-1"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <p
              className="font-body text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              {user.firstName} {user.lastName}
            </p>
            <p
              className="font-mono text-[9px] mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {user.email}
            </p>
          </div>
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors hover:bg-[var(--bg-primary)]"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Dashboard
          </Link>
          <Link
            to="/dashboard?tab=orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors hover:bg-[var(--bg-primary)]"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
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
            Orders
          </Link>
          <button
            onClick={() => {
              logout();
              setOpen(false);
              navigate("/");
            }}
            className="w-full text-left flex items-center gap-3 px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors hover:bg-[var(--bg-primary)]"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const location = useLocation();
  const { toggleCart, totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const underlineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Move underline to active link — measure relative to the links container, not the nav
    const linksContainer = navRef.current?.querySelector(
      ".nav-links-container",
    ) as HTMLElement | null;
    const activeLink = linksContainer?.querySelector(
      `[data-path="${location.pathname}"]`,
    ) as HTMLElement | null;
    if (activeLink && underlineRef.current && linksContainer) {
      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = linksContainer.getBoundingClientRect();
      gsap.to(underlineRef.current, {
        x: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else if (underlineRef.current) {
      gsap.to(underlineRef.current, { opacity: 0, duration: 0.2 });
    }
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "var(--bg-primary)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <div className="w-full px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div onClick={scrollToTop}>
              <MonogramLogo />
            </div>

            {/* Desktop Nav */}
            <div className="nav-links-container hidden md:flex items-center gap-10 relative">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-path={link.path}
                  className="font-mono text-[11px] tracking-[0.15em] uppercase relative py-2 transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
              <div
                ref={underlineRef}
                className="absolute bottom-0 h-px opacity-0"
                style={{
                  backgroundColor: "var(--accent)",
                  width: 0,
                }}
              />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 md:gap-6">
              <AccountDropdown />

              <ThemeToggle />

              <button
                onClick={toggleCart}
                className="relative"
                data-cursor="link"
                aria-label="Cart"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  style={{ color: "var(--text-primary)" }}
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
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 min-w-[16px] h-4 rounded-full flex items-center justify-center font-mono text-[8px]"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col gap-[5px] p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    backgroundColor: "var(--text-primary)",
                    transform: mobileOpen
                      ? "rotate(45deg) translateY(3px)"
                      : "none",
                  }}
                />
                <span
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    backgroundColor: "var(--text-primary)",
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    backgroundColor: "var(--text-primary)",
                    transform: mobileOpen
                      ? "rotate(-45deg) translateY(-3px)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500 flex flex-col items-center justify-center gap-8"
        style={{
          backgroundColor: "var(--bg-primary)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMobileOpen(false)}
            className="font-serif text-2xl tracking-wide"
            style={{
              color:
                location.pathname === link.path
                  ? "var(--accent)"
                  : "var(--text-primary)",
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          className="font-serif text-2xl tracking-wide"
          style={{
            color:
              location.pathname === "/dashboard"
                ? "var(--accent)"
                : "var(--text-primary)",
          }}
        >
          DASHBOARD
        </Link>
      </div>
    </>
  );
}
