import { useState } from "react";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import HorizontalStrip from "./components/HorizontalStrip";
import ThreePillars from "./components/ThreePillars";
import { EditorialTeaser, InkDivider } from "./components/EditorialTeaser";
import Footer from "@/components/feature/Footer";

export default function Home() {
  const [, setLoaded] = useState(false);

  return (
    <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Preloader onComplete={() => setLoaded(true)} />
      <Hero />
      <Manifesto />
      <InkDivider />
      <HorizontalStrip />
      <InkDivider />
      <ThreePillars />
      <InkDivider />
      <EditorialTeaser />
      <Footer />
    </main>
  );
}
