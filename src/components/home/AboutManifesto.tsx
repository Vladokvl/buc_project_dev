"use client";

import React from "react";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";

export default function AboutManifesto() {
  const { t } = useLocaleCurrency();

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-[#171717]">
            {t("about.heading")}
          </h2>
        </div>

        <div className="lg:col-span-6 space-y-5 text-base leading-relaxed text-[#58595B]">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 sm:grid-cols-3">
        <div>
          <span className="text-xs font-semibold tracking-[0.14em] text-[#FC46BA] uppercase">
            01
          </span>
          <h3 className="mt-2 text-lg font-semibold text-[#171717]">
            {t("about.stat1Label")}
          </h3>
          <p className="mt-1 text-sm text-[#58595B]">{t("about.stat1Text")}</p>
        </div>

        <div>
          <span className="text-xs font-semibold tracking-[0.14em] text-[#4EC6E2] uppercase">
            02
          </span>
          <h3 className="mt-2 text-lg font-semibold text-[#171717]">
            {t("about.stat2Label")}
          </h3>
          <p className="mt-1 text-sm text-[#58595B]">{t("about.stat2Text")}</p>
        </div>

        <div>
          <span className="text-xs font-semibold tracking-[0.14em] text-[#8458B3] uppercase">
            03
          </span>
          <h3 className="mt-2 text-lg font-semibold text-[#171717]">
            {t("about.stat3Label")}
          </h3>
          <p className="mt-1 text-sm text-[#58595B]">{t("about.stat3Text")}</p>
        </div>
      </div>
    </section>
  );
}
