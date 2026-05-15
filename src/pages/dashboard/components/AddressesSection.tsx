import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import gsap from "gsap";
import { loadAddresses, saveAddresses, type Address } from "@/mocks/users";

export default function AddressesSection() {
  const { user } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const emptyForm: Omit<Address, "id"> = {
    label: "",
    firstName: "",
    lastName: "",
    street: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    isDefault: false,
  };

  const [formData, setFormData] = useState<Omit<Address, "id">>(emptyForm);

  useEffect(() => {
    if (user) {
      setAddresses(loadAddresses(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".addr-animate"), {
      y: 20,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
    });
  }, [addresses.length, isAdding, isEditing]);

  const handleSave = () => {
    if (!user) return;
    if (
      !formData.label ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.street ||
      !formData.city ||
      !formData.country ||
      !formData.postalCode
    ) {
      setSaveMessage("Please fill in all required fields.");
      return;
    }

    let updated: Address[];
    if (isEditing) {
      updated = addresses.map((a) =>
        a.id === isEditing
          ? { ...formData, id: isEditing }
          : formData.isDefault && a.id !== isEditing
            ? { ...a, isDefault: false }
            : a,
      );
    } else {
      const newAddress: Address = { ...formData, id: `addr-${Date.now()}` };
      updated = formData.isDefault
        ? addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
        : [...addresses, newAddress];
    }

    saveAddresses(user.id, updated);
    setAddresses(updated);
    setIsEditing(null);
    setIsAdding(false);
    setFormData(emptyForm);
    setSaveMessage(isEditing ? "Address updated." : "Address added.");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleEdit = (addr: Address) => {
    setFormData({ ...addr });
    setIsEditing(addr.id);
    setIsAdding(false);
    setSaveMessage("");
  };

  const handleDelete = (id: string) => {
    if (!user) return;
    const updated = addresses.filter((a) => a.id !== id);
    saveAddresses(user.id, updated);
    setAddresses(updated);
    setSaveMessage("Address removed.");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleSetDefault = (id: string) => {
    if (!user) return;
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    saveAddresses(user.id, updated);
    setAddresses(updated);
  };

  const cancelForm = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData(emptyForm);
    setSaveMessage("");
  };

  const showForm = isAdding || isEditing !== null;

  return (
    <div ref={sectionRef}>
      {/* Header */}
      <div className="addr-animate flex items-center justify-between mb-6">
        <h3
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Saved Addresses
        </h3>
        {!showForm && (
          <button
            onClick={() => {
              setIsAdding(true);
              setIsEditing(null);
              setFormData(emptyForm);
            }}
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
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
                d="M12 5v14M5 12h14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add Address
          </button>
        )}
      </div>

      {saveMessage && (
        <div
          className="addr-animate mb-5 p-3 rounded-md font-body text-sm"
          style={{
            backgroundColor: saveMessage.includes("Please")
              ? "rgba(239,68,68,0.1)"
              : "rgba(16,185,129,0.1)",
            color: saveMessage.includes("Please") ? "#EF4444" : "#10B981",
            border: `1px solid ${saveMessage.includes("Please") ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}`,
          }}
        >
          {saveMessage}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div
          className="addr-animate rounded-lg p-5 mb-6"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <h4
            className="font-serif text-lg mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            {isEditing ? "Edit Address" : "New Address"}
          </h4>
          <div className="space-y-4">
            <div>
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Label <span className="normal-case">(e.g. Home, Office)</span>
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, label: e.target.value }))
                }
                className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Home"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  First Name
                </label>
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
              </div>
              <div>
                <label
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Last Name
                </label>
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
              </div>
            </div>
            <div>
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Street Address
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, street: e.target.value }))
                }
                className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Apartment, Suite, etc.{" "}
                <span className="normal-case">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.apartment}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, apartment: e.target.value }))
                }
                className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, city: e.target.value }))
                  }
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <div>
                <label
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, postalCode: e.target.value }))
                  }
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>
            <div>
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, country: e.target.value }))
                }
                className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)] cursor-pointer"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="">Select country</option>
                <option value="France">France</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
                <option value="Japan">Japan</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Switzerland">Switzerland</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  setFormData((p) => ({ ...p, isDefault: !p.isDefault }))
                }
                className="w-4 h-4 rounded-sm border flex items-center justify-center transition-colors flex-shrink-0"
                style={{
                  borderColor: formData.isDefault
                    ? "var(--accent)"
                    : "var(--border)",
                  backgroundColor: formData.isDefault
                    ? "var(--accent)"
                    : "transparent",
                }}
              >
                {formData.isDefault && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--bg-primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
              <label
                className="font-body text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Set as default shipping address
              </label>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                {isEditing ? "Update Address" : "Save Address"}
              </button>
              <button
                onClick={cancelForm}
                className="px-6 py-3 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Cards */}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="addr-animate rounded-lg p-5"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs tracking-wider uppercase"
                  style={{ color: "var(--text-primary)" }}
                >
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[8px] tracking-wider uppercase"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    Default
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="font-mono text-[9px] tracking-wider uppercase transition-opacity hover:opacity-70"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(addr)}
                  className="p-1.5 rounded transition-colors hover:opacity-70"
                  style={{ color: "var(--text-secondary)" }}
                  aria-label="Edit"
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
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-1.5 rounded transition-colors hover:opacity-70"
                  style={{ color: "var(--text-secondary)" }}
                  aria-label="Delete"
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
                      d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div style={{ color: "var(--text-secondary)" }}>
              <p
                className="font-body text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {addr.firstName} {addr.lastName}
              </p>
              <p className="font-body text-sm mt-0.5">{addr.street}</p>
              {addr.apartment && (
                <p className="font-body text-sm">{addr.apartment}</p>
              )}
              <p className="font-body text-sm">
                {addr.city}, {addr.postalCode}
              </p>
              <p className="font-body text-sm">{addr.country}</p>
              {addr.phone && (
                <p
                  className="font-mono text-[10px] mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {addr.phone}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showForm && (
        <div className="addr-animate text-center py-12">
          <p
            className="font-body text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            No saved addresses yet.
          </p>
        </div>
      )}
    </div>
  );
}
