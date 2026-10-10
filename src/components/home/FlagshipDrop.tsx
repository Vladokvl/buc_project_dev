"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";
import {
  FLAGSHIP_GALLERY_IMAGES,
  APPAREL_SIZES,
  FLAGSHIP_PRICE,
} from "@/data/projects";
import AudioWavePlayer from "@/components/ui/AudioWavePlayer";

export default function FlagshipDrop() {
  const { t, formatPrice, addToCart, setIsCartOpen } = useLocaleCurrency();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [justAdded, setJustAdded] = useState(false);

  const handleAddFlagship = () => {
    addToCart({
      id: "musical-tshirt-love",
      title: "Musical T-Shirt “LOVE · Linger On”",
      titleUk: "Музична футболка «LOVE · Полегіню»",
      size: selectedSize,
      ...FLAGSHIP_PRICE,
      image: FLAGSHIP_GALLERY_IMAGES[0],
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
    setIsCartOpen(true);
  };

  return (
    <section
      id="flagship"
      className="border-t border-black/8 bg-[#fafafa] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left: 5-photo Product Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
              {FLAGSHIP_GALLERY_IMAGES.map((imgSrc, idx) => (
                <button
                  key={imgSrc}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-20 w-16 sm:h-24 sm:w-20 shrink-0 cursor-pointer overflow-hidden border-2 transition-all ${
                    activeImage === idx
                      ? "border-[#171717] opacity-100"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`Musical T-shirt view ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden bg-white">
              <Image
                src={FLAGSHIP_GALLERY_IMAGES[activeImage]}
                alt={t("projects.featuredTitle")}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Story, Audio Wave Player, Price, Size Selector & Add to Cart */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:sticky lg:top-28">
            <div>
              <p className="text-xs text-[#58595B]">
                {t("projects.featuredBadge")}
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717]">
                {t("projects.featuredTitle")}
              </h2>

              <p className="mt-3 text-2xl font-semibold text-[#171717]">
                {formatPrice(FLAGSHIP_PRICE)}
              </p>

              <AudioWavePlayer
                quote={t("projects.listenQuote")}
                labelPlay={t("projects.listenAudio")}
                labelPause={t("projects.pauseAudio")}
              />

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#58595B]">
                {t("projects.featuredDesc")}
              </p>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.12em] text-[#171717] uppercase">
                    {t("projects.selectSize")}
                  </span>
                  <span className="text-xs text-[#58595B]">Oversized fit</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {APPAREL_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`cursor-pointer border py-3 text-xs font-semibold tracking-wider uppercase transition-colors active:scale-[0.98] ${
                        selectedSize === size
                          ? "border-[#171717] bg-[#171717] text-white"
                          : "border-black/15 bg-white text-[#171717] hover:border-black/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddFlagship}
                className="mt-6 w-full cursor-pointer bg-[#171717] py-4 text-xs sm:text-sm font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#FC46BA] active:scale-[0.99]"
              >
                {justAdded
                  ? t("projects.addedToCart")
                  : `${t("projects.addToCart")} — ${formatPrice(
                      FLAGSHIP_PRICE
                    )}`}
              </button>

              <p className="mt-5 text-xs leading-relaxed text-[#58595B]">
                {t("projects.details")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
