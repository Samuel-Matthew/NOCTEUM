import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevPathRef = useRef(location.pathname);

  // When location changes, animate out old page, then swap and animate in
  useLayoutEffect(() => {
    if (location.pathname === prevPathRef.current) return;

    const prevPath = prevPathRef.current;
    prevPathRef.current = location.pathname;

    // Skip animation on first mount
    if (prevPath === location.pathname) {
      setDisplayChildren(children);
      return;
    }

    setIsAnimating(true);

    const ctx = gsap.context(() => {
      // Fade out current page
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setDisplayChildren(children);
          window.scrollTo({ top: 0, behavior: "auto" });

          // Small delay to let React render new content
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!containerRef.current) return;

              gsap.set(containerRef.current, { opacity: 0, y: 20 });
              gsap.to(containerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
                onComplete: () => setIsAnimating(false),
              });
            });
          });
        },
      });
    });

    return () => ctx.revert();
  }, [location.pathname, children]);

  // On first mount, animate in
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.set(containerRef.current, { opacity: 0, y: 20 });
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        opacity: isAnimating ? undefined : 1,
        willChange: isAnimating ? "transform, opacity" : "auto",
      }}
    >
      {displayChildren}
    </div>
  );
}
