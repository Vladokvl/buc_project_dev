"use client";

import React from "react";
import Image from "next/image";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";
import { getLocalized } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";

export default function ProjectsGrid() {
  const { locale, t, formatPrice } = useLocaleCurrency();

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mb-10 sm:mb-14 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171717]">
          {t("projects.heading")}
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#58595B]">
          {t("projects.subheading")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
        {PROJECTS.map((project) => {
          const title = getLocalized(project, "title", locale);
          const subtitle = getLocalized(project, "subtitle", locale);
          const tag = getLocalized(project, "tag", locale);

          return (
            <article
              key={project.id}
              className="group flex flex-col justify-between"
            >
              <a
                href="#flagship"
                className="block overflow-hidden bg-[#f4f4f5]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={project.imagePrimary}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-0"
                  />
                  <Image
                    src={project.imageHover}
                    alt={`${title} detail`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#171717] uppercase backdrop-blur-xs">
                    {project.code} · {tag}
                  </div>
                </div>
              </a>

              <div className="mt-5 flex flex-1 flex-col justify-between border-b border-black/10 pb-5">
                <div>
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
    </section>
  );
}
