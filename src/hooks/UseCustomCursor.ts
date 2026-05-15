import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CursorState {
  size: number;
  text: string;
  strokeWidth: number;
  mixBlend: boolean;
}

const STATES: Record<string, CursorState> = {
  default: { size: 16, text: "", strokeWidth: 1, mixBlend: true },
  link: { size: 56, text: "VIEW", strokeWidth: 1, mixBlend: true },
  cta: { size: 72, text: "ADD", strokeWidth: 1, mixBlend: false },
  image: { size: 90, text: "", strokeWidth: 1, mixBlend: true },
  drag: { size: 72, text: "DRAG", strokeWidth: 1, mixBlend: false },
};

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>(STATES.default);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const sizeTo = useRef<gsap.QuickToFunc | null>(null);
  const strokeTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    xTo.current = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    yTo.current = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    sizeTo.current = gsap.quickTo(ring, "width,height", {
      duration: 0.4,
      ease: "power3",
    });
    strokeTo.current = gsap.quickTo(ring, "borderWidth", { duration: 0.3 });

    const onMove = (e: MouseEvent) => {
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);
    };

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      let state = STATES.default;
      if (target.closest('[data-cursor="link"]')) state = STATES.link;
      else if (target.closest('[data-cursor="cta"]')) state = STATES.cta;
      else if (target.closest('[data-cursor="image"]')) state = STATES.image;
      else if (target.closest('[data-cursor="drag"]')) state = STATES.drag;
      else if (target.closest('a, button, [role="button"]'))
        state = STATES.link;

      stateRef.current = state;
      sizeTo.current?.(state.size);
      strokeTo.current?.(state.strokeWidth);
      if (textRef.current) {
        textRef.current.textContent = state.text;
      }
    };

    const onLeave = () => {
      stateRef.current = STATES.default;
      sizeTo.current?.(STATES.default.size);
      strokeTo.current?.(STATES.default.strokeWidth);
      if (textRef.current) {
        textRef.current.textContent = "";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    const mql = window.matchMedia("(pointer: fine)");
    if (mql.matches) {
      document.body.classList.add("has-custom-cursor");
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return { cursorRef, textRef, ringRef, stateRef };
}
