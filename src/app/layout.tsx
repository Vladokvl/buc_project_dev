import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LocaleCurrencyProvider } from "@/context/LocaleCurrencyContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "BUC — Бюро Ужгородського Креативу",
  description: "Простір концептуальних подарунків про Закарпаття",
  icons: {
    icon: "/favicon.svg?v=2",
    shortcut: "/favicon.svg?v=2",
    apple: "/favicon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      className={`${montserrat.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#171717]">
        <LocaleCurrencyProvider>{children}</LocaleCurrencyProvider>
      </body>
    </html>
  );
}
