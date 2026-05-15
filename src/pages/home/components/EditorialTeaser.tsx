import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Ink divider SVG path
export function InkDivider({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <svg
      className={`w-full overflow-visible ${className}`}
      height="24"
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M0 12 Q150 4 300 12 Q450 20 600 12 Q750 4 900 12 Q1050 20 1200 12"
        fill="none"
        stroke="var(--border)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EditorialTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imgRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    tl.from(imgRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    tl.from(
      textRef.current,
      {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6",
    );

    // Parallax on scroll
    gsap.to(imgRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="w-full px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imgRef}
            className="relative aspect-[4/5] rounded-lg overflow-hidden"
            data-cursor="image"
          >
            <img
              src="https://readdy.ai/api/search-image?query=perfume%20bottle%20with%20golden%20liquid%20being%20poured%20atmospheric%20dark%20moody%20photography%20luxury%20fragrance%20ritual%20candlelit%20warm%20amber%20light%20artistic%20cinematic&width=800&height=1000&seq=10&orientation=portrait"
              alt="The Ritual — NOCTĒUM brand experience"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,8,4,0.5) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Text */}
          <div ref={textRef} className="space-y-8">
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--text-secondary)" }}
            >
              The Ritual
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Before you speak,
              <br />
              <em style={{ color: "var(--accent)" }}>
                you are already perceived.
              </em>
            </h2>
            <blockquote
              className="font-body text-base md:text-lg leading-relaxed italic border-l-2 pl-5"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--accent)",
              }}
            >
              &ldquo;Scent is memory before it is sensation. It bypasses reason
              and speaks directly to who you are, who you were, and who you wish
              to become.&rdquo;
            </blockquote>
            <Link
              to="/ritual"
              data-cursor="link"
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase group"
              style={{ color: "var(--accent)" }}
            >
              Enter The Ritual
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
