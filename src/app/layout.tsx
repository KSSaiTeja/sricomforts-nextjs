import type { Metadata } from "next";
import localFont from "next/font/local";
import { PreloaderGate } from "@/components/preloader/PreloaderGate";
import { PreloaderProvider } from "@/components/preloader/PreloaderProvider";
import { TonnageCalculatorWidget } from "@/components/calculator/TonnageCalculatorWidget";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SiteMotion } from "@/components/motion/SiteMotion";
import "./globals.css";

const suisseIntl = localFont({
  src: [
    {
      path: "../../public/fonts/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SuisseIntl-Medium.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sri\u00A0Comforts | HVAC Leaders Since 2001 | South India",
  description:
    "Sri\u00A0Comforts — 25+ years of HVAC design, installation, and service across South India. Proven project experience, award-winning delivery, and a 24-hour service promise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${suisseIntl.variable} lenis lenis-smooth h-full`}>
      <body className="min-h-full antialiased">
        <PreloaderProvider>
          <PreloaderGate>
            {children}
            <SiteMotion />
            <TonnageCalculatorWidget />
            <ChatWidget />
          </PreloaderGate>
        </PreloaderProvider>
      </body>
    </html>
  );
}
