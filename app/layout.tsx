import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Physics Olympiad Mongolia",
  description: "Physics Olympiad resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className={inter.className}>
        {/* LanguageProvider заавал children-ийг бүхэлд нь бүрхэх ёстой */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}