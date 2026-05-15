import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  number: string;
  title: string;
  heading: string;
  body: string;
  secondBody: string;
  image: string;
  imagePosition: "left" | "right";
}

export default function Chapter({
  number,
  title,
  heading,
  body,
  secondBody,
  image,
  imagePosition,
}: ChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imgRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imgRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal
      if (!textRef.current) return;
      const textEls = textRef.current.querySelectorAll(".chapter-reveal");
      gsap.from(textEls, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Image reveal
      gsap.from(imgRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isLeft = imagePosition === "left";

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="px-6 md:px-10 lg:px-14">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLeft ? "" : "lg:grid-flow-dense"}`}
        >
          {/* Image */}
          <div
            ref={imgRef}
            className={`relative aspect-[4/5] rounded-lg overflow-hidden ${isLeft ? "" : "lg:col-start-2"}`}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,8,4,0.4) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className={`${isLeft ? "" : "lg:col-start-1 lg:row-start-1"}`}
          >
            <div className="chapter-reveal flex items-baseline gap-4 mb-6">
              <span
                className="font-serif text-5xl md:text-6xl lg:text-7xl opacity-20"
                style={{ color: "var(--accent)" }}
              >
                {number}
              </span>
              <p
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {title}
              </p>
            </div>
            <h2
              className="chapter-reveal font-serif text-2xl md:text-3xl lg:text-4xl leading-snug mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              {heading}
            </h2>
            <p
              className="chapter-reveal font-body text-base md:text-lg leading-relaxed mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              {body}
            </p>
            <p
              className="chapter-reveal font-body text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {secondBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
