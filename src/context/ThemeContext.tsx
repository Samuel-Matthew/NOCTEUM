import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import gsap from "gsap";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
  updateTogglePos: (x: number, y: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isTransitioning: false,
  updateTogglePos: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const STORAGE_KEY = "nocteum-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wipeRef = useRef<HTMLDivElement>(null);
  const togglePosRef = useRef({ x: 90, y: 40 });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const newTheme = theme === "dark" ? "light" : "dark";
    const wipe = wipeRef.current;
    if (!wipe) {
      setTheme(newTheme);
      setIsTransitioning(false);
      return;
    }

    const pos = togglePosRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        setTheme(newTheme);
        setIsTransitioning(false);
      },
    });

    // Phase 1: expand wipe
    tl.set(wipe, {
      clipPath: `circle(0% at ${pos.x}% ${pos.y}%)`,
      backgroundColor: newTheme === "dark" ? "#0A0804" : "#F5F0E8",
    });
    tl.to(wipe, {
      clipPath: `circle(150% at ${pos.x}% ${pos.y}%)`,
      duration: 0.9,
      ease: "power4.inOut",
    });
    // Phase 2: retract
    tl.set(wipe, {
      clipPath: `circle(150% at ${pos.x}% ${pos.y}%)`,
      backgroundColor: "transparent",
    });
    tl.to(wipe, {
      clipPath: `circle(0% at ${pos.x}% ${pos.y}%)`,
      duration: 0.5,
      ease: "power2.in",
    });
  }, [theme, isTransitioning]);

  const updateTogglePos = useCallback((x: number, y: number) => {
    togglePosRef.current = { x, y };
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isTransitioning, updateTogglePos }}
    >
      <div ref={wipeRef} className="theme-wipe" aria-hidden="true" />
      {children}
    </ThemeContext.Provider>
  );
}

export type { Theme };
