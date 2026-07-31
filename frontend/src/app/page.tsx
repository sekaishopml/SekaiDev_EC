"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingController from "@/components/loading/LoadingController";
import ScrollSpacer from "@/components/ScrollSpacer";
import { useBonsaiLoad } from "@/hooks/useBonsaiLoad";

export default function Home() {
  const { loaded, setBonsaiLoaded, progress } = useBonsaiLoad();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <LoadingController loaded={loaded} progress={progress} />
      <main className="relative">
        <Navigation />
        <Hero onBonsaiLoaded={() => setBonsaiLoaded(true)} />
        <ScrollSpacer />
        <About />
        <Works />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
