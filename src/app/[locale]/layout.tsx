import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import "lenis/dist/lenis.css";
import "../globals.css";
import { LOCALES, isValidLocale } from "@/lib/i18n";
import { LocaleCurrencyProvider } from "@/context/LocaleCurrencyContext";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "BUC - Bureau of Uzhhorod Creativity"
      : "BUC - Бюро Ужгородського Креативу",
    description: isEn
      ? "Space of conceptual gifts and cultural projects about Transcarpathia"
      : "Простір концептуальних подарунків про Закарпаття",
    icons: {
      icon: "/favicon.svg?v=2",
      shortcut: "/favicon.svg?v=2",
      apple: "/favicon.svg?v=2",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${montserrat.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col bg-white text-[#171717]">
        <LocaleCurrencyProvider initialLocale={locale}>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LocaleCurrencyProvider>
      </body>
    </html>
  );
}
