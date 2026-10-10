"use client";

import React from "react";
import Image from "next/image";
import SlideDrawer from "@/components/ui/SlideDrawer";
import { useLocaleCurrency } from "@/context/LocaleCurrencyContext";
import { getLocalized } from "@/lib/i18n";

export default function CartDrawer() {
  const {
    locale,
    t,
    formatPrice,
    cart,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
  } = useLocaleCurrency();

  const totalUah = cart.reduce(
    (sum, item) => sum + item.priceUah * item.quantity,
    0
  );
  const totalEur = cart.reduce(
    (sum, item) => sum + item.priceEur * item.quantity,
    0
  );
  const totalUsd = cart.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
    0
  );

  return (
    <SlideDrawer
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      side="right"
      maxWidthClass="max-w-md"
    >
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <h2 className="text-sm font-semibold tracking-[0.14em] uppercase">
          {t("header.cart")} ({cartCount})
        </h2>
        <button
          type="button"
          onClick={() => setIsCartOpen(false)}
          className="cursor-pointer text-xs font-medium tracking-wider text-neutral-500 uppercase hover:text-black"
        >
          {t("header.close")} ✕
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-sm text-neutral-500">{t("header.emptyCart")}</p>
        </div>
      ) : (
        <div className="flex-1 divide-y divide-black/8 overflow-y-auto py-4">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-4 py-4">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-neutral-100">
                <Image
                  src={item.image}
                  alt={getLocalized(item, "title", locale)}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-[#171717]">
                      {getLocalized(item, "title", locale)}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="cursor-pointer text-xs text-neutral-400 hover:text-black"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    {locale === "uk" ? "Розмір" : "Size"}: {item.size} ·{" "}
                    {item.quantity} шт.
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {formatPrice({
                    priceUah: item.priceUah * item.quantity,
                    priceEur: item.priceEur * item.quantity,
                    priceUsd: item.priceUsd * item.quantity,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="border-t border-black/10 pt-5">
          <div className="mb-4 flex items-center justify-between text-base font-semibold">
            <span>{t("header.total")}</span>
            <span>
              {formatPrice({
                priceUah: totalUah,
                priceEur: totalEur,
                priceUsd: totalUsd,
              })}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="w-full cursor-pointer bg-[#171717] py-4 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#FC46BA] active:scale-[0.99]"
          >
            {t("header.checkout")}
          </button>
        </div>
      )}
    </SlideDrawer>
  );
}
