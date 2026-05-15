import { useEffect, useRef } from "react";

export default function HeroWave() {
  const svgRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const mouseXRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    if (!path1 || !path2 || !svgRef.current) return;

    const svg = svgRef.current;
    const W = svg.clientWidth || 1200;
    const H = svg.clientHeight || 200;

    const onMouseMove = (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    const animate = (t: number) => {
      const points1: string[] = [];
      const points2: string[] = [];
      const mouseInfluence = mouseXRef.current * 15;

      for (let x = 0; x <= W; x += 6) {
        const ratio = x / W;
        const y1 =
          H / 2 +
          Math.sin(ratio * Math.PI * 4 + t) * 30 +
          mouseInfluence * ratio;
        const y2 =
          H / 2 +
          Math.sin(ratio * Math.PI * 3 + t + 1.2) * 25 +
          mouseInfluence * (1 - ratio);
        points1.push(`${x},${y1}`);
        points2.push(`${x},${y2}`);
      }

      path1.setAttribute("d", `M ${points1.join(" L ")}`);
      path2.setAttribute("d", `M ${points2.join(" L ")}`);

      rafRef.current = requestAnimationFrame(() => animate(t + 0.015));
    };

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(() => animate(0));

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute bottom-[15%] left-0 right-0 w-full h-[200px] pointer-events-none"
      preserveAspectRatio="none"
    >
      <path
        ref={path1Ref}
        fill="none"
        stroke="var(--svg-stroke)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        ref={path2Ref}
        fill="none"
        stroke="var(--svg-stroke)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
