"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen loaded={loaded} />
      <main className="relative">
        <Navigation />
        <Hero onBonsaiLoaded={() => setLoaded(true)} />
        <About />
        <Works />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
