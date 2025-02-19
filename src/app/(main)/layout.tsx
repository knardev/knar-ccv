// styles
import "../globals.css";
// components
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TopNavigationMenu } from "@/components/layout/top-navigation-menu";
// actions
import { checkAccountRole } from "@/utils/auth/check-account-role";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KNAR CCV",
  description: "KNAR CCV SYSTEM",
};

export default async function RootLayout({
  children,
  drawer,
}: Readonly<{
  children: React.ReactNode;
  drawer: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const accountRole = await checkAccountRole();

  if (!user) {
    redirect("/login");
  }

  if (accountRole === "UNAUTHORIZED") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">보기 권한이 없습니다.</h1>
          <p className="text-lg">관리자에게 요청해주세요.</p>
        </div>
      </div>
    );
  }
  return (
    <html lang="ko">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopNavigationMenu />
            <div className="w-screen h-16"></div>
            <main className="w-screen h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
              {/* 스크롤 가능한 영역 */}
              {children}
              {drawer}
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
