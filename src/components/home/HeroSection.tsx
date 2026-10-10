"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/page.module.scss";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";

export default function HeroSection() {
  const { t } = useLocaleCurrency();

  return (
    <section id="top" className={styles.heroSection}>
      <div className={styles.bgContainer}>
        <Image
          src="/assets/backgrounds/BUC_advertising-1_1920x1080px_BIG.jpg"
          alt="BUC — Бюро Ужгородського Креативу"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className={styles.bgDesktop}
        />
        <Image
          src="/assets/backgrounds/BUC_advertising-1_1080x1920px_BIG.jpg"
          alt="BUC — Бюро Ужгородського Креативу"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className={styles.bgMobile}
        />
      </div>

      <div className={styles.heroActions}>
        <a href="#projects" className={styles.primaryCta}>
          <span>{t("hero.ctaPrimary")}</span>
          <span aria-hidden="true">↓</span>
        </a>
        <a href="#flagship" className={styles.secondaryCta}>
          <span>{t("hero.ctaSecondary")}</span>
        </a>
      </div>
    </section>
  );
}
