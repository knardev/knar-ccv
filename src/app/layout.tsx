import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { TopNavigationMenu } from "@/components/layout/navigation-menu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KNAR CCV",
  description: "KNAR CCV SYSTEM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TopNavigationMenu />
          <main className="pt-[calc(80px+20px)] px-10 h-screen">
            {/* 스크롤 가능한 영역 */}
            {children}
          </main>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
