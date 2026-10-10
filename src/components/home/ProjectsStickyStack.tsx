"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";
import { getLocalized } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsStickyStack() {
  const { locale, t, formatPrice } = useLocaleCurrency();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".buc-stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const dimmer = card.querySelector(".buc-stack-dimmer");

        gsap.to(card, {
          scale: 1 - (cards.length - 1 - i) * 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 85%",
            end: "top 148px",
            scrub: true,
          },
        });

        if (dimmer) {
          gsap.to(dimmer, {
            opacity: 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "top 148px",
              scrub: true,
            },
          });
        }
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative space-y-12 pt-4 sm:pt-8 pb-10">
      {PROJECTS.map((project, index) => {
        const title = getLocalized(project, "title", locale);
        const subtitle = getLocalized(project, "subtitle", locale);
        const tag = getLocalized(project, "tag", locale);

        return (
          <article
            key={project.id}
            style={{
              top: `${136 + index * 12}px`,
              marginBottom: `${(PROJECTS.length - 1 - index) * 12}px`,
              zIndex: (index + 1) * 10,
            }}
            className="buc-stack-card sticky origin-top overflow-hidden border border-[#171717]/15 bg-white text-[#171717] shadow-[0_-16px_40px_rgba(23,23,23,0.08)]"
          >
            {/* Opaque warm-stone dimmer so stacked sheets recede without becoming transparent */}
            <div className="buc-stack-dimmer pointer-events-none absolute inset-0 z-30 bg-[#E5E4E0] opacity-0" />

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="flex flex-col justify-between p-8 sm:p-12 md:col-span-5">
                <div>
                  <p className="text-xs text-[#58595B]">{tag}</p>
                  <h3 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight text-[#171717]">
                    {title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[#58595B]">
                    {subtitle}
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#171717]/10 pt-6">
                  <span className="text-lg font-semibold text-[#171717]">
                    {t("projects.fromPrice")}{" "}
                    {formatPrice({
                      priceUah: project.priceUah,
                      priceEur: project.priceEur,
                      priceUsd: project.priceUsd,
                    })}
                  </span>
                  <a
                    href="#flagship"
                    className="bg-[#171717] px-6 py-3.5 text-xs font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#FC46BA] active:scale-[0.98]"
                  >
                    {t("projects.viewProject")}
                  </a>
                </div>
              </div>

              <div className="relative min-h-[340px] sm:min-h-[460px] md:col-span-7 grid grid-cols-2 gap-px bg-[#171717]/10">
                <div className="relative h-full w-full overflow-hidden bg-[#f4f4f5]">
                  <Image
                    src={project.imagePrimary}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="relative h-full w-full overflow-hidden bg-[#f4f4f5]">
                  <Image
                    src={project.imageHover}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
