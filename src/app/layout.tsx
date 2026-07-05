import type { Metadata } from "next";
import localFont from "next/font/local";
import { PreloaderGate } from "@/components/preloader/PreloaderGate";
import { PreloaderProvider } from "@/components/preloader/PreloaderProvider";
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
  title: "Sri Comforts | Authorized Daikin Partner | HVAC Solutions in South India",
  description:
    "Sri Comforts — 25+ years of trusted HVAC design, installation, and service across South India. Authorized Daikin dealer for commercial, industrial, and residential cooling.",
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
          <PreloaderGate>{children}</PreloaderGate>
        </PreloaderProvider>
      </body>
    </html>
  );
}
