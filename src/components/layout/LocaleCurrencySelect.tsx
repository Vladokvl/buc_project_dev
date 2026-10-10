"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";
import { CURRENCIES, CURRENCY_CONFIG, Currency, Locale } from "@/lib/i18n";

export default function LocaleCurrencySelect() {
  const { locale, setLocale, currency, setCurrency, t } = useLocaleCurrency();
  const [openDropdown, setOpenDropdown] = useState<"lang" | "curr" | null>(
    null
  );
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLanguage = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setOpenDropdown(null);
  };

  const selectCurrency = (nextCurrency: Currency) => {
    setCurrency(nextCurrency);
    setOpenDropdown(null);
  };

  return (
    <div ref={wrapRef} className="flex items-center gap-3 sm:gap-5">
      {/* Language Dropdown (UA / EN) */}
      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setOpenDropdown((prev) => (prev === "lang" ? null : "lang"))
          }
          aria-expanded={openDropdown === "lang"}
          aria-label={t("header.language")}
          className="flex cursor-pointer items-center gap-1 py-1.5 text-xs sm:text-[13px] font-medium tracking-[0.08em] uppercase transition-opacity hover:opacity-75"
        >
          <span>{locale === "uk" ? "UA" : "EN"}</span>
          <span className="text-[9px] opacity-70">▼</span>
        </button>

        {openDropdown === "lang" && (
          <div className="absolute left-0 mt-2 w-24 border border-black/10 bg-white py-1 text-[#171717] shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
            <button
              type="button"
              onClick={() => selectLanguage("uk")}
              className={`flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-xs font-medium tracking-wider uppercase transition-colors hover:bg-black/5 ${
                locale === "uk" ? "text-[#FC46BA] font-semibold" : ""
              }`}
            >
              <span>UA</span>
              <span className="text-[10px] text-neutral-400">Укр</span>
            </button>
            <button
              type="button"
              onClick={() => selectLanguage("en")}
              className={`flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-xs font-medium tracking-wider uppercase transition-colors hover:bg-black/5 ${
                locale === "en" ? "text-[#FC46BA] font-semibold" : ""
              }`}
            >
              <span>EN</span>
              <span className="text-[10px] text-neutral-400">Eng</span>
            </button>
          </div>
        )}
      </div>

      {/* Currency Dropdown (₴ UAH / € EUR / $ USD) */}
      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setOpenDropdown((prev) => (prev === "curr" ? null : "curr"))
          }
          aria-expanded={openDropdown === "curr"}
          aria-label={t("header.currency")}
          className="flex cursor-pointer items-center gap-1 py-1.5 text-xs sm:text-[13px] font-medium tracking-[0.06em] uppercase transition-opacity hover:opacity-75"
        >
          <span>{CURRENCY_CONFIG[currency].label}</span>
          <span className="text-[9px] opacity-70">▼</span>
        </button>

        {openDropdown === "curr" && (
          <div className="absolute left-0 mt-2 w-28 border border-black/10 bg-white py-1 text-[#171717] shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
            {CURRENCIES.map((currCode) => {
              const cfg = CURRENCY_CONFIG[currCode];
              const isSelected = currency === currCode;
              return (
                <button
                  key={currCode}
                  type="button"
                  onClick={() => selectCurrency(currCode)}
                  className={`flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-xs font-medium tracking-wider uppercase transition-colors hover:bg-black/5 ${
                    isSelected ? "text-[#FC46BA] font-semibold" : ""
                  }`}
                >
                  <span>{cfg.code}</span>
                  <span className="text-neutral-500">{cfg.symbol}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
