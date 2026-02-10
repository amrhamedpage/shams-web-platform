import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shams Pharmacy | صيدليات شمس",
  description: "اكتشف أفضل صفقات المنتجات الطبية والعناية بالجمال مع صيدليات شمس. توصيل سريع في جميع أنحاء المملكة.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Shams Pharmacy | صيدليات شمس",
    description: "Your trusted partner for health and beauty in Saudi Arabia.",
    url: "https://shams-pharmacy.sa",
    siteName: "Shams Pharmacy",
    locale: "ar_SA",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Shams Pharmacy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-shams-blue/10 selection:text-shams-blue dark:bg-black`}
      >
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="min-h-screen">
          {children}
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
