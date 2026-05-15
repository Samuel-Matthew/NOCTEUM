import { useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DashboardSidebar from "./components/DashboardSidebar";
import ProfileSection from "./components/ProfileSection";
import OrdersSection from "./components/OrdersSection";
import AddressesSection from "./components/AddressesSection";
import PreferencesSection from "./components/PreferencesSection";

gsap.registerPlugin(ScrollTrigger);

type DashboardTab = "profile" | "orders" | "addresses" | "settings";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAuthenticated, isLoading } = useAuth();
  const heroRef = useRef<HTMLElement>(null);

  const activeTab = (searchParams.get("tab") as DashboardTab) || "profile";

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth", {
        replace: true,
        state: { from: { pathname: "/dashboard" } },
      });
    }
  }, [isLoading, isAuthenticated, navigate]);

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
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  if (isLoading) {
    return (
      <main
        className="relative min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="w-6 h-6 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) return null;

  const tabs: { id: DashboardTab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "orders", label: "Orders" },
    { id: "addresses", label: "Addresses" },
    { id: "settings", label: "Preferences" },
  ];

  return (
    <main
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative w-full pt-28 md:pt-36 pb-8 md:pb-12"
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
            <span>Back to Collection</span>
          </Link>

          <div className="hero-item flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg"
              style={{
                backgroundColor: "var(--accent-soft)",
                color: "var(--bg-primary)",
              }}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <div>
              <h1
                className="font-serif text-3xl md:text-4xl lg:text-5xl"
                style={{ color: "var(--text-primary)" }}
              >
                {user.firstName}{" "}
                <em className="not-italic" style={{ color: "var(--accent)" }}>
                  {user.lastName}
                </em>
              </h1>
              <p
                className="font-mono text-[10px] tracking-[0.2em] uppercase mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Member since{" "}
                {new Date(user.memberSince).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="hero-item flex items-center gap-3 mt-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase"
              style={{
                backgroundColor: `${getTierColor(user.tier)}15`,
                color: getTierColor(user.tier),
                border: `1px solid ${getTierColor(user.tier)}30`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: getTierColor(user.tier) }}
              />
              {user.tier} Member
            </span>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="relative w-full pb-28 md:pb-36">
        <div className="w-full px-6 md:px-10 lg:px-14 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* Sidebar */}
            <div className="lg:w-[220px] flex-shrink-0">
              <DashboardSidebar
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {activeTab === "profile" && <ProfileSection />}
              {activeTab === "orders" && <OrdersSection />}
              {activeTab === "addresses" && <AddressesSection />}
              {activeTab === "settings" && <PreferencesSection />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function getTierColor(tier: string): string {
  const colors: Record<string, string> = {
    silver: "#A0A0A0",
    gold: "#D4A853",
    platinum: "#E5E4E2",
  };
  return colors[tier] || "#A0A0A0";
}
