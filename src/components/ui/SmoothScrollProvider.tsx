"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisProvider } from "@/context/LenisContext";

gsap.registerPlugin(ScrollTrigger);

function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth <= 899 ||
    window.matchMedia("(max-width: 899px)").matches ||
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const isMobile = isMobileViewport();

    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      lerp: isMobile ? 0.15 : 0.08,
      smoothWheel: true,
      anchors: true,
      respectReducedMotion: false,
    });

    setLenisInstance(lenis);

    const driverFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(driverFn);

    lenis.on("scroll", () => ScrollTrigger.update());

    const handlePopState = () => {
      lenis.resize();
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      gsap.ticker.remove(driverFn);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.resize();
    }
    ScrollTrigger.refresh();

    const rafId = requestAnimationFrame(() => {
      if (lenisInstance) {
        lenisInstance.resize();
      }
      ScrollTrigger.refresh();
    });

    const t1 = setTimeout(() => {
      if (lenisInstance) {
        lenisInstance.resize();
      }
      ScrollTrigger.refresh();
    }, 50);

    const t2 = setTimeout(() => {
      if (lenisInstance) {
        lenisInstance.resize();
      }
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, lenisInstance]);

  const providerValue = useMemo(() => lenisInstance, [lenisInstance]);

  return <LenisProvider lenis={providerValue}>{children}</LenisProvider>;
}
