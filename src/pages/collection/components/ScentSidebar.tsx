import { scentFamilies } from "@/mocks/products";

interface ScentSidebarProps {
  activeScent: string;
  onChange: (scent: string) => void;
}

export default function ScentSidebar({
  activeScent,
  onChange,
}: ScentSidebarProps) {
  return (
    <div className="lg:sticky lg:top-28 space-y-6">
      <p
        className="font-mono text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "var(--text-secondary)" }}
      >
        Scent Family
      </p>
      <div className="flex flex-row lg:flex-col gap-3 lg:gap-4 flex-wrap">
        {scentFamilies.map((family) => (
          <button
            key={family}
            onClick={() => onChange(family)}
            className="flex items-center gap-3 group text-left"
          >
            <span
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  activeScent === family ? "var(--accent)" : "transparent",
                border: `1px solid ${activeScent === family ? "var(--accent)" : "var(--text-secondary)"}`,
                transform: activeScent === family ? "scale(1.3)" : "scale(1)",
              }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-300"
              style={{
                color:
                  activeScent === family
                    ? "var(--accent)"
                    : "var(--text-secondary)",
              }}
            >
              {family}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
