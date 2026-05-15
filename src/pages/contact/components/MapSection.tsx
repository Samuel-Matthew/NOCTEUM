import { useRef, useEffect, useState } from "react";
import { stores } from "@/mocks/stores";
import gsap from "gsap";

export default function MapSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const dots = svgRef.current.querySelectorAll(".map-dot");
    dots.forEach((dot, i) => {
      gsap.to(dot.querySelector(".pulse-ring"), {
        scale: 2.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        delay: i * 0.5,
        ease: "power2.out",
      });
    });
  }, []);

  const handleStoreClick = (storeId: string) => {
    const el = document.getElementById(`store-card-${storeId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      gsap.fromTo(
        el,
        { backgroundColor: "var(--accent-soft)" },
        { backgroundColor: "transparent", duration: 1.5, ease: "power2.out" },
      );
    }
  };

  return (
    <section
      className="relative w-full py-28 md:py-36"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="w-full px-6 md:px-10 lg:px-14">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Find Us
        </p>
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-16 md:mb-20"
          style={{ color: "var(--text-primary)" }}
        >
          Boutiques
        </h2>

        {/* SVG World Map */}
        <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto mb-16 md:mb-24">
          <svg
            ref={svgRef}
            viewBox="0 0 100 50"
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            {/* Continent silhouettes — abstract stylized shapes */}
            <g
              style={{
                fill: "var(--card-bg)",
                stroke: "var(--border)",
                strokeWidth: 0.3,
              }}
            >
              {/* North America */}
              <path d="M8,12 C12,8 20,10 24,14 C26,18 22,24 18,26 C14,28 10,24 8,20 C6,16 6,14 8,12 Z" />
              {/* South America */}
              <path d="M20,28 C24,26 28,30 26,38 C24,42 20,44 18,40 C16,36 18,30 20,28 Z" />
              {/* Europe */}
              <path d="M44,12 C48,10 54,12 56,16 C58,20 54,24 50,26 C46,28 42,24 42,18 C42,14 44,12 44,12 Z" />
              {/* Africa */}
              <path d="M46,26 C50,24 56,28 58,34 C60,40 56,46 50,48 C44,46 42,40 44,34 C44,30 46,26 46,26 Z" />
              {/* Asia */}
              <path d="M58,10 C66,8 78,12 84,18 C88,24 82,32 74,34 C66,36 58,32 56,24 C56,18 58,12 58,10 Z" />
              {/* Australia */}
              <path d="M78,36 C84,34 90,36 92,40 C90,44 84,46 78,44 C76,42 76,38 78,36 Z" />
            </g>

            {/* Location dots */}
            {stores.map((store) => (
              <g
                key={store.id}
                className="map-dot cursor-pointer"
                transform={`translate(${store.mapX}, ${store.mapY})`}
                onMouseEnter={() => setHoveredStore(store.id)}
                onMouseLeave={() => setHoveredStore(null)}
                onClick={() => handleStoreClick(store.id)}
              >
                <circle
                  className="pulse-ring"
                  r="2"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
                <circle r="1.2" fill="var(--accent)" />
                {/* Tooltip */}
                {hoveredStore === store.id && (
                  <g transform="translate(0, -4)">
                    <rect
                      x="-12"
                      y="-8"
                      width="24"
                      height="5"
                      rx="1"
                      fill="var(--bg-primary)"
                      stroke="var(--border)"
                      strokeWidth="0.2"
                    />
                    <text
                      x="0"
                      y="-4.5"
                      textAnchor="middle"
                      fontSize="2"
                      fontFamily="monospace"
                      letterSpacing="0.1"
                      fill="var(--text-primary)"
                    >
                      {store.city}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              id={`store-card-${store.id}`}
              className="group rounded-lg overflow-hidden transition-all duration-500"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={store.image}
                  alt={`${store.city} boutique`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3
                  className="font-serif text-lg mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {store.city}
                </h3>
                <p
                  className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  {store.country}
                </p>
                <p
                  className="font-body text-xs leading-relaxed mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {store.address}
                </p>
                <p
                  className="font-body text-xs mb-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {store.hours}
                </p>
                <p
                  className="font-mono text-[10px] mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {store.phone}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors hover:opacity-80"
                  style={{ color: "var(--accent)" }}
                >
                  <span>Get Directions</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
