"use client";

import { createContext, useContext, useState, useRef, useCallback } from "react";

type GoToFn = (index: number) => void;

type SectionContextType = {
  current: number;
  total: number;
  goTo: GoToFn;
  setCurrent: (index: number) => void;
  registerGoTo: (fn: GoToFn, total?: number) => void;
};

const SectionContext = createContext<SectionContextType | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const goToRef = useRef<GoToFn>(() => {});

  const goTo = useCallback((index: number) => {
    goToRef.current(index);
  }, []);

  const registerGoTo = useCallback((fn: GoToFn, sectionTotal?: number) => {
    goToRef.current = fn;
    if (sectionTotal !== undefined) setTotal(sectionTotal);
  }, []);

  return (
    <SectionContext.Provider value={{ current, total, goTo, setCurrent, registerGoTo }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSections() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSections must be used inside SectionProvider");
  return ctx;
}
