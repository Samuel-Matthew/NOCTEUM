import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import gsap from "gsap";

export default function PreferencesSection() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".pref-animate"), {
      y: 20,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
    });
  }, []);

  const handleSave = () => {
    setSaveMessage("Preferences saved.");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div ref={sectionRef}>
      {/* Notifications */}
      <div className="pref-animate mb-8">
        <h3
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          Email Notifications
        </h3>
        <div className="space-y-4">
          <ToggleRow
            label="Order Updates"
            description="Shipping confirmations, delivery updates, and tracking notifications."
            checked={orderUpdates}
            onChange={setOrderUpdates}
          />
          <ToggleRow
            label="Member Benefits"
            description="Exclusive offers, early access to launches, and member-only events."
            checked={promotionalEmails}
            onChange={setPromotionalEmails}
          />
          <ToggleRow
            label="Newsletter"
            description="Fragrance stories, editorial content, and brand news."
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="pref-animate mb-8">
        <h3
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          Appearance
        </h3>
        <div
          className="rounded-lg p-5 flex items-center justify-between"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <div>
            <p
              className="font-body text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              Theme
            </p>
            <p
              className="font-mono text-[10px] mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {theme === "dark"
                ? "Obscur — Dark atmosphere"
                : "Lumière — Light atmosphere"}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              {theme === "dark" ? (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              ) : (
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
              )}
            </svg>
            {theme === "dark" ? "Obscur" : "Lumière"}
          </button>
        </div>
      </div>

      {saveMessage && (
        <div
          className="pref-animate mb-6 p-3 rounded-md font-body text-sm"
          style={{
            backgroundColor: "rgba(16,185,129,0.1)",
            color: "#10B981",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          {saveMessage}
        </div>
      )}

      <div className="pref-animate">
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          Save Preferences
        </button>
      </div>

      {/* Danger Zone */}
      <div
        className="pref-animate mt-12 pt-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <h3
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          Account
        </h3>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="px-6 py-3 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 border"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="rounded-lg p-6 max-w-sm w-full"
            style={{
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border)",
            }}
          >
            <h4
              className="font-serif text-xl mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Sign Out?
            </h4>
            <p
              className="font-body text-sm mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              You will be signed out of your Noctēum account.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutConfirm(false);
                }}
                className="px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="rounded-lg p-4 flex items-start justify-between gap-4"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
    >
      <div>
        <p
          className="font-body text-sm"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </p>
        <p
          className="font-mono text-[10px] mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="relative w-10 h-5 rounded-full transition-colors duration-300 flex-shrink-0 mt-0.5"
        style={{ backgroundColor: checked ? "var(--accent)" : "var(--border)" }}
        aria-label={label}
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-300"
          style={{
            backgroundColor: "var(--bg-primary)",
            transform: checked ? "translateX(20px)" : "translateX(0)",
          }}
        />
      </button>
    </div>
  );
}
