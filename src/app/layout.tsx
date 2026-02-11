import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import "./globals.css";
// import { Navbar } from "@/components/Navbar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/layout/MainHeader";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
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
    <html lang="ar" className={ibmPlexArabic.variable} dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexArabic.variable} font-sans antialiased selection:bg-shams-blue/10 selection:text-shams-blue dark:bg-black overflow-x-hidden`}
      >
        <Suspense fallback={null}>
          <div className="flex flex-col sticky top-0 z-50 transition-all duration-500">
            <TopBar />
            <MainHeader />
            <CategoryNav />
          </div>
        </Suspense>
        <main className="min-h-screen">
          {children}
        </main>

        <BottomNav />
        <div className="md:hidden h-24" />

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
