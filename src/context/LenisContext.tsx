"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type Lenis from "lenis";

type LenisContextValue = {
  lenis: Lenis | null;
  stop: () => void;
  start: () => void;
};

const noop = (): void => undefined;

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  stop: noop,
  start: noop,
});

export function LenisProvider({
  lenis,
  children,
}: {
  lenis: Lenis | null;
  children: ReactNode;
}) {
  const value = useMemo<LenisContextValue>(
    () => ({
      lenis,
      stop: () => {
        if (typeof lenis?.stop === "function") lenis.stop();
      },
      start: () => {
        if (typeof lenis?.start === "function") lenis.start();
      },
    }),
    [lenis]
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}
