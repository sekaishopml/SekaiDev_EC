"use client";

import { useBonsaiLoad } from "@/hooks/useBonsaiLoad";
import LoadingController from "@/components/loading/LoadingController";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BonsaiShowcase from "@/components/BonsaiShowcase";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SectionProvider } from "@/components/SectionContext";
import SectionsWrapper from "@/components/SectionsWrapper";

export default function Home() {
  const { loaded, setBonsaiLoaded, progress } = useBonsaiLoad();

  return (
    <>
      <LoadingController loaded={loaded} progress={progress} />
      <SectionProvider>
        <Navigation />
        <SectionsWrapper>
          <Hero onBonsaiLoaded={() => setBonsaiLoaded(true)} />
          <BonsaiShowcase />
          <About />
          <Works />
          <Contact footer={<Footer />} />
        </SectionsWrapper>
      </SectionProvider>
    </>
  );
}
