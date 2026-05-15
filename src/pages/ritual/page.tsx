import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/feature/Footer";
import IntroQuote from "./components/IntroQuote";
import Chapter from "./components/Chapter";
import ParticleField from "./components/ParticleField";
import ClosingQuote from "./components/ClosingQuote";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    number: "01",
    title: "Origin",
    heading: "Every scent begins in silence.",
    body: "Before the first drop of essence is harvested, before the distiller fires the copper still, there is only intention. The perfumer sits in darkness, breathing slowly, waiting for the invisible to take shape. NOCTĒUM was born from this stillness — a belief that fragrance is not manufactured but revealed.",
    secondBody:
      "Our raw materials travel from the high Atlas Mountains of Morocco, the rose valleys of Isparta, the vetiver fields of Haiti. Each ingredient carries the memory of its soil, its sun, its rain. We do not mask these memories. We amplify them.",
    image:
      "https://readdy.ai/api/search-image?query=moody%20atmospheric%20perfume%20laboratory%20copper%20stills%20and%20glass%20bottles%20in%20candlelight%20dark%20warm%20amber%20tones%20artistic%20cinematic%20editorial%20photography%20luxury%20fragrance%20craft&width=900&height=1100&seq=20&orientation=portrait",
    imagePosition: "left" as const,
  },
  {
    number: "02",
    title: "Craft",
    heading: "Precision is devotion.",
    body: "A single NOCTĒUM fragrance requires fourteen months from conception to bottle. The maceration alone — allowing raw materials to marry in alcohol — lasts six weeks. There are no shortcuts in alchemy.",
    secondBody:
      "Our nose, trained for two decades in Grasse and Damascus, composes each formula by hand, measuring in milligrams, adjusting by intuition. Technology assists; instinct decides. Every batch is limited. Every batch is signed.",
    image:
      "https://readdy.ai/api/search-image?query=artisan%20hands%20carefully%20pouring%20golden%20perfume%20liquid%20into%20crystal%20bottle%20dark%20moody%20studio%20lighting%20warm%20amber%20cinematic%20luxury%20fragrance%20making%20editorial%20photography&width=900&height=1100&seq=21&orientation=portrait",
    imagePosition: "right" as const,
  },
  {
    number: "03",
    title: "The Wearer",
    heading: "You complete the composition.",
    body: "A fragrance without a body is only potential. Skin transforms everything. The same formula will smell of smoke on one wrist, of honey on another. This is not inconsistency — it is dialogue.",
    secondBody:
      "We create the question. You are the answer. Temperature, chemistry, mood, memory: these invisible forces rewrite the scent in real time. What remains constant is presence. What remains constant is the fact that you were here, and someone will remember.",
    image:
      "https://readdy.ai/api/search-image?query=elegant%20silhouette%20of%20person%20applying%20perfume%20to%20neck%20dark%20atmospheric%20moody%20lighting%20warm%20golden%20rim%20light%20luxury%20editorial%20fragrance%20photography%20cinematic%20artistic&width=900&height=1100&seq=22&orientation=portrait",
    imagePosition: "left" as const,
  },
  {
    number: "04",
    title: "Invisible",
    heading: "The scent you leave behind.",
    body: "Long after you have left the room, your fragrance lingers in the fibers of a coat, the curve of a chair, the silence between words. It becomes evidence. It becomes longing.",
    secondBody:
      "NOCTĒUM exists in this space — the moment after departure, the trace before return. We craft not for the eyes but for the invisible architecture of memory. To wear NOCTĒUM is to understand that your presence extends far beyond where your body ends.",
    image:
      "https://readdy.ai/api/search-image?query=empty%20elegant%20dark%20room%20with%20single%20beam%20of%20warm%20golden%20light%20dust%20particles%20floating%20in%20air%20atmospheric%20moody%20cinematic%20editorial%20photography%20luxury%20mysterious%20ambiance&width=900&height=1100&seq=23&orientation=portrait",
    imagePosition: "right" as const,
  },
];

export default function Ritual() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    // Fade in the whole page content after intro
    gsap.from(mainRef.current.querySelectorAll(".ritual-reveal"), {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <IntroQuote />

      {/* Chapters */}
      {CHAPTERS.map((chapter) => (
        <Chapter key={chapter.number} {...chapter} />
      ))}

      {/* Particle Field */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden ritual-reveal">
        <ParticleField />
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p
            className="font-serif text-2xl md:text-4xl lg:text-5xl text-center px-6 max-w-3xl leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            In the space between{" "}
            <em style={{ color: "var(--accent)" }}>seeing</em> and{" "}
            <em style={{ color: "var(--accent)" }}>knowing</em>, scent speaks
            first.
          </p>
        </div>
      </section>

      <ClosingQuote />
      <Footer />
    </main>
  );
}
