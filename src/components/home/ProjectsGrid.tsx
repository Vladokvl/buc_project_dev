"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";
import { getLocalized } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";
import ShaderRevealImage from "@/components/ui/ShaderRevealImage";
import ProjectsStickyStack from "./ProjectsStickyStack";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsGrid() {
  const { locale, t, formatPrice } = useLocaleCurrency();
  const [viewMode, setViewMode] = useState<"grid" | "stack">("grid");
  const gridRef = useRef<HTMLDivElement>(null);

  // Osmo-style multi-column differential GSAP parallax in Grid mode
  useEffect(() => {
    if (viewMode !== "grid" || !gridRef.current) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const cols = gsap.utils.toArray<HTMLElement>(".buc-project-col");
      cols.forEach((col, idx) => {
        const yOffset = idx === 1 ? -36 : 18;
        gsap.fromTo(
          col,
          { y: -yOffset },
          {
            y: yOffset,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [viewMode]);

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mb-10 sm:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171717]">
            {t("projects.heading")}
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#58595B]">
            {t("projects.subheading")}
          </p>
        </div>

        {/* Interactive Showcase Mode Toggle for Client Demo */}
        <div className="inline-flex self-start border border-black/15 bg-[#fafafa] p-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`cursor-pointer px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${
              viewMode === "grid"
                ? "bg-[#171717] text-white"
                : "text-[#58595B] hover:text-[#171717]"
            }`}
          >
            {t("projects.viewModeGrid")}
          </button>
          <button
            type="button"
            onClick={() => setViewMode("stack")}
            className={`cursor-pointer px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${
              viewMode === "stack"
                ? "bg-[#171717] text-white"
                : "text-[#58595B] hover:text-[#171717]"
            }`}
          >
            {t("projects.viewModeStack")}
          </button>
        </div>
      </div>

      {viewMode === "stack" ? (
        <ProjectsStickyStack />
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10"
        >
          {PROJECTS.map((project) => {
            const title = getLocalized(project, "title", locale);
            const subtitle = getLocalized(project, "subtitle", locale);
            const tag = getLocalized(project, "tag", locale);

            return (
              <article
                key={project.id}
                className="buc-project-col group flex flex-col justify-between"
              >
                <a
                  href="#flagship"
                  className="relative block overflow-hidden bg-[#f4f4f5]"
                >
                  <ShaderRevealImage
                    imagePrimary={project.imagePrimary}
                    imageHover={project.imageHover}
                    alt={title}
                  />
                </a>

                <div className="mt-5 flex flex-1 flex-col justify-between border-b border-black/10 pb-5">
                  <div>
                    <p className="mb-1.5 text-xs text-[#58595B]">{tag}</p>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#171717] transition-colors group-hover:text-[#FC46BA]">
                        <a href="#flagship">{title}</a>
                      </h3>
                      <span className="shrink-0 text-sm font-semibold text-[#171717]">
                        {t("projects.fromPrice")}{" "}
                        {formatPrice({
                          priceUah: project.priceUah,
                          priceEur: project.priceEur,
                          priceUsd: project.priceUsd,
                        })}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#58595B]">
                      {subtitle}
                    </p>
                  </div>

                  <div className="mt-4">
                    <a
                      href="#flagship"
                      className="inline-flex items-center text-xs font-semibold tracking-[0.14em] text-[#171717] uppercase transition-colors group-hover:text-[#FC46BA]"
                    >
                      {t("projects.viewProject")}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
