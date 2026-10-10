"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";
import LocaleCurrencySelect from "./LocaleCurrencySelect";
import MobileMenuDrawer from "./MobileMenuDrawer";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const { t, isCartOpen, setIsCartOpen, cartCount } = useLocaleCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const isLightHeader = isScrolled || isMenuOpen || isCartOpen;

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-0 h-px w-full"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-colors duration-300 ${
          isLightHeader
            ? "bg-white/95 text-[#171717] backdrop-blur-md border-b border-black/8 shadow-[0_4px_24px_rgba(23,23,23,0.04)]"
            : "bg-gradient-to-b from-black/65 via-black/35 to-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* LEFT: Menu + Language & Currency Switchers */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                setIsCartOpen(false);
              }}
              aria-expanded={isMenuOpen}
              aria-label={t("header.menu")}
              className="group flex cursor-pointer items-center gap-2.5 py-2 text-xs sm:text-[13px] font-medium tracking-[0.12em] uppercase transition-opacity hover:opacity-75 active:scale-[0.98]"
            >
              <span className="relative flex h-3.5 w-5 flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full transition-transform duration-300 ${
                    isLightHeader ? "bg-[#171717]" : "bg-white"
                  } ${isMenuOpen ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-[1.5px] w-3.5 transition-opacity duration-300 ${
                    isLightHeader ? "bg-[#171717]" : "bg-white"
                  } ${isMenuOpen ? "opacity-0" : "group-hover:w-full"}`}
                />
                <span
                  className={`block h-[1.5px] w-full transition-transform duration-300 ${
                    isLightHeader ? "bg-[#171717]" : "bg-white"
                  } ${isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
              <span className="hidden sm:inline">
                {isMenuOpen ? t("header.close") : t("header.menu")}
              </span>
            </button>

            <span
              aria-hidden="true"
              className={`h-3.5 w-px ${
                isLightHeader ? "bg-black/15" : "bg-white/30"
              }`}
            />

            <LocaleCurrencySelect />
          </div>

          {/* CENTER: BUC Logo */}
          <a
            href="#top"
            className="absolute left-1/2 -translate-x-1/2 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="BUC — Бюро Ужгородського Креативу"
          >
            <Image
              src={
                isLightHeader
                  ? "/assets/archive/logo.svg"
                  : "/assets/logos/BUC_Logo_white.svg"
              }
              alt="BUC Logo"
              width={116}
              height={50}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </a>

          {/* RIGHT: Desktop Links + Cart Button */}
          <div className="flex items-center gap-5 lg:gap-7">
            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium tracking-[0.1em] uppercase">
              <a
                href="#projects"
                className="transition-opacity hover:opacity-70"
              >
                {t("header.projects")}
              </a>
              <a
                href="#flagship"
                className="transition-opacity hover:opacity-70"
              >
                {t("header.shop")}
              </a>
              <a href="#about" className="transition-opacity hover:opacity-70">
                {t("header.about")}
              </a>
              <a
                href="#contacts"
                className="transition-opacity hover:opacity-70"
              >
                {t("header.contacts")}
              </a>
            </nav>

            <button
              type="button"
              onClick={() => {
                setIsCartOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex cursor-pointer items-center gap-2 py-1.5 text-xs sm:text-[13px] font-medium tracking-[0.1em] uppercase transition-opacity hover:opacity-75 active:scale-[0.98]"
            >
              <span>{t("header.cart")}</span>
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center px-1.5 text-[11px] font-semibold transition-colors ${
                  cartCount > 0
                    ? "bg-[#FC46BA] text-white"
                    : isLightHeader
                    ? "bg-black/8 text-[#171717]"
                    : "bg-white/20 text-white"
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <CartDrawer />
    </>
  );
}
