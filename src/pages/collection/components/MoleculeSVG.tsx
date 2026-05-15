import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { cx: 100, cy: 50, r: 6 },
  { cx: 150, cy: 50, r: 6 },
  { cx: 175, cy: 93, r: 6 },
  { cx: 150, cy: 136, r: 6 },
  { cx: 100, cy: 136, r: 6 },
  { cx: 75, cy: 93, r: 6 },
  { cx: 125, cy: 93, r: 4 },
];

const EDGES = [
  { x1: 100, y1: 50, x2: 150, y2: 50 },
  { x1: 150, y1: 50, x2: 175, y2: 93 },
  { x1: 175, y1: 93, x2: 150, y2: 136 },
  { x1: 150, y1: 136, x2: 100, y2: 136 },
  { x1: 100, y1: 136, x2: 75, y2: 93 },
  { x1: 75, y1: 93, x2: 100, y2: 50 },
  { x1: 100, y1: 50, x2: 125, y2: 93 },
  { x1: 150, y1: 50, x2: 125, y2: 93 },
  { x1: 175, y1: 93, x2: 125, y2: 93 },
  { x1: 150, y1: 136, x2: 125, y2: 93 },
  { x1: 100, y1: 136, x2: 125, y2: 93 },
  { x1: 75, y1: 93, x2: 125, y2: 93 },
  { x1: 125, y1: 93, x2: 125, y2: 30, extend: true },
  { x1: 125, y1: 93, x2: 180, y2: 60, extend: true },
  { x1: 125, y1: 93, x2: 180, y2: 120, extend: true },
  { x1: 125, y1: 93, x2: 70, y2: 120, extend: true },
];

export default function MoleculeSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Rotation
    gsap.to(svg, {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "none",
    });

    // Nodes pop in
    const circles = circlesRef.current.filter(Boolean);
    gsap.from(circles, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Edges draw in
    const lines = linesRef.current.filter(Boolean);
    lines.forEach((line) => {
      const length = (line as SVGGeometryElement).getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });
    gsap.to(lines, {
      strokeDashoffset: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: "power2.out",
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      width="250"
      height="200"
      viewBox="0 0 250 180"
      className="overflow-visible"
    >
      {EDGES.map((edge, i) => (
        <line
          key={`edge-${i}`}
          ref={(el) => {
            linesRef.current[i] = el;
          }}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          stroke="var(--svg-stroke)"
          strokeWidth={edge.extend ? 0.6 : 1}
          opacity={edge.extend ? 0.4 : 0.7}
          strokeLinecap="round"
        />
      ))}
      {NODES.map((node, i) => (
        <circle
          key={`node-${i}`}
          ref={(el) => {
            circlesRef.current[i] = el;
          }}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill="var(--svg-fill)"
          stroke="var(--svg-stroke)"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
