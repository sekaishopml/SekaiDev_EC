"use client";

import { useBonsaiLoad } from "@/hooks/useBonsaiLoad";
import LoadingController from "@/components/loading/LoadingController";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const { loaded, setBonsaiLoaded, progress } = useBonsaiLoad();

  return (
    <>
      <LoadingController loaded={loaded} progress={progress} />
      <Navigation />
      <SmoothScroll>
        <main className="relative">
          <HeroSection onBonsaiLoaded={() => setBonsaiLoaded(true)} />
          <About />
          <Works />
          <Contact footer={<Footer />} />
        </main>
      </SmoothScroll>
    </>
  );
}
