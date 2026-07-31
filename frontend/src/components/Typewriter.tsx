"use client";

import { useState, useEffect } from "react";

const WORDS = [
  "E-COMMERCE",
  "CRM DASHBOARD",
  "LANDING",
  "APP SOFTWARE",
  "WEB DESIGN",
  "PLATFORM WEB",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE = 1500;

export default function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const word = WORDS[wordIndex];

    if (phase === "typing") {
      if (text === word) {
        setPhase("pause");
        return;
      }
      const next = word.slice(0, text.length + 1);
      const t = setTimeout(() => setText(next), TYPING_SPEED);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("erasing"), PAUSE);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (text === "") {
        const nextIndex = (wordIndex + 1) % WORDS.length;
        setWordIndex(nextIndex);
        setPhase("typing");
        return;
      }
      const next = word.slice(0, text.length - 1);
      const t = setTimeout(() => setText(next), DELETING_SPEED);
      return () => clearTimeout(t);
    }
  }, [text, phase, wordIndex, mounted]);

  return (
    <span className="ml-1">
      {text}
      <span className="blink-cursor">_</span>
    </span>
  );
}
