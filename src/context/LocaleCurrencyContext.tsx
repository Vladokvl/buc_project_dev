"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Locale,
  Currency,
  DEFAULT_LOCALE,
  DEFAULT_CURRENCY,
  MultiCurrencyPrice,
  isValidLocale,
  isValidCurrency,
  formatPrice as formatPriceUtil,
} from "@/lib/i18n";
import ukMessages from "@/messages/uk.json";
import enMessages from "@/messages/en.json";

export interface CartItem {
  id: string;
  title: string;
  titleUk: string;
  size: string;
  priceUah: number;
  priceEur: number;
  priceUsd: number;
  image: string;
  quantity: number;
}

interface LocaleCurrencyContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (path: string) => string;
  formatPrice: (price: MultiCurrencyPrice | number) => string;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, size: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
}

const MESSAGES: Record<Locale, Record<string, unknown>> = {
  uk: ukMessages,
  en: enMessages,
};

const LocaleCurrencyContext = createContext<LocaleCurrencyContextValue | null>(
  null
);

export function LocaleCurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem("BUC_LOCALE");
      if (isValidLocale(savedLocale)) {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
      }
      const savedCurrency = localStorage.getItem("BUC_CURRENCY");
      if (isValidCurrency(savedCurrency)) {
        setCurrencyState(savedCurrency);
      }
      const savedCart = localStorage.getItem("BUC_CART");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      localStorage.setItem("BUC_LOCALE", nextLocale);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = nextLocale;
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setCurrency = useCallback((nextCurrency: Currency) => {
    setCurrencyState(nextCurrency);
    try {
      localStorage.setItem("BUC_CURRENCY", nextCurrency);
      document.cookie = `NEXT_CURRENCY=${nextCurrency}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useCallback(
    (path: string): string => {
      const keys = path.split(".");
      let current: unknown = MESSAGES[locale];
      for (const key of keys) {
        if (
          current &&
          typeof current === "object" &&
          key in (current as Record<string, unknown>)
        ) {
          current = (current as Record<string, unknown>)[key];
        } else {
          return path;
        }
      }
      return typeof current === "string" ? current : path;
    },
    [locale]
  );

  const formatPrice = useCallback(
    (price: MultiCurrencyPrice | number) => {
      return formatPriceUtil(price, currency, locale);
    },
    [currency, locale]
  );

  const addToCart = useCallback((newItem: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...prev, { ...newItem, quantity: 1 }];
      }
      try {
        localStorage.setItem("BUC_CART", JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((id: string, size: string) => {
    setCart((prev) => {
      const updated = prev.filter(
        (item) => !(item.id === id && item.size === size)
      );
      try {
        localStorage.setItem("BUC_CART", JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      currency,
      setCurrency,
      t,
      formatPrice,
      cart,
      addToCart,
      removeFromCart,
      isCartOpen,
      setIsCartOpen,
      cartCount,
    }),
    [
      locale,
      setLocale,
      currency,
      setCurrency,
      t,
      formatPrice,
      cart,
      addToCart,
      removeFromCart,
      isCartOpen,
      cartCount,
    ]
  );

  return (
    <LocaleCurrencyContext.Provider value={value}>
      {children}
    </LocaleCurrencyContext.Provider>
  );
}

export function useLocaleCurrency() {
  const ctx = useContext(LocaleCurrencyContext);
  if (!ctx) {
    throw new Error(
      "useLocaleCurrency must be used within a LocaleCurrencyProvider"
    );
  }
  return ctx;
}
