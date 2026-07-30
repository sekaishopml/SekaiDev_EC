"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [bonsaiLoaded, setBonsaiLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const loaded = bonsaiLoaded && minTimeElapsed;

  return (
    <>
      <LoadingScreen loaded={loaded} />
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
