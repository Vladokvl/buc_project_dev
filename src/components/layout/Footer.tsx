"use client";

import React from "react";
import Image from "next/image";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";

export default function Footer() {
  const { t } = useLocaleCurrency();

  return (
    <footer
      id="contacts"
      className="border-t border-black/10 bg-[#141416] text-white"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 justify-between">
          <div className="md:col-span-5 space-y-4">
            <Image
              src="/assets/logos/BUC_Logo_white.svg"
              alt="BUC Logo"
              width={130}
              height={56}
              className="h-12 w-auto"
            />
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
              {t("footer.tagline")}
            </p>
            <p className="text-xs tracking-wider text-neutral-500 uppercase">
              {t("footer.city")}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              {t("footer.navigation")}
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <a
                  href="#projects"
                  className="transition-colors hover:text-white"
                >
                  {t("header.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#flagship"
                  className="transition-colors hover:text-white"
                >
                  {t("header.shop")}
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  {t("header.about")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              {t("footer.socials")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/buc_2025?igsh=N2IwcjJuY3F2c2c1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group inline-flex items-center gap-2.5 border border-white/15 px-4 py-2.5 text-xs font-medium tracking-wider text-neutral-300 uppercase transition-colors hover:border-[#FC46BA] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-colors group-hover:text-[#FC46BA]"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/share/1Aa5yPB7yE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group inline-flex items-center gap-2.5 border border-white/15 px-4 py-2.5 text-xs font-medium tracking-wider text-neutral-300 uppercase transition-colors hover:border-[#4EC6E2] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-colors group-hover:text-[#4EC6E2]"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} BUC. {t("footer.rights")}
          </p>
          <p>Uzhhorod · Transcarpathia</p>
        </div>
      </div>
    </footer>
  );
}
