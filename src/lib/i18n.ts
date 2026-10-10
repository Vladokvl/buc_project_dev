export const LOCALES = ["uk", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uk";

export const CURRENCIES = ["UAH", "EUR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const DEFAULT_CURRENCY: Currency = "UAH";

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
}

export const CURRENCY_CONFIG: Record<Currency, CurrencyConfig> = {
  UAH: { code: "UAH", symbol: "₴", label: "₴ UAH" },
  EUR: { code: "EUR", symbol: "€", label: "€ EUR" },
  USD: { code: "USD", symbol: "$", label: "$ USD" },
};

export interface MultiCurrencyPrice {
  priceUah: number;
  priceEur?: number;
  priceUsd?: number;
}

// Fallback exchange rates when explicit EUR/USD price is not set on an item
export const EXCHANGE_RATES: Record<Currency, number> = {
  UAH: 1,
  EUR: 45,
  USD: 41.5,
};

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

export function isValidCurrency(value: unknown): value is Currency {
  return typeof value === "string" && CURRENCIES.includes(value as Currency);
}

/**
 * Returns the localized value of a field on a database or static entity.
 * Matches the pattern from voytArt_dev (`field` for EN, `fieldUk` for UK).
 */
export function getLocalized<T extends object>(
  entity: T,
  field: string,
  locale: Locale
): string {
  const record = entity as Record<string, unknown>;
  if (locale === "uk") {
    const ukField = `${field}Uk`;
    const ukValue = record[ukField];
    if (typeof ukValue === "string" && ukValue.trim().length > 0) {
      return ukValue;
    }
  }
  const value = record[field];
  return typeof value === "string" ? value : "";
}

/**
 * Formats a price in the active currency (UAH, EUR, or USD).
 */
export function formatPrice(
  price: MultiCurrencyPrice | number,
  currency: Currency,
  locale: Locale = "uk"
): string {
  const priceObj: MultiCurrencyPrice =
    typeof price === "number" ? { priceUah: price } : price;

  let amount: number;
  if (currency === "UAH") {
    amount = priceObj.priceUah;
  } else if (currency === "EUR") {
    amount =
      priceObj.priceEur ??
      Math.round(priceObj.priceUah / EXCHANGE_RATES.EUR);
  } else {
    amount =
      priceObj.priceUsd ??
      Math.round(priceObj.priceUah / EXCHANGE_RATES.USD);
  }

  const formattedNumber = new Intl.NumberFormat(
    locale === "uk" ? "uk-UA" : "en-US",
    {
      maximumFractionDigits: 0,
    }
  ).format(amount);

  const { symbol } = CURRENCY_CONFIG[currency];
  return currency === "UAH"
    ? `${formattedNumber} ${symbol}`
    : `${symbol}${formattedNumber}`;
}
