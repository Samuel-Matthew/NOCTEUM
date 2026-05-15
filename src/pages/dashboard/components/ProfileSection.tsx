import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import gsap from "gsap";

export default function ProfileSection() {
  const { user, updateProfile } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthday: user?.birthday || "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".profile-animate"), {
      y: 20,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    // Simulate network
    await new Promise((res) => setTimeout(res, 800));
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone || undefined,
      birthday: formData.birthday || undefined,
    });
    setIsSaving(false);
    setSaveMessage("Profile updated successfully.");
    setIsEditing(false);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  if (!user) return null;

  const tierColor = getTierColor(user.tier);
  const memberDate = new Date(user.memberSince).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div ref={sectionRef}>
      {/* Stats Row */}
      <div className="profile-animate grid grid-cols-3 gap-4 mb-8">
        <div
          className="rounded-lg p-4 text-center"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="font-mono text-2xl block"
            style={{ color: "var(--accent)" }}
          >
            4
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Orders
          </span>
        </div>
        <div
          className="rounded-lg p-4 text-center"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="font-mono text-2xl block"
            style={{ color: "var(--accent)" }}
          >
            $1,470
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Total Spent
          </span>
        </div>
        <div
          className="rounded-lg p-4 text-center"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="font-mono text-2xl block"
            style={{ color: tierColor }}
          >
            {user.tier[0].toUpperCase()}
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Tier
          </span>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="profile-animate mb-8">
        <h3
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          Membership Progress
        </h3>
        <div
          className="rounded-lg p-5"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="font-body text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Member
            </span>
            <span
              className="font-mono text-[10px] tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              $1,470 / $3,000
            </span>
          </div>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: "49%", backgroundColor: tierColor }}
            />
          </div>
          <p
            className="font-body text-xs mt-3"
            style={{ color: "var(--text-secondary)" }}
          >
            Spend $1,530 more to reach{" "}
            <span style={{ color: tierColor }}>Platinum</span> and unlock
            exclusive early access to new releases.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="profile-animate">
        <div className="flex items-center justify-between mb-5">
          <h3
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Personal Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {saveMessage && (
          <div
            className="mb-5 p-3 rounded-md font-body text-sm"
            style={{
              backgroundColor: "rgba(16,185,129,0.1)",
              color: "#10B981",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            {saveMessage}
          </div>
        )}

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, firstName: e.target.value }))
                  }
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
              ) : (
                <p
                  className="font-body text-sm pb-2 border-b"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border)",
                  }}
                >
                  {user.firstName}
                </p>
              )}
            </div>
            <div>
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, lastName: e.target.value }))
                  }
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
              ) : (
                <p
                  className="font-body text-sm pb-2 border-b"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border)",
                  }}
                >
                  {user.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Email
            </label>
            <p
              className="font-body text-sm pb-2 border-b"
              style={{
                color: "var(--text-primary)",
                borderColor: "var(--border)",
              }}
            >
              {user.email}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="+33 1 42 60 00 00"
                />
              ) : (
                <p
                  className="font-body text-sm pb-2 border-b"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border)",
                  }}
                >
                  {user.phone || (
                    <span style={{ color: "var(--text-muted)" }}>
                      Not provided
                    </span>
                  )}
                </p>
              )}
            </div>
            <div>
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Birthday
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, birthday: e.target.value }))
                  }
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
              ) : (
                <p
                  className="font-body text-sm pb-2 border-b"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border)",
                  }}
                >
                  {user.birthday ? (
                    new Date(user.birthday).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })
                  ) : (
                    <span style={{ color: "var(--text-muted)" }}>
                      Not provided
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Member Since
            </label>
            <p
              className="font-body text-sm pb-2 border-b"
              style={{
                color: "var(--text-primary)",
                borderColor: "var(--border)",
              }}
            >
              {memberDate}
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group disabled:opacity-60"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
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
