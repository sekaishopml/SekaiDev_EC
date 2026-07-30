"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingController from "@/components/loading/LoadingController";
import { useBonsaiLoad } from "@/hooks/useBonsaiLoad";

export default function Home() {
  const { loaded, setBonsaiLoaded } = useBonsaiLoad();

  return (
    <>
      <LoadingController loaded={loaded} />
      <main className="relative">
        <Navigation />
        <Hero onBonsaiLoaded={() => setBonsaiLoaded(true)} />
        <About />
        <Works />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
