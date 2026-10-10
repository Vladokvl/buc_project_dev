"use client";

import React from "react";
import SlideDrawer from "@/components/ui/SlideDrawer";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";
import { CURRENCIES, CURRENCY_CONFIG } from "@/lib/i18n";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuDrawer({
  isOpen,
  onClose,
}: MobileMenuDrawerProps) {
  const { locale, setLocale, currency, setCurrency, t } = useLocaleCurrency();

  return (
    <SlideDrawer isOpen={isOpen} onClose={onClose} side="left" maxWidthClass="max-w-sm">
      <div className="space-y-8">
        <nav className="flex flex-col space-y-5 text-xl font-medium tracking-[0.08em] uppercase">
          <a
            href="#projects"
            onClick={onClose}
            className="border-b border-black/8 pb-4 transition-colors hover:text-[#FC46BA]"
          >
            {t("header.projects")}
          </a>
          <a
            href="#flagship"
            onClick={onClose}
            className="border-b border-black/8 pb-4 transition-colors hover:text-[#FC46BA]"
          >
            {t("header.shop")}
          </a>
          <a
            href="#about"
            onClick={onClose}
            className="border-b border-black/8 pb-4 transition-colors hover:text-[#FC46BA]"
          >
            {t("header.about")}
          </a>
          <a
            href="#contacts"
            onClick={onClose}
            className="border-b border-black/8 pb-4 transition-colors hover:text-[#FC46BA]"
          >
            {t("header.contacts")}
          </a>
        </nav>

        <div className="space-y-4 pt-2">
          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
              {t("header.language")}
            </p>
            <div className="flex gap-2">
              {(["uk", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocale(lang)}
                  className={`cursor-pointer border px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    locale === lang
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-black/15 text-[#171717] hover:border-black/40"
                  }`}
                >
                  {lang === "uk" ? "UA · Українська" : "EN · English"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
              {t("header.currency")}
            </p>
            <div className="flex gap-2">
              {CURRENCIES.map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`cursor-pointer border px-3.5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    currency === curr
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-black/15 text-[#171717] hover:border-black/40"
                  }`}
                >
                  {CURRENCY_CONFIG[curr].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 pt-6 text-xs text-neutral-500">
        <p className="font-medium text-[#171717]">BUC — {t("hero.badge")}</p>
        <p className="mt-1">{t("footer.city")}</p>
      </div>
    </SlideDrawer>
  );
}
